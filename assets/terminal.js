/* ============================================================
   FAULTY TERMINAL
   Retícula de fósforo CRT: líneas de barrido, parpadeo, distorsión
   de barril y una onda que sigue al cursor.

   Los dos shaders van copiados palabra por palabra del componente
   original. Lo unico portado es el envoltorio: el sitio no tiene React
   ni empaquetador, asi que en vez de OGL se habla con WebGL directo.
   Para este caso no se pierde nada: es un solo programa dibujando un
   triangulo que tapa la pantalla, que es justo lo que OGL habria hecho
   por debajo, y evita una dependencia servida desde un CDN.

   Se conserva el comportamiento que traia el original:
     - respeta prefers-reduced-motion y se congela en un cuadro fijo
     - deja de dibujar cuando la banda sale de pantalla
     - se re-dimensiona con ResizeObserver
     - el cursor se sigue a nivel de ventana, asi que reacciona aunque
       la capa este detras del contenido y sin recibir eventos
     - libera el contexto WebGL al desmontar
   ============================================================ */
(function(){
  'use strict';

  var VERT = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  var FRAG = `
precision mediump float;
varying vec2 vUv;
uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uChromaticAberration;
uniform float uDither;
uniform float uCurvature;
uniform vec3  uTint;
uniform vec2  uMouse;
uniform float uMouseStrength;
uniform float uUseMouse;
uniform float uPageLoadProgress;
uniform float uUsePageLoadAnimation;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p)
{
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2;
}

mat2 rotate(float angle)
{
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p)
{
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;

  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;

  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;

  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);

  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);

  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p){
    vec2 grid = uGridMul * 15.0;
    vec2 s = floor(p * grid) / grid;
    p = p * grid;
    vec2 q, r;
    float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;

    if(uUseMouse > 0.5){
        vec2 mouseWorld = uMouse * uScale;
        float distToMouse = distance(s, mouseWorld);
        float mouseInfluence = exp(-distToMouse * 8.0) * uMouseStrength * 10.0;
        intensity += mouseInfluence;

        float ripple = sin(distToMouse * 20.0 - iTime * 5.0) * 0.1 * mouseInfluence;
        intensity += ripple;
    }

    if(uUsePageLoadAnimation > 0.5){
        float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
        float cellDelay = cellRandom * 0.8;
        float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);

        float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
        intensity *= fadeAlpha;
    }

    p = fract(p);
    p *= uDigitSize;

    float px5 = p.x * 5.0;
    float py5 = (1.0 - p.y) * 5.0;
    float x = fract(px5);
    float y = fract(py5);

    float i = floor(py5) - 2.0;
    float j = floor(px5) - 2.0;
    float n = i * i + j * j;
    float f = n * 0.0625;

    float isOn = step(0.1, intensity - f);
    float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);

    return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c)
{
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look)
{
    float y = look.y - mod(iTime * 0.25, 1.0);
    float window = 1.0 / (1.0 + 50.0 * y * y);
    return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p){

    float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
    bar *= uScanlineIntensity;

    float displacement = displace(p);
    p.x += displacement;
    if (uGlitchAmount != 1.0) {
      float extra = displacement * (uGlitchAmount - 1.0);
      p.x += extra;
    }
    float middle = digit(p);

    const float off = 0.002;
    float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
                digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
                digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));

    vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
    return baseColor;
}

vec2 barrel(vec2 uv){
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c = (1.0 + uCurvature * r2) * c;
  return c * 0.5 + 0.5;
}

void main() {
    time = iTime * 0.333333;
    vec2 uv = vUv;
    if(uCurvature != 0.0){
      uv = barrel(uv);
    }

    vec2 p = uv * uScale;
    vec3 col = getColor(p);
    if(uChromaticAberration != 0.0){
      vec2 ca = vec2(uChromaticAberration) / iResolution.xy;
      col.r = getColor(p + ca).r;
      col.b = getColor(p - ca).b;
    }
    col *= uTint;
    col *= uBrightness;
    if(uDither > 0.0){
      float rnd = hash21(gl_FragCoord.xy);
      col += (rnd - 0.5) * (uDither * 0.003922);
    }
    gl_FragColor = vec4(col, 1.0);
}
`;

  /* Los mismos valores elegidos en la paleta del componente. Los que no
     aparecen en esa lista se quedan en el valor por omision del original:
     gridMul [2,1], glitchAmount 1, mouseReact y pageLoadAnimation activos,
     y chromaticAberration en 0. */
  var OPC = {
    scale: 4,
    gridMul: [2, 1],
    digitSize: 1.1,
    timeScale: 0.22,
    scanlineIntensity: 0.4,
    glitchAmount: 1,
    flickerAmount: 0.35,
    noiseAmp: 0.8,
    chromaticAberration: 0,
    dither: 0.4,
    curvature: 0.34,
    tint: '#f4ece0',
    mouseReact: true,
    mouseStrength: 0.12,
    pageLoadAnimation: true,
    brightness: 1.5
  };

  function aRgb(hex){
    var h = hex.replace('#', '').trim();
    if(h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h, 16);
    return [((n >> 16) & 255)/255, ((n >> 8) & 255)/255, (n & 255)/255];
  }

  function compilar(gl, tipo, fuente){
    var s = gl.createShader(tipo);
    gl.shaderSource(s, fuente);
    gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
      /* Un shader que no compila deja la banda en negro sin decir por que.
         Se avisa y se devuelve null para que el llamador se retire limpio. */
      console.error('FaultyTerminal: shader no compila\n' + gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function arrancar(caja){
    var lienzo = document.createElement('canvas');
    var gl = lienzo.getContext('webgl', {antialias:false, alpha:false, depth:false})
          || lienzo.getContext('experimental-webgl');
    /* Sin WebGL la banda se queda con su fondo liso: no es contenido, es
       decoracion, asi que no hace falta ningun respaldo. */
    if(!gl) return;

    var vs = compilar(gl, gl.VERTEX_SHADER, VERT);
    var fs = compilar(gl, gl.FRAGMENT_SHADER, FRAG);
    if(!vs || !fs) return;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, 'position');
    gl.bindAttribLocation(prog, 1, 'uv');
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
      console.error('FaultyTerminal: no enlaza\n' + gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    /* Un solo triangulo mas grande que la pantalla, no dos que formen un
       cuadrado: evita la costura diagonal donde se tocan y son la mitad
       de fragmentos en el borde. */
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      /* position */ -1,-1,  3,-1, -1,3,
      /* uv       */  0, 0,  2, 0,  0,2
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 24);

    var u = {};
    ['iTime','iResolution','uScale','uGridMul','uDigitSize','uScanlineIntensity',
     'uGlitchAmount','uFlickerAmount','uNoiseAmp','uChromaticAberration','uDither',
     'uCurvature','uTint','uMouse','uMouseStrength','uUseMouse','uPageLoadProgress',
     'uUsePageLoadAnimation','uBrightness'].forEach(function(n){
      u[n] = gl.getUniformLocation(prog, n);
    });

    var quieto = matchMedia('(prefers-reduced-motion: reduce)');
    var reduce = quieto.matches;
    var tinte = aRgb(OPC.tint);

    gl.uniform1f(u.uScale, OPC.scale);
    gl.uniform2f(u.uGridMul, OPC.gridMul[0], OPC.gridMul[1]);
    gl.uniform1f(u.uDigitSize, OPC.digitSize);
    gl.uniform1f(u.uScanlineIntensity, OPC.scanlineIntensity);
    gl.uniform1f(u.uGlitchAmount, OPC.glitchAmount);
    gl.uniform1f(u.uFlickerAmount, OPC.flickerAmount);
    gl.uniform1f(u.uNoiseAmp, OPC.noiseAmp);
    gl.uniform1f(u.uChromaticAberration, OPC.chromaticAberration);
    gl.uniform1f(u.uDither, OPC.dither);
    gl.uniform1f(u.uCurvature, OPC.curvature);
    gl.uniform3f(u.uTint, tinte[0], tinte[1], tinte[2]);
    gl.uniform1f(u.uMouseStrength, OPC.mouseStrength);
    gl.uniform2f(u.uMouse, 0.5, 0.5);

    function aplicarModo(){
      reduce = quieto.matches;
      gl.uniform1f(u.uUseMouse, (OPC.mouseReact && !reduce) ? 1 : 0);
      gl.uniform1f(u.uUsePageLoadAnimation, (OPC.pageLoadAnimation && !reduce) ? 1 : 0);
      gl.uniform1f(u.uPageLoadProgress, (OPC.pageLoadAnimation && !reduce) ? 0 : 1);
      gl.uniform1f(u.uBrightness, OPC.brightness);
      sucio = true;
    }
    if(quieto.addEventListener) quieto.addEventListener('change', aplicarModo);

    /* El sombreador llama a digit() nueve veces por fragmento y cada una
       recorre un fbm, asi que el coste sube con el cuadrado del ratio de
       pixeles. Se topa en 1.5 en vez de 2: en pantallas densas la
       diferencia no se nota y el trabajo por cuadro casi se dobla. */
    var RATIO = Math.min(window.devicePixelRatio || 1, 1.5);

    function medir(){
      var an = Math.max(1, Math.round(caja.clientWidth  * RATIO));
      var al = Math.max(1, Math.round(caja.clientHeight * RATIO));
      if(lienzo.width === an && lienzo.height === al) return;
      lienzo.width = an; lienzo.height = al;
      lienzo.style.width = '100%'; lienzo.style.height = '100%';
      gl.viewport(0, 0, an, al);
      gl.uniform3f(u.iResolution, an, al, an / al);
      sucio = true;
    }

    var ro = new ResizeObserver(medir);
    ro.observe(caja);
    medir();

    var aLaVista = true;
    new IntersectionObserver(function(e){
      aLaVista = e[0].isIntersecting;
    }, {rootMargin:'10%'}).observe(caja);

    var raton = {x:.5, y:.5}, suave = {x:.5, y:.5};
    if(OPC.mouseReact){
      /* A nivel de ventana y no del lienzo: la capa lleva
         pointer-events:none, asi que nunca recibiria el evento. */
      addEventListener('mousemove', function(e){
        var r = caja.getBoundingClientRect();
        if(!r.width || !r.height) return;
        raton.x = (e.clientX - r.left) / r.width;
        raton.y = 1 - (e.clientY - r.top) / r.height;
      }, {passive:true});
    }

    aplicarModo();

    var lazo = 0, inicioCarga = 0, congelado = 0, sucio = true;

    function cuadro(t){
      lazo = requestAnimationFrame(cuadro);

      var corriendo = !reduce && aLaVista && !document.hidden;
      if(!corriendo && !sucio) return;

      if(!reduce){
        congelado = t * 0.001 * OPC.timeScale;
        gl.uniform1f(u.iTime, congelado);
      } else {
        gl.uniform1f(u.iTime, congelado);
      }

      if(OPC.pageLoadAnimation && !reduce){
        if(!inicioCarga) inicioCarga = t;
        gl.uniform1f(u.uPageLoadProgress, Math.min((t - inicioCarga) / 2000, 1));
      }

      if(OPC.mouseReact && !reduce){
        suave.x += (raton.x - suave.x) * 0.08;
        suave.y += (raton.y - suave.y) * 0.08;
        gl.uniform2f(u.uMouse, suave.x, suave.y);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      sucio = false;
    }

    caja.appendChild(lienzo);
    lazo = requestAnimationFrame(cuadro);

    addEventListener('pagehide', function(){
      cancelAnimationFrame(lazo);
      ro.disconnect();
      var perder = gl.getExtension('WEBGL_lose_context');
      if(perder) perder.loseContext();
    });
  }

  function iniciar(){
    var caja = document.querySelector('[data-terminal]');
    if(caja) arrancar(caja);
  }

  if(document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', iniciar);
  else
    iniciar();
})();
