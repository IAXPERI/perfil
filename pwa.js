const FOTOS_CARRUSEL = [
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPj_L1mVYVkKip49tSHwVi4DBIsQZjWgfcrEpr_aHnA&s=10', titulo: 'Mi Mundo' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKU6Y7RZfy6efY1t1mFFVnC5BmR6msFbdnlD_V6ieTsQ&s=10', titulo: 'Pasatiempos' },
  { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl84LKEyfvn9ktFBhe55hoHl2sNnfKYijzzbIIyJF0sQ&s=10', titulo: 'Banda Favorita' }
];

const FALLBACK_PERSONAL = [
  { id: 'JUE-01', titulo: 'Tekken 8', categoria: 'juego', detalle: 'Juego Favorito • Lucha / Pelea', portada: 'icons/icon-192.png' },
  { id: 'JUE-02', titulo: 'Sifu', categoria: 'juego', detalle: 'Juego Favorito • Artes Marciales', portada: 'icons/icon-192.png' },
  { id: 'JUE-03', titulo: 'Apex Legends', categoria: 'juego', detalle: 'Juego Favorito • Battle Royale', portada: 'icons/icon-192.png' },
  { id: 'JUE-04', titulo: 'Overwatch 2', categoria: 'juego', detalle: 'Juego Favorito • Hero Shooter', portada: 'icons/icon-192.png' },
  { id: 'JUE-05', titulo: 'Battlefield 1', categoria: 'juego', detalle: 'Juego Favorito • Shooter Bélico', portada: 'icons/icon-192.png' },
  { id: 'JUE-06', titulo: 'ARK: Survival Evolved', categoria: 'juego', detalle: 'Juego Favorito • Supervivencia', portada: 'icons/icon-192.png' },
  { id: 'JUE-07', titulo: "Assassin's Creed Valhalla", categoria: 'juego', detalle: 'Juego Favorito • Mundo Abierto', portada: 'icons/icon-192.png' },
  { id: 'JUE-08', titulo: "Assassin's Creed Origins", categoria: 'juego', detalle: 'Juego Favorito • Antiguo Egipto', portada: 'icons/icon-192.png' },
  { id: 'JUE-09', titulo: 'Grand Theft Auto V (GTA V)', categoria: 'juego', detalle: 'Juego Favorito • Mundo Abierto', portada: 'icons/icon-192.png' },
  { id: 'MUS-01', titulo: 'Reptilia — The Strokes', categoria: 'musica', detalle: 'Música • Indie Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-02', titulo: 'Machu Picchu — The Strokes', categoria: 'musica', detalle: 'Música • Indie Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-03', titulo: 'Someday — The Strokes', categoria: 'musica', detalle: 'Música • Indie Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-04', titulo: 'Take Me Out — Franz Ferdinand', categoria: 'musica', detalle: 'Música • Indie Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-05', titulo: 'Looking Out for You — Joy Again', categoria: 'musica', detalle: 'Música • Indie Pop', portada: 'icons/icon-192.png' },
  { id: 'MUS-06', titulo: 'Loser — Tame Impala', categoria: 'musica', detalle: 'Música • Psicodélico', portada: 'icons/icon-192.png' },
  { id: 'MUS-07', titulo: "I Don't Love You — My Chemical Romance", categoria: 'musica', detalle: 'Música • Rock Alternativo', portada: 'icons/icon-192.png' },
  { id: 'MUS-08', titulo: 'Famous Last Words — My Chemical Romance', categoria: 'musica', detalle: 'Música • Rock Alternativo', portada: 'icons/icon-192.png' },
  { id: 'MUS-09', titulo: 'Sleep — My Chemical Romance', categoria: 'musica', detalle: 'Música • Rock Alternativo', portada: 'icons/icon-192.png' },
  { id: 'MUS-10', titulo: 'Jesus of Suburbia — Green Day', categoria: 'musica', detalle: 'Música • Punk Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-11', titulo: 'The Rock Show — blink-182', categoria: 'musica', detalle: 'Música • Pop Punk', portada: 'icons/icon-192.png' },
  { id: 'MUS-12', titulo: 'Nightmare — Avenged Sevenfold', categoria: 'musica', detalle: 'Música • Heavy Metal', portada: 'icons/icon-192.png' },
  { id: 'MUS-13', titulo: 'Bat Country — Avenged Sevenfold', categoria: 'musica', detalle: 'Música • Heavy Metal', portada: 'icons/icon-192.png' },
  { id: 'MUS-14', titulo: 'Dawn of Victory — Rhapsody', categoria: 'musica', detalle: 'Música • Power Metal', portada: 'icons/icon-192.png' },
  { id: 'MUS-15', titulo: 'La Leyenda del Hada y el Mago — Rata Blanca', categoria: 'musica', detalle: 'Música • Rock en Español', portada: 'icons/icon-192.png' },
  { id: 'MUS-16', titulo: 'Joseph — Falling In Reverse', categoria: 'musica', detalle: 'Música • Post-Hardcore', portada: 'icons/icon-192.png' },
  { id: 'MUS-17', titulo: 'Knights of Cydonia — Muse', categoria: 'musica', detalle: 'Música • Rock Progresivo', portada: 'icons/icon-192.png' },
  { id: 'MUS-18', titulo: 'Reapers — Muse', categoria: 'musica', detalle: 'Música • Rock Progresivo', portada: 'icons/icon-192.png' },
  { id: 'MUS-19', titulo: 'Aizo — King Gnu', categoria: 'musica', detalle: 'Música • J-Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-20', titulo: 'Fun, Fun, Fun — Pharrell Williams', categoria: 'musica', detalle: 'Música • Pop / Funk', portada: 'icons/icon-192.png' },
  { id: 'MUS-21', titulo: 'Zero — Imagine Dragons', categoria: 'musica', detalle: 'Música • Pop Rock', portada: 'icons/icon-192.png' },
  { id: 'MUS-22', titulo: 'Doma — Jósean Log', categoria: 'musica', detalle: 'Música • Indie Folk', portada: 'icons/icon-192.png' }
];

const PWA_STATE = {
  fotoIdx: 0,
  catalogo: [],
  categoria: 'todos',
  busqueda: '',
  pagina: 1,
  porPagina: 4,
  horas: 1,
  timer: null,
  segundos: 30
};

const PWA_CASCADA = {
  gaming: [
    { id: 'lucha', label: 'Tekken 8 & Sifu', rec: 'Combos, reflejos y acción cuerpo a cuerpo' },
    { id: 'shooter', label: 'Apex Legends, Overwatch 2 & BF1', rec: 'Shooters competitivos y trabajo en equipo' }
  ],
  musica: [
    { id: 'indie', label: 'The Strokes & Franz Ferdinand', rec: 'Reptilia, Machu Picchu, Someday y Take Me Out' },
    { id: 'rock', label: 'MCR, Green Day, Muse & Rata Blanca', rec: 'Jesus of Suburbia, Knights of Cydonia, Nightmare' }
  ]
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

function actualizarRed() {
  const $net = $('#estadoRed');
  if (navigator.onLine) {
    $net.text('🟢 En Línea').removeClass('offline');
  } else {
    $net.text('🟠 Offline').addClass('offline');
  }
}

function logPwa(tipo, msg) {
  const hora = new Date().toLocaleTimeString();
  $('#pwaLogOutput').prepend($('<div>').text(`[${hora}] ${tipo}: ${msg}`));
}

function toastPwa(msg, color) {
  $('#pwaToast')
    .css('border-left-color', color || '#f97316')
    .text(msg)
    .stop(true, true)
    .slideDown(200)
    .delay(2500)
    .fadeOut(300);
}

function cambiarPane(target) {
  $('.pwa-pane').removeClass('active');
  $(`#${target}`).addClass('active');
  $('.nav-tab').removeClass('active');
  $(`.nav-tab[data-target="${target}"]`).addClass('active');
}

function cargarPersonalJson() {
  fetch('data/personal.json')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(data => {
      const soloJuegosMusica = data.filter(x => x.categoria === 'juego' || x.categoria === 'musica');
      PWA_STATE.catalogo = soloJuegosMusica.length ? soloJuegosMusica : FALLBACK_PERSONAL;
      renderCatalogo();
      logPwa('FETCH_JSON', `${PWA_STATE.catalogo.length} juegos y canciones cargados`);
    })
    .catch(() => {
      PWA_STATE.catalogo = FALLBACK_PERSONAL;
      renderCatalogo();
    });
}

function renderCatalogo() {
  const $grid = $('#pwaCatalogGrid').empty();
  const q = PWA_STATE.busqueda.toLowerCase();
  const cat = PWA_STATE.categoria;

  const filtrados = PWA_STATE.catalogo.filter(i => {
    const okCat = cat === 'todos' || i.categoria === cat;
    const okTxt = !q || `${i.titulo} ${i.categoria} ${i.detalle}`.toLowerCase().includes(q);
    return okCat && okTxt;
  });

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PWA_STATE.porPagina));
  if (PWA_STATE.pagina > totalPaginas) PWA_STATE.pagina = totalPaginas;
  const inicio = (PWA_STATE.pagina - 1) * PWA_STATE.porPagina;
  const items = filtrados.slice(inicio, inicio + PWA_STATE.porPagina);

  $('#infoPag').text(`${PWA_STATE.pagina} / ${totalPaginas}`);
  $('#btnPrevPag').prop('disabled', PWA_STATE.pagina <= 1);
  $('#btnNextPag').prop('disabled', PWA_STATE.pagina >= totalPaginas);

  items.forEach(item => {
    const $card = $('<div>').addClass('item-card-pwa').data('nombre', item.titulo);
    const $top = $('<div>').addClass('item-top').append(
      $('<img>').attr({ src: item.portada || 'icons/icon-192.png', alt: item.titulo, width: 38, height: 38, loading: 'lazy' }),
      $('<div>').addClass('item-info').append(
        $('<h5>').text(item.titulo),
        $('<small>').text(item.detalle)
      )
    );
    const $btn = $('<button>').attr('type', 'button').addClass('btn-blue-pwa btn-fav-item').text('❤️ Favorito');
    $card.append($top, $btn);
    $grid.append($card);
  });
}

$(document).ready(function () {
  actualizarRed();
  $(window).off('online offline').on('online offline', actualizarRed);
  cargarPersonalJson();

  $('.nav-tab').off('click').on('click', function () {
    cambiarPane($(this).data('target'));
  });

  $('#pwaThemeBtn').off('click').on('click', function () {
    $('body').toggleClass('dark-mode');
    $(this).text($('body').hasClass('dark-mode') ? '☀️ Claro' : '🌙 Modo');
  });

  // Mini carrusel de Mi Mundo
  function mostrarFoto(idx) {
    PWA_STATE.fotoIdx = (idx + FOTOS_CARRUSEL.length) % FOTOS_CARRUSEL.length;
    const f = FOTOS_CARRUSEL[PWA_STATE.fotoIdx];
    $('#pwaCarouselImg').attr('src', f.src);
    $('#pwaCarouselTitle').text(f.titulo);
  }
  $('#btnPrevFoto').off('click').on('click', () => mostrarFoto(PWA_STATE.fotoIdx - 1));
  $('#btnNextFoto').off('click').on('click', () => mostrarFoto(PWA_STATE.fotoIdx + 1));

  $('#pwaBuscar').off('keyup').on('keyup', function () {
    PWA_STATE.busqueda = $(this).val().trim();
    PWA_STATE.pagina = 1;
    renderCatalogo();
    logPwa('KEYUP', `Búsqueda: "${PWA_STATE.busqueda}"`);
  });

  $('#pwaFilterBar').off('click', '.pill-btn').on('click', '.pill-btn', function () {
    $('.pill-btn').removeClass('active');
    $(this).addClass('active');
    PWA_STATE.categoria = $(this).data('cat');
    PWA_STATE.pagina = 1;
    renderCatalogo();
    logPwa('FILTRO', PWA_STATE.categoria);
  });

  $('#btnPrevPag').off('click').on('click', () => {
    if (PWA_STATE.pagina > 1) { PWA_STATE.pagina--; renderCatalogo(); }
  });

  $('#btnNextPag').off('click').on('click', () => {
    PWA_STATE.pagina++;
    renderCatalogo();
  });

  $('#pwaCascadaArea').off('change').on('change', function () {
    const area = $(this).val();
    const $sub = $('#pwaCascadaSub').empty().append('<option value="">Especialidad</option>');
    $('#pwaCascadaRes').hide();
    if (area && PWA_CASCADA[area]) {
      PWA_CASCADA[area].forEach(x => $sub.append($('<option>').val(x.id).text(x.label).data('rec', x.rec)));
      $sub.prop('disabled', false);
    } else {
      $sub.prop('disabled', true);
    }
  });

  $('#pwaCascadaSub').off('change').on('change', function () {
    const rec = $(this).find(':selected').data('rec');
    if (rec) {
      $('#pwaCascadaRes').text(`✅ ${rec}`).fadeIn();
      logPwa('CASCADA', rec);
    }
  });

  $('#pwaCatalogGrid').off('click', '.btn-fav-item').on('click', '.btn-fav-item', function () {
    const nom = $(this).closest('.item-card-pwa').data('nombre');
    toastPwa(`❤️ Favorito: ${nom}`);
    logPwa('FAVORITO', nom);
  });

  $('#pwaCatalogGrid').off('dblclick', '.item-card-pwa').on('dblclick', '.item-card-pwa', function () {
    const nom = $(this).data('nombre');
    toastPwa(`❤️ Doble clic: ${nom}`);
    logPwa('DBLCLICK', nom);
  });

  $('#pwaSumarHr').off('click').on('click', () => {
    PWA_STATE.horas++;
    $('#pwaHorasDisplay').text(PWA_STATE.horas);
    $('#pwaTotalBob').text(PWA_STATE.horas * 50);
  });

  $('#pwaRestarHr').off('click').on('click', () => {
    if (PWA_STATE.horas > 1) {
      PWA_STATE.horas--;
      $('#pwaHorasDisplay').text(PWA_STATE.horas);
      $('#pwaTotalBob').text(PWA_STATE.horas * 50);
    }
  });

  $('#pwaEnviarContratacion').off('click').on('click', () => {
    const nom = $('#pwaNombreCont').val().trim();
    const cel = $('#pwaCelCont').val().trim();
    const puesto = $('#pwaCarreraCont').val().trim();

    if (nom.length < 3) return toastPwa('⚠️ Ingresa tu nombre o empresa', '#ef4444');
    if (puesto.length < 3) return toastPwa('⚠️ Indica el puesto o servicio', '#ef4444');
    if (!/^\d{8,15}$/.test(cel)) return toastPwa('⚠️ Celular inválido (mín. 8 dígitos)', '#ef4444');

    $('#pwaAlertaContratacion')
      .text(`✅ Solicitud enviada: ${nom} (${$('#pwaTotalBob').text()} BOB)`)
      .fadeIn();
    logPwa('CONTRATACION', `${nom} — ${puesto}`);
    toastPwa('🎉 ¡Solicitud enviada con éxito!');
  });

  $('#pwaAbrirModal30s').off('click').on('click', () => {
    $('#pwaModalTotal').text(`${$('#pwaTotalBob').text()} BOB`);
    clearInterval(PWA_STATE.timer);
    PWA_STATE.segundos = 30;
    $('#pwaTimerVisual').text('00:30s');
    PWA_STATE.timer = setInterval(() => {
      PWA_STATE.segundos--;
      $('#pwaTimerVisual').text(`00:${PWA_STATE.segundos < 10 ? '0' + PWA_STATE.segundos : PWA_STATE.segundos}s`);
      if (PWA_STATE.segundos <= 0) {
        clearInterval(PWA_STATE.timer);
        $('#pwaModal30s').fadeOut(150);
        toastPwa('⚠️ Tarifa Flash Expirada', '#ef4444');
      }
    }, 1000);
    $('#pwaModal30s').fadeIn(150).css('display', 'flex');
  });

  $('#pwaCancelar30s').off('click').on('click', () => {
    clearInterval(PWA_STATE.timer);
    $('#pwaModal30s').fadeOut(150);
  });

  $('#pwaConfirmar30s').off('click').on('click', () => {
    clearInterval(PWA_STATE.timer);
    $('#pwaModal30s').fadeOut(150);
    toastPwa(`✅ Tarifa confirmada: ${$('#pwaModalTotal').text()}`);
    logPwa('COTIZACION', $('#pwaModalTotal').text());
  });

  $('#pwaFormSeguro').off('submit').on('submit', function (e) {
    e.preventDefault();
    const txt = $('#pwaInputSeguro').val().trim();
    if (!txt) return;
    const $fila = $('<div>').addClass('fila-pwa').append(
      $('<span>').addClass('titulo-truncado').text(txt),
      $('<button>').attr('type', 'button').addClass('btn-quitar-pwa').text('✕')
    );
    $('#pwaListaSegura').prepend($fila);
    this.reset();
    logPwa('ANTI_XSS', txt);
  });

  $('#pwaBtnTestXss').off('click').on('click', () => {
    $('#pwaInputSeguro').val("<script>alert('XSS')</script>");
    $('#pwaFormSeguro').submit();
  });

  $('#pwaListaSegura').off('click', '.btn-quitar-pwa').on('click', '.btn-quitar-pwa', function () {
    $(this).closest('.fila-pwa').fadeOut(150, function () { $(this).remove(); });
  });
});
