/* ============================================================
   TRANSICION ENTRE PAGINAS
   No usa fetch a proposito: al abrir el sitio con doble clic el
   protocolo file:// lo bloquea. En vez de eso una cortina cubre la
   pantalla, se navega de verdad, y la pagina nueva la retira. El
   corte queda oculto detras de la cortina, asi que se ve continuo
   y ademas conserva URLs reales para SEO.
   ============================================================ */
(function(){
  const EASE='cubic-bezier(.32,0,.12,1)';   /* la misma curva del resto del sitio */
  const DUR=560;

  /* Si la pagina trae su cortina en el marcado, se usa esa. Es
     importante: creada aca, el script vive al final del cuerpo, asi
     que el navegador alcanza a pintar la pagina DESTAPADA y recien
     despues se cubre. En una pagina cuyo contenido entra animado eso
     se ve como un destello de pantalla vacia antes de la cortina. En
     el marcado, tapa desde el primer pintado. */
  let cortina=document.querySelector('.cortina');
  if(!cortina){
    cortina=document.createElement('div');
    cortina.className='cortina';
    cortina.innerHTML='<span class="cortina__marca"></span>';
    document.documentElement.appendChild(cortina);
  }

  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- entrada: retirar la cortina ----------
     No depende del rAF: si el navegador lo estrangula (pestaña de
     fondo, panel embebido) la pagina se quedaria en negro. Se usa
     setTimeout y ademas un seguro que la limpia pase lo que pase. */
  let limpia=null;
  function entrar(){
    clearTimeout(limpia);
    setTimeout(()=>{
      cortina.classList.add('cortina--fuera');
      cortina.classList.remove('cortina--dentro');
    },20);
    limpia=setTimeout(()=>{
      /* volver al reposo SIN animar: si no, la cortina baja de vuelta
         cruzando la pantalla y se ve una barra negra barriendo */
      cortina.style.transition='none';
      cortina.classList.remove('cortina--fuera','cortina--dentro');
      void cortina.offsetHeight;               /* forzar reflow */
      cortina.style.transition='';
    },DUR+200);
  }
  /* seguro de ultima instancia: nunca dejar la pantalla cubierta */
  setTimeout(()=>{
    if(cortina.classList.contains('cortina--dentro')) entrar();
  },1800);
  if(reduce){ cortina.remove(); }
  else {
    cortina.classList.add('cortina--dentro');
    if(document.readyState==='complete') entrar();
    else addEventListener('load',entrar,{once:true});
  }

  /* ---------- salida: cubrir y recien ahi navegar ---------- */
  function salir(url){
    cortina.classList.remove('cortina--fuera');
    cortina.classList.add('cortina--dentro');
    setTimeout(()=>{location.href=url;},DUR);
  }

  document.addEventListener('click',e=>{
    if(reduce) return;
    const a=e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    const href=a.getAttribute('href');
    if(!href||href[0]==='#') return;                  /* anclas internas: scroll normal */
    if(a.target==='_blank'||a.hasAttribute('download')) return;
    if(/^(mailto:|tel:|javascript:)/i.test(href)) return;
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0) return;
    /* solo enlaces del propio sitio */
    const destino=new URL(href,location.href);
    if(destino.origin!==location.origin) return;
    if(destino.pathname===location.pathname && destino.hash) return;
    e.preventDefault();
    salir(destino.href);
  });

  /* si se vuelve con el boton atras, el navegador puede servir la pagina
     desde cache con la cortina puesta: hay que retirarla */
  addEventListener('pageshow',ev=>{ if(ev.persisted) entrar(); });
})();
