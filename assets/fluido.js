/* ============================================================
   FLUIDO EN LA GPU — modulo compartido
   Navier-Stokes por el metodo de Stable Fluids. Cada frame:
   advectar -> divergencia -> resolver presion por Jacobi ->
   restar el gradiente, que deja el campo sin divergencia. Eso
   ultimo es lo que produce los remolinos: un fluido incompresible
   no puede acumularse en un punto, tiene que desviarse.

   Dos modos de salida:
     'video'   dibuja un <video> como textura e invierte donde hay tinta.
     'mascara' dibuja la tinta en blanco sobre negro. Combinado con
               mix-blend-mode:difference invierte lo que tenga debajo,
               sea una imagen o un fondo hecho con CSS.
   ============================================================ */
window.crearFluido = function(op){
  const media = op.contenedor;
  if(!media) return null;
  if(matchMedia('(hover:none)').matches) return null;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches) return null;

  const modo  = op.modo || 'mascara';
  const video = op.video || null;

  const cv = document.createElement('canvas');
  cv.className = op.clase || 'fluido-canvas';
  const gl = cv.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false});
  if(!gl) return null;                              /* sin WebGL2 no se monta nada */
  if(!gl.getExtension('EXT_color_buffer_float')) return null;
  gl.getExtension('OES_texture_float_linear');
  (op.destino || media).appendChild(cv);
  media.classList.add('con-fluido');

  /* ---------- shaders ---------- */
  const compilar=(tipo,src)=>{
    const sh=gl.createShader(tipo);
    gl.shaderSource(sh,src); gl.compileShader(sh);
    if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  };
  const VERT=`#version 300 es
  precision highp float;
  layout(location=0) in vec2 aPos;
  out vec2 vUv,vL,vR,vT,vB;
  uniform vec2 uTexel;
  void main(){
    vUv=aPos*0.5+0.5;
    vL=vUv-vec2(uTexel.x,0.0); vR=vUv+vec2(uTexel.x,0.0);
    vT=vUv+vec2(0.0,uTexel.y); vB=vUv-vec2(0.0,uTexel.y);
    gl_Position=vec4(aPos,0.0,1.0);
  }`;
  const programa=(fragSrc)=>{
    const pr=gl.createProgram();
    gl.attachShader(pr,compilar(gl.VERTEX_SHADER,VERT));
    gl.attachShader(pr,compilar(gl.FRAGMENT_SHADER,fragSrc));
    gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(pr));
    const u={}, n=gl.getProgramParameter(pr,gl.ACTIVE_UNIFORMS);
    for(let i=0;i<n;i++){
      const nm=gl.getActiveUniform(pr,i).name;
      u[nm]=gl.getUniformLocation(pr,nm);
    }
    return {pr,u};
  };

  const CAB=`#version 300 es
  precision highp float; precision highp sampler2D;
  in vec2 vUv,vL,vR,vT,vB; out vec4 salida;`;

  const pAdveccion=programa(CAB+`
  uniform sampler2D uVel,uFuente; uniform vec2 uTexel; uniform float uDt,uDisip;
  void main(){
    vec2 coord=vUv-uDt*texture(uVel,vUv).xy*uTexel;
    salida=texture(uFuente,coord)*uDisip;
  }`);

  const pDivergencia=programa(CAB+`
  uniform sampler2D uVel;
  void main(){
    float L=texture(uVel,vL).x, R=texture(uVel,vR).x;
    float T=texture(uVel,vT).y, B=texture(uVel,vB).y;
    salida=vec4(0.5*(R-L+T-B),0.0,0.0,1.0);
  }`);

  const pPresion=programa(CAB+`
  uniform sampler2D uPres,uDiv;
  void main(){
    float L=texture(uPres,vL).x, R=texture(uPres,vR).x;
    float T=texture(uPres,vT).x, B=texture(uPres,vB).x;
    float d=texture(uDiv,vUv).x;
    salida=vec4((L+R+B+T-d)*0.25,0.0,0.0,1.0);
  }`);

  const pGradiente=programa(CAB+`
  uniform sampler2D uPres,uVel;
  void main(){
    float L=texture(uPres,vL).x, R=texture(uPres,vR).x;
    float T=texture(uPres,vT).x, B=texture(uPres,vB).x;
    vec2 v=texture(uVel,vUv).xy;
    v-=vec2(R-L,T-B)*0.5;
    salida=vec4(v,0.0,1.0);
  }`);

  const pSalpicar=programa(CAB+`
  uniform sampler2D uDestino; uniform float uAspecto,uRadio;
  uniform vec2 uPunto; uniform vec3 uColor;
  void main(){
    vec2 p=vUv-uPunto; p.x*=uAspecto;
    vec3 s=exp(-dot(p,p)/uRadio)*uColor;
    salida=vec4(texture(uDestino,vUv).xyz+s,1.0);
  }`);

  /* modo video: la tinta decide donde invertir la imagen */
  const pVideo=programa(CAB+`
  uniform sampler2D uTinta,uVideo; uniform vec2 uEscala;
  void main(){
    /* uEscala recorta en vez de estirar: es el object-fit:cover */
    vec2 base=vec2(vUv.x,1.0-vUv.y);
    vec3 col=texture(uVideo,(base-0.5)*uEscala+0.5).rgb;
    float d=clamp(texture(uTinta,vUv).r,0.0,1.0);
    salida=vec4(mix(col,1.0-col,smoothstep(0.03,0.30,d)),1.0);
  }`);

  /* modo mascara: blanco donde hay tinta. Con difference, invierte lo de abajo */
  const pMascara=programa(CAB+`
  uniform sampler2D uTinta;
  void main(){
    float d=clamp(texture(uTinta,vUv).r,0.0,1.0);
    salida=vec4(vec3(smoothstep(0.03,0.30,d)),1.0);
  }`);

  const pMostrar = modo==='video' ? pVideo : pMascara;

  /* ---------- geometria ---------- */
  const vao=gl.createVertexArray(); gl.bindVertexArray(vao);
  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);

  const dibujar=destino=>{
    gl.bindFramebuffer(gl.FRAMEBUFFER,destino?destino.fbo:null);
    gl.viewport(0,0,destino?destino.w:cv.width,destino?destino.h:cv.height);
    gl.drawArrays(gl.TRIANGLES,0,3);
  };

  /* ---------- destinos de render ---------- */
  const crearFBO=(w,h,fmtInt,fmt,tipo,filtro)=>{
    const tex=gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,filtro);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,filtro);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,fmtInt,w,h,0,fmt,tipo,null);
    const fbo=gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
    const estado=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT);
    return {tex,fbo,w,h,estado,texel:[1/w,1/h],
      unir(u){gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,tex);return u;}};
  };
  const dobleFBO=(w,h,fmtInt,fmt,tipo,filtro)=>({
    lee:crearFBO(w,h,fmtInt,fmt,tipo,filtro),
    escribe:crearFBO(w,h,fmtInt,fmt,tipo,filtro),
    texel:[1/w,1/h], w, h,
    girar(){const t=this.lee;this.lee=this.escribe;this.escribe=t;}
  });

  const RES_SIM=128, RES_TINTA=256;
  const LIN=gl.LINEAR, CERCA=gl.NEAREST;
  const velocidad   =dobleFBO(RES_SIM,RES_SIM,gl.RG16F,gl.RG,gl.HALF_FLOAT,LIN);
  const tinta       =dobleFBO(RES_TINTA,RES_TINTA,gl.RGBA16F,gl.RGBA,gl.HALF_FLOAT,LIN);
  const presion     =dobleFBO(RES_SIM,RES_SIM,gl.R16F,gl.RED,gl.HALF_FLOAT,CERCA);
  const divergencia =crearFBO(RES_SIM,RES_SIM,gl.R16F,gl.RED,gl.HALF_FLOAT,CERCA);

  /* ---------- textura del video (solo modo video) ---------- */
  let texVideo=null;
  if(modo==='video'){
    texVideo=gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,texVideo);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,
                  new Uint8Array([0,0,0,255]));
  }

  /* ---------- entrada del puntero ---------- */
  let px=0.5,py=0.5,dx=0,dy=0,activo=false;
  media.addEventListener('pointermove',e=>{
    const r=media.getBoundingClientRect();
    const nx=(e.clientX-r.left)/r.width, ny=1-(e.clientY-r.top)/r.height;
    dx=(nx-px)*r.width*0.4; dy=(ny-py)*r.height*0.4;
    px=nx; py=ny; activo=true;
  });
  media.addEventListener('pointerleave',()=>{activo=false});

  function salpicar(x,y,vx,vy){
    gl.useProgram(pSalpicar.pr);
    gl.uniform2f(pSalpicar.u.uTexel,velocidad.texel[0],velocidad.texel[1]);
    gl.uniform1f(pSalpicar.u.uAspecto,cv.width/Math.max(1,cv.height));
    gl.uniform2f(pSalpicar.u.uPunto,x,y);
    gl.uniform1f(pSalpicar.u.uRadio,0.0005);
    gl.uniform1i(pSalpicar.u.uDestino,velocidad.lee.unir(0));
    gl.uniform3f(pSalpicar.u.uColor,vx,vy,0);
    dibujar(velocidad.escribe); velocidad.girar();

    gl.uniform1i(pSalpicar.u.uDestino,tinta.lee.unir(0));
    gl.uniform3f(pSalpicar.u.uColor,1,1,1);
    dibujar(tinta.escribe); tinta.girar();
  }

  /* ---------- un paso de simulacion ---------- */
  const ITER_PRESION=18;
  function paso(dt){
    gl.disable(gl.BLEND);

    gl.useProgram(pDivergencia.pr);
    gl.uniform2f(pDivergencia.u.uTexel,velocidad.texel[0],velocidad.texel[1]);
    gl.uniform1i(pDivergencia.u.uVel,velocidad.lee.unir(0));
    dibujar(divergencia);

    gl.useProgram(pPresion.pr);
    gl.uniform2f(pPresion.u.uTexel,velocidad.texel[0],velocidad.texel[1]);
    gl.uniform1i(pPresion.u.uDiv,divergencia.unir(0));
    for(let i=0;i<ITER_PRESION;i++){
      gl.uniform1i(pPresion.u.uPres,presion.lee.unir(1));
      dibujar(presion.escribe); presion.girar();
    }

    gl.useProgram(pGradiente.pr);
    gl.uniform2f(pGradiente.u.uTexel,velocidad.texel[0],velocidad.texel[1]);
    gl.uniform1i(pGradiente.u.uPres,presion.lee.unir(0));
    gl.uniform1i(pGradiente.u.uVel,velocidad.lee.unir(1));
    dibujar(velocidad.escribe); velocidad.girar();

    gl.useProgram(pAdveccion.pr);
    gl.uniform2f(pAdveccion.u.uTexel,velocidad.texel[0],velocidad.texel[1]);
    gl.uniform1f(pAdveccion.u.uDt,dt);
    gl.uniform1i(pAdveccion.u.uVel,velocidad.lee.unir(0));
    gl.uniform1i(pAdveccion.u.uFuente,velocidad.lee.unir(0));
    gl.uniform1f(pAdveccion.u.uDisip,0.985);        /* la velocidad se apaga sola */
    dibujar(velocidad.escribe); velocidad.girar();

    gl.uniform1i(pAdveccion.u.uVel,velocidad.lee.unir(0));
    gl.uniform1i(pAdveccion.u.uFuente,tinta.lee.unir(1));
    gl.uniform1f(pAdveccion.u.uDisip,0.972);        /* la tinta se disuelve */
    dibujar(tinta.escribe); tinta.girar();
  }

  let videoUsable = true;
  function rendirse(){
    /* Abierto con doble clic (file://) el navegador puede tratar el video
       como origen opaco y negarse a subirlo como textura. En vez de dejar
       un rectangulo negro, se desmonta el fluido y vuelve el <video> normal. */
    videoUsable = false;
    media.classList.remove('con-fluido');
    if(cv.parentNode) cv.remove();
  }

  function mostrar(){
    if(modo==='video' && !videoUsable) return;
    gl.useProgram(pMostrar.pr);
    gl.uniform2f(pMostrar.u.uTexel,1/cv.width,1/cv.height);
    gl.uniform1i(pMostrar.u.uTinta,tinta.lee.unir(0));
    if(modo==='video' && video){
      if(video.readyState>=2){
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D,texVideo);
        try{
          gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,video);
        }catch(e){ rendirse(); return; }
      }
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,texVideo);
      gl.uniform1i(pMostrar.u.uVideo,1);
      const aLienzo=cv.width/Math.max(1,cv.height);
      const aVideo=(video.videoWidth||16)/(video.videoHeight||9);
      gl.uniform2f(pMostrar.u.uEscala,
        aLienzo>aVideo ? 1 : aLienzo/aVideo,
        aLienzo>aVideo ? aVideo/aLienzo : 1);
    }
    dibujar(null);
  }

  function medir(){
    const r=media.getBoundingClientRect();
    const dpr=Math.min(devicePixelRatio||1,2);
    const w=Math.max(1,Math.round(r.width*dpr)), h=Math.max(1,Math.round(r.height*dpr));
    if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}
  }
  addEventListener('resize',medir); medir();

  let ultimo=0;
  (function bucle(ahora){
    const dt=Math.min(0.016,(ahora-ultimo)/1000)||0.016; ultimo=ahora;
    medir();
    if(activo&&(Math.abs(dx)>0.01||Math.abs(dy)>0.01)){
      salpicar(px,py,dx,dy); dx*=0.85; dy*=0.85;
    }
    paso(dt);
    mostrar();
    requestAnimationFrame(bucle);
  })(0);

  /* expuesto para poder verificarlo sin depender del rAF */
  return {paso,salpicar,mostrar,medir,gl,cv,modo,
    campos:{velocidad,tinta,presion,divergencia},
    leerTinta(){
      const f=tinta.lee, px4=new Float32Array(4*16);
      gl.bindFramebuffer(gl.FRAMEBUFFER,f.fbo);
      gl.readPixels(f.w/2-2,f.h/2-2,4,4,gl.RGBA,gl.FLOAT,px4);
      let s=0; for(let i=0;i<px4.length;i+=4) s+=px4[i];
      return s;
    }};
};
