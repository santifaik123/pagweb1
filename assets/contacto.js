/* ============================================================
   PANEL DE CONTACTO
   Clon del panel de nuvik.digital. Se inyecta solo, con su propio
   estilo, para no repetir el marcado ni el CSS en las 20 paginas:
   cada una solo carga este archivo y pone un boton con
   data-contacto.

   El original postea a una API. Este sitio es estatico, asi que el
   envio arma un correo con los campos y lo abre en el cliente de
   correo. Funciona en todos lados y no inventa un backend que no
   existe; cuando haya endpoint real se cambia enviar().
   ============================================================ */
(function () {
  if (window.__panelContacto) return;
  window.__panelContacto = true;

  var CORREO = 'contacto@nuvik.digital';

  /* ---------- estilo ---------- */
  var css = document.createElement('style');
  css.textContent = [
    '.cto{position:fixed;inset:0;z-index:9998;display:none}',
    '.cto.abierto{display:block}',
    '.cto__fondo{position:absolute;inset:0;background:rgba(10,10,10,.55);',
    '  border:0;padding:0;cursor:pointer;opacity:0;transition:opacity .4s cubic-bezier(.32,0,.12,1)}',
    '.cto.dentro .cto__fondo{opacity:1}',
    /* hoja lateral: entra desde la derecha */
    '.cto__hoja{position:absolute;top:0;right:0;height:100%;width:min(760px,94vw);',
    '  background:#161617;color:#f1f1f1;display:flex;flex-direction:column;',
    '  transform:translateX(100%);transition:transform .55s cubic-bezier(.32,0,.12,1);',
    '  font-family:"Inter Tight","Helvetica Neue",Helvetica,Arial,sans-serif}',
    '.cto.dentro .cto__hoja{transform:none}',
    '.cto__cab{display:flex;align-items:center;justify-content:space-between;',
    '  padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.12);flex:0 0 auto}',
    '.cto__marca{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:-.03em}',
    '.cto__marca img{width:26px;height:26px;object-fit:contain}',
    '.cto__x{width:52px;height:52px;display:grid;place-items:center;background:transparent;',
    '  border:1px solid rgba(255,255,255,.22);color:inherit;cursor:pointer;',
    '  transition:background .3s,border-color .3s}',
    '.cto__x:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.5)}',
    '.cto__x svg{width:20px;height:20px}',
    /* se desplaza pero sin barra, igual que el resto del sitio */
    '.cto__cuerpo{flex:1 1 auto;overflow-y:auto;padding:6vh 6% 8vh;',
    '  scrollbar-width:none;-ms-overflow-style:none}',
    '.cto__cuerpo::-webkit-scrollbar{width:0;height:0;display:none}',
    '.cto__etq{font-size:11px;letter-spacing:.16em;text-transform:uppercase;',
    '  color:rgba(241,241,241,.55);margin:0 0 1.2em}',
    '.cto__titulo{font-size:clamp(30px,4.4vw,52px);line-height:1.02;letter-spacing:-.04em;',
    '  font-weight:400;margin:0 0 .5em}',
    '.cto__bajada{font-size:15px;line-height:1.6;color:rgba(241,241,241,.72);',
    '  max-width:46ch;margin:0 0 3.4em}',
    '.cto__campo{margin-bottom:2.4em}',
    '.cto__campo label{display:block;font-size:11px;letter-spacing:.14em;',
    '  text-transform:uppercase;color:rgba(241,241,241,.5);margin-bottom:.9em}',
    '.cto__campo input,.cto__campo textarea{width:100%;background:transparent;border:0;',
    '  border-bottom:1px solid rgba(255,255,255,.22);color:#f1f1f1;font:inherit;',
    '  font-size:17px;padding:0 0 .7em;outline:none;',
    '  transition:border-color .3s cubic-bezier(.32,0,.12,1)}',
    '.cto__campo textarea{resize:vertical;min-height:4.5em;line-height:1.5}',
    '.cto__campo input:focus,.cto__campo textarea:focus{border-bottom-color:#f1f1f1}',
    '.cto__campo input::placeholder,.cto__campo textarea::placeholder{color:rgba(241,241,241,.32)}',
    /* trampa para robots: invisible y fuera del orden de tabulacion */
    '.cto__trampa{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}',
    '.cto__ok{display:flex;gap:.8em;align-items:flex-start;font-size:13px;',
    '  line-height:1.5;color:rgba(241,241,241,.72);margin-bottom:2.6em;cursor:pointer}',
    '.cto__ok input{margin-top:.2em;flex:0 0 auto;accent-color:#f1f1f1}',
    '.cto__ok a{color:inherit;border-bottom:1px solid currentColor}',
    '.cto__enviar{display:inline-flex;align-items:center;gap:.7em;background:#f1f1f1;',
    '  color:#161617;border:0;font:inherit;font-size:14px;letter-spacing:.02em;',
    '  padding:1.05em 1.9em;border-radius:999px;cursor:pointer;',
    '  transition:transform .25s cubic-bezier(.32,0,.12,1),opacity .25s}',
    '.cto__enviar:hover{transform:translateY(-2px)}',
    '.cto__enviar:active{transform:translateY(0)}',
    '.cto__enviar svg{width:16px;height:16px}',
    '.cto__aviso{font-size:13px;line-height:1.5;color:rgba(241,241,241,.6);margin:1.4em 0 0}',
    '@media (max-width:700px){.cto__hoja{width:100vw}.cto__cuerpo{padding:4vh 7% 8vh}}',
    '@media (prefers-reduced-motion:reduce){.cto__hoja,.cto__fondo{transition-duration:.01ms}}'
  ].join('\n');
  document.head.appendChild(css);

  /* ---------- iconos ---------- */
  var EQUIS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"'
            + ' stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'
             + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
             + '<path d="M7 17 17 7M7 7h10v10"/></svg>';

  /* el logo y la politica cuelgan de distinta profundidad segun la pagina */
  var hondo = location.pathname.replace(/[^/]*$/, '').replace(/^\//, '');
  var pre = hondo && hondo !== '/' ? '../' : '';

  /* ---------- marcado ---------- */
  var cto = document.createElement('div');
  cto.className = 'cto';
  cto.setAttribute('role', 'dialog');
  cto.setAttribute('aria-modal', 'true');
  cto.setAttribute('aria-label', 'Cotiza tu proyecto');
  cto.innerHTML =
      '<button class="cto__fondo" type="button" aria-label="Cerrar"></button>'
    + '<section class="cto__hoja">'
    +   '<div class="cto__cab">'
    +     '<span class="cto__marca"><img src="' + pre + 'logos/nuvik-symbol-white.png" alt="">NUVIK</span>'
    +     '<button class="cto__x" type="button" aria-label="Cerrar">' + EQUIS + '</button>'
    +   '</div>'
    +   '<div class="cto__cuerpo">'
    +     '<p class="cto__etq">Cotiza tu proyecto</p>'
    +     '<h2 class="cto__titulo">Construyamos algo que mueva tu negocio.</h2>'
    +     '<p class="cto__bajada">Cuéntanos qué necesitas, qué objetivo quieres alcanzar y '
    +       'qué está ocurriendo hoy. Revisaremos el contexto antes de proponerte un alcance.</p>'
    +     '<form class="cto__form" name="contacto" data-netlify="true" data-netlify-honeypot="website_hp" novalidate>'
    +       '<div class="cto__trampa" aria-hidden="true">'
    +         '<label>Sitio web<input type="text" name="website_hp" tabindex="-1" autocomplete="off"></label>'
    +       '</div>'
    +       '<div class="cto__campo"><label for="cto-n">Nombre</label>'
    +         '<input id="cto-n" name="name" type="text" placeholder="Tu nombre" required></div>'
    +       '<div class="cto__campo"><label for="cto-e">Email</label>'
    +         '<input id="cto-e" name="email" type="email" placeholder="tu@email.com" required></div>'
    +       '<div class="cto__campo"><label for="cto-c">Empresa</label>'
    +         '<input id="cto-c" name="company" type="text" placeholder="Nombre de tu empresa"></div>'
    +       '<div class="cto__campo"><label for="cto-m">¿Qué necesitas construir?</label>'
    +         '<textarea id="cto-m" name="message" rows="3" '
    +         'placeholder="Cuéntanos sobre el proyecto, objetivo y plazo" required></textarea></div>'
    +       '<label class="cto__ok"><input type="checkbox" name="consent_contact" required>'
    +         '<span>Acepto que NUVIK use estos datos únicamente para responder esta solicitud. '
    +         '<a href="' + pre + 'legal/privacidad.html">Ver privacidad</a>.</span></label>'
    +       '<button class="cto__enviar" type="submit">Enviar solicitud' + FLECHA + '</button>'
    +       '<p class="cto__aviso" hidden></p>'
    +     '</form>'
    +   '</div>'
    + '</section>';
  document.body.appendChild(cto);

  var hoja  = cto.querySelector('.cto__hoja');
  var form  = cto.querySelector('.cto__form');
  var aviso = cto.querySelector('.cto__aviso');
  var devolverFoco = null;

  /* ---------- abrir y cerrar ---------- */
  function abrir(origen) {
    devolverFoco = origen || null;
    cto.classList.add('abierto');
    /* La marca en la raiz es la senal para los manejadores de rueda de
       la pagina: mientras el panel este abierto tienen que apartarse,
       si no le roban el scroll a su contenido. En el landing eso es
       critico porque el suavizador hace preventDefault en toda rueda. */
    document.documentElement.classList.add('cto-abierto');
    document.documentElement.style.overflow = 'hidden';
    /* Reflejo forzado en vez de esperar cuadros: leer offsetHeight
       obliga al navegador a calcular el layout ahi mismo, asi registra
       el translateX(100%) de partida y la clase siguiente si anima.
       Con doble requestAnimationFrame esto dependia de que el rAF
       corriera: en una pestana estrangulada la hoja se quedaba fuera
       de pantalla, abierta pero invisible. */
    void hoja.offsetHeight;
    cto.classList.add('dentro');
    var primero = cto.querySelector('#cto-n');
    if (primero) primero.focus({ preventScroll: true });
  }

  function cerrar() {
    cto.classList.remove('dentro');
    document.documentElement.classList.remove('cto-abierto');
    document.documentElement.style.overflow = '';
    setTimeout(function () { cto.classList.remove('abierto'); }, 560);
    if (devolverFoco && devolverFoco.focus) devolverFoco.focus();
  }

  cto.querySelector('.cto__fondo').addEventListener('click', cerrar);
  cto.querySelector('.cto__x').addEventListener('click', cerrar);
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && cto.classList.contains('abierto')) cerrar();
  });

  /* cualquier elemento con data-contacto lo abre */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-contacto]');
    if (!b) return;
    e.preventDefault();
    abrir(b);
  });

  /* ---------- envio ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);

    /* si la trampa trae algo, lo llenó un robot: se descarta en silencio */
    if ((d.get('website_hp') || '').trim()) { cerrar(); return; }

    var falta = [];
    if (!(d.get('name') || '').trim())    falta.push('tu nombre');
    if (!(d.get('email') || '').trim())   falta.push('tu email');
    if (!(d.get('message') || '').trim()) falta.push('qué necesitas construir');
    if (!d.get('consent_contact'))        falta.push('aceptar el uso de tus datos');
    if (falta.length) {
      aviso.hidden = false;
      aviso.textContent = 'Falta ' + falta.join(', ') + '.';
      return;
    }

    /* Netlify recibe el formulario en la raiz, urlencoded y con el
       nombre del formulario incluido. Si falla -- probando en local, o
       si el sitio no esta en Netlify -- se cae al correo, para que la
       solicitud nunca quede en la nada. */
    var campos = new URLSearchParams();
    campos.append('form-name', 'contacto');
    d.forEach(function (v, k) { campos.append(k, v); });

    var boton = form.querySelector('.cto__enviar');
    boton.disabled = true;
    aviso.hidden = false;
    aviso.textContent = 'Enviando\u2026';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: campos.toString()
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.reset();
      aviso.textContent = 'Listo. Te respondemos a la brevedad.';
      setTimeout(cerrar, 1800);
      boton.disabled = false;
    }).catch(function () {
      boton.disabled = false;
      porCorreo(d);
    });
  });

  /* Respaldo: arma el correo con lo que se escribio. */
  function porCorreo(d) {
    var cuerpo = [
      'Nombre: '  + d.get('name'),
      'Email: '   + d.get('email'),
      'Empresa: ' + (d.get('company') || '\u2014'),
      '',
      d.get('message')
    ].join('\n');
    aviso.textContent = 'Abriendo tu cliente de correo con la solicitud\u2026';
    location.href = 'mailto:' + CORREO
      + '?subject=' + encodeURIComponent('Cotizaci\u00f3n \u2014 ' + d.get('name'))
      + '&body='    + encodeURIComponent(cuerpo);
  }
})();
