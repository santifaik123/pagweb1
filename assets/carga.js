/* ============================================================
   PANTALLA DE CARGA

   No existe para tapar una espera: existe porque el intro empieza a
   animar en el primer cuadro pintado y sus ocho piezas son imagenes. En
   una conexion lenta la animacion arranca con huecos y se come su propio
   primer segundo. Esta capa retiene la pagina hasta que esas piezas
   estan decodificadas, y recien entonces suelta el intro.

   Por eso mide lo que de verdad hace falta y no un porcentaje inventado:
   las piezas del intro, la marca del encabezado y las tipografias. Y por
   eso, si el intro no va a correr -- movimiento reducido, o ya se vio en
   esta sesion -- no espera las piezas: no las necesita.

   El marcado de la capa vive en el HTML, no lo crea este archivo. Tiene
   que tapar desde el primer pintado, y para cuando un script corre el
   navegador ya dibujo algo.
   ============================================================ */
(function(){
  'use strict';

  var capa = document.getElementById('carga');
  if(!capa) return;

  /* Bandera para intro.js, que se gatilla con el evento de mas abajo.
     Se pone antes que nada: intro.js corre despues de este archivo y
     tiene que encontrarla puesta. */
  window.__nuvikCarga = { listo:false };

  var barra = document.getElementById('cargaBarra');
  var cifra = document.getElementById('cargaPct');

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var yaFue = false;
  try { yaFue = sessionStorage.getItem('nuvik:intro') === '1'; } catch(e){}
  var habraIntro = !reduce && !yaFue;

  /* Tiempos. MIN evita el parpadeo cuando todo viene de cache y la capa
     aparece y desaparece en el mismo suspiro. MAX es el seguro: una
     imagen que nunca llega no puede dejar la pagina tapada. */
  var MIN = 420, MAX = 5000, SALIDA = 560;
  var t0 = Date.now();

  function imagen(src){
    return new Promise(function(res){
      var im = new Image();
      /* resuelve igual si falla: el objetivo es no bloquear, y una pieza
         que no llego es problema del intro, no de esta capa */
      im.onload = im.onerror = function(){ res(); };
      im.src = src;
      if(im.decode) im.decode().then(res, function(){});
    });
  }

  var tareas = [];
  if(habraIntro){
    for(var i = 0; i < 8; i++) tareas.push(imagen('intro/p' + i + '.png'));
  }
  tareas.push(imagen('logos/nuvik-symbol-white.png'));
  if(document.fonts && document.fonts.ready) tareas.push(document.fonts.ready);

  var hechas = 0, total = tareas.length || 1;

  function pinta(){
    var real = hechas / total;
    /* El tiempo minimo tambien cuenta como avance. Sin esto la barra
       salta a 100 y la capa se queda quieta esperando a MIN, que se lee
       como que algo se colgo. */
    var porTiempo = Math.min(1, (Date.now() - t0) / MIN);
    var p = Math.round(Math.min(real, porTiempo) * 100);
    if(barra) barra.style.width = p + '%';
    if(cifra) cifra.textContent = p;
  }
  pinta();
  var reloj = setInterval(pinta, 80);

  tareas.forEach(function(t){
    Promise.resolve(t).then(function(){ hechas++; pinta(); },
                            function(){ hechas++; pinta(); });
  });

  var soltado = false;
  function soltar(){
    if(soltado) return;
    soltado = true;
    clearInterval(reloj);
    if(barra) barra.style.width = '100%';
    if(cifra) cifra.textContent = '100';

    window.__nuvikCarga.listo = true;
    /* El intro arranca con la capa todavia encima y desvaneciendose. Es
       a proposito: sus primeros cuadros son las piezas entrando desde
       fuera del cuadro, asi que no hay nada que perderse, y el relevo no
       tiene un hueco negro en medio. */
    dispatchEvent(new Event('nuvik:carga-fin'));

    capa.classList.add('carga--fuera');
    setTimeout(function(){ capa.remove(); }, SALIDA + 60);
  }

  Promise.all(tareas.map(function(t){
    return Promise.resolve(t).catch(function(){});
  })).then(function(){
    setTimeout(soltar, Math.max(0, MIN - (Date.now() - t0)));
  });

  setTimeout(soltar, MAX);
})();
