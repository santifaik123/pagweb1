/* ============================================================
   INTRO — portado del diseño "Nuvik Web Intro"
   Las ocho piezas del símbolo entran escalonadas desde afuera y
   se ensamblan en el centro. Después la marca cae al vacío —
   gravedad, se achica, gira apenas y se desenfoca — mientras un
   iris circular abre la página real debajo.

   Diferencia con el archivo de diseño: allá el contenido vivía
   dentro del componente. Acá el intro es una capa encima del
   sitio real y se retira sola al terminar.
   ============================================================ */
(function(){
  const TOTAL = 3.3;
  const PIEZAS = [
    { src:'intro/p3.png', cx:0.3403, cy:0.3401, tipo:'s', at:0.00 },
    { src:'intro/p2.png', cx:0.6579, cy:0.3400, tipo:'s', at:0.08 },
    { src:'intro/p1.png', cx:0.3400, cy:0.6551, tipo:'s', at:0.16 },
    { src:'intro/p0.png', cx:0.6579, cy:0.6552, tipo:'s', at:0.24 },
    { src:'intro/p7.png', cx:0.4986, cy:0.1112, tipo:'b', at:0.52 },
    { src:'intro/p5.png', cx:0.0973, cy:0.4964, tipo:'b', at:0.60 },
    { src:'intro/p6.png', cx:0.8999, cy:0.4962, tipo:'b', at:0.68 },
    { src:'intro/p4.png', cx:0.4986, cy:0.8909, tipo:'b', at:0.76 },
  ];

  const cabecera = document.getElementById('header');
  const logo     = cabecera && cabecera.querySelector('.header__logo');
  const nav      = cabecera && cabecera.querySelector('.header__nav');

  /* El intro es la presentacion del sitio: va una vez por sesion.
     Al volver desde el portafolio o una pagina de caso, repetir los
     3.3s justo despues de la cortina rompe la continuidad — se ve
     cortina, intro entero, y recien la pagina. Con movimiento
     reducido tampoco va. */
  var yaFue = false;
  try { yaFue = sessionStorage.getItem('nuvik:intro') === '1'; } catch(e){}
  if(matchMedia('(prefers-reduced-motion:reduce)').matches || yaFue){
    document.body.classList.add('is-ready');
    /* el fluido del hero espera esta señal para arrancar */
    dispatchEvent(new Event('nuvik:intro-fin'));
    return;
  }
  try { sessionStorage.setItem('nuvik:intro','1'); } catch(e){}

  /* ---------- capas ---------- */
  const capa = document.createElement('div');
  capa.className = 'intro';
  capa.innerHTML =
    '<div class="intro__fondo">'
  +   '<span class="intro__grano"></span>'
  +   '<span class="intro__halo"></span>'
  + '</div>';
  document.body.appendChild(capa);

  /* La marca va colgada del body, NO dentro de .intro. Es a proposito:
     .intro es position:fixed y eso aisla el contexto de apilamiento, asi
     que ahi adentro el mix-blend-mode solo veria el fondo del intro.
     Colgada del body mezcla contra todo lo que hay debajo — el fondo
     mientras existe, y la pagina real cuando el iris lo abre. */
  const marca = document.createElement('div');
  marca.className = 'intro__marca';
  document.body.appendChild(marca);
  document.documentElement.classList.add('intro-activo');

  const fondo = capa.querySelector('.intro__fondo');
  const imgs = PIEZAS.map(p=>{
    const im = document.createElement('img');
    im.src = p.src; im.alt = ''; im.decoding = 'async';
    marca.appendChild(im);
    return im;
  });

  /* ---------- curvas del diseño ---------- */
  const seg = (t,s,e,ease)=>{
    const p = Math.max(0, Math.min(1, (t-s)/(e-s)));
    if(ease==='outQuart')   return 1-Math.pow(1-p,4);
    if(ease==='outQuint')   return 1-Math.pow(1-p,5);
    if(ease==='outExpo')    return p===1?1:1-Math.pow(2,-9*p);
    if(ease==='inOutCubic') return p<0.5 ? 4*p*p*p : 1-Math.pow(-2*p+2,3)/2;
    if(ease==='inCubic')    return p*p*p;
    if(ease==='inQuad')     return p*p;
    return p;
  };

  /* ---------- medidas ---------- */
  let w=innerWidth, h=innerHeight, markPx=0;
  function medir(){
    w = innerWidth; h = innerHeight;
    markPx = Math.max(160, Math.round(Math.min(Math.min(w,h)*0.42, 400)));
    marca.style.width = markPx+'px';
    marca.style.height = markPx+'px';
  }
  addEventListener('resize', medir);
  medir();

  /* el header aparece recien cuando la marca llega */
  if(logo) logo.style.opacity = '0';
  if(nav){ nav.style.opacity = '0'; }

  /* ---------- un cuadro ---------- */
  let heroListo = false, terminado = false;
  function cuadro(t){
    /* la marca cae al vacio: gravedad, se aleja y se apaga */
    const caida = seg(t, 1.62, 2.95, 'inCubic');
    const deriva = seg(t, 1.62, 2.95, 'inQuad');
    const mx = 0, my = caida * (Math.max(h,600)*0.95 + 260);
    const ms = 1 - 0.42*deriva;
    const mrot = 34*deriva;
    const markOp = 1 - seg(t, 2.0, 2.82, 'inQuad');
    const markBlur = deriva*9;
    const bloom = (t>1.3 && t<2.1) ? Math.sin(((t-1.3)/0.8)*Math.PI) : 0;

    marca.style.opacity = markOp.toFixed(3);
    marca.style.transform =
      'translate(-50%,-50%) translate('+mx.toFixed(2)+'px,'+my.toFixed(2)+'px)'
      +' scale('+ms.toFixed(4)+') rotate('+mrot.toFixed(2)+'deg)';
    marca.style.filter =
      'blur('+markBlur.toFixed(2)+'px) drop-shadow(0 0 '+(14+54*bloom).toFixed(1)
      +'px rgba(255,255,255,'+(0.32+0.34*bloom).toFixed(3)+'))';

    PIEZAS.forEach((p,i)=>{
      const s = p.at, e = s + (p.tipo==='s' ? 0.92 : 0.62);
      const d = 1 - seg(t, s, e, 'outQuart');
      const ux = p.cx-0.5, uy = p.cy-0.5;
      const len = Math.hypot(ux,uy) || 1;
      const dist = (p.tipo==='s' ? 0.95 : 0.72) * markPx * d;
      const im = imgs[i];
      im.style.opacity = seg(t, s, s+0.3, 'outQuart').toFixed(3);
      im.style.transform =
        'translate('+((ux/len)*dist).toFixed(2)+'px,'+((uy/len)*dist).toFixed(2)+'px)'
        +' rotate('+((p.tipo==='s'?-20:12)*d).toFixed(2)+'deg)'
        +' scale('+(1+d*0.2).toFixed(3)+')';
      im.style.filter = 'blur('+(d*6).toFixed(2)+'px)';
    });

    /* iris: el agujero transparente crece y se lleva el fondo */
    const maxR = Math.max(Math.hypot(w,h), 900)*0.62;
    const r = seg(t, 1.82, 2.72, 'outQuint') * maxR;
    const mascara = 'radial-gradient(circle at 50% 50%, transparent '
      + r.toFixed(1) + 'px, #000 ' + (r+1).toFixed(1) + 'px)';
    fondo.style.webkitMaskImage = mascara;
    fondo.style.maskImage = mascara;

    if(logo) logo.style.opacity = seg(t, 2.44, 2.62, 'linear').toFixed(3);
    if(nav){
      nav.style.opacity = seg(t, 2.18, 2.72, 'outQuart').toFixed(3);
      nav.style.transform = 'translateY('+(16*(1-seg(t,2.18,2.9,'outQuart'))).toFixed(2)+'px)';
    }

    /* el titular del hero arranca junto con el h1 del diseño */
    if(!heroListo && t >= 1.98){
      heroListo = true;
      document.body.classList.add('is-ready');
    }
  }

  function terminar(){
    if(terminado) return;
    terminado = true;
    document.body.classList.add('is-ready');
    document.documentElement.classList.remove('intro-activo');
    if(logo){ logo.style.opacity=''; }
    if(nav){ nav.style.opacity=''; nav.style.transform=''; }
    capa.remove();
    marca.remove();
    dispatchEvent(new Event('nuvik:intro-fin'));
  }

  /* ---------- reproduccion ---------- */
  let t0 = null;
  function tick(ahora){
    if(t0 === null){
      /* el reloj parte en el primer cuadro pintado, no al cargar el script:
         asi una carga lenta no se come el principio de la animacion */
      t0 = ahora;
      setTimeout(terminar, (TOTAL + 2) * 1000);   /* seguro relativo */
    }
    const t = (ahora - t0)/1000;
    cuadro(Math.min(t, TOTAL));
    if(t < TOTAL) requestAnimationFrame(tick);
    else terminar();
  }
  requestAnimationFrame(tick);

  /* Si el rAF nunca llega a correr, el intro no puede dejar la pagina
     tapada: a los 6s se retira igual. */
  setTimeout(terminar, 6000);
})();
