const HUD_STATE = {
  catalogo: [],
  categoria: 'todos',
  busqueda: '',
  pagina: 1,
  porPagina: 4,
  servicio: { nombre: 'BancoBNB — Proyecto Web', precio: 180 },
  horas: 1,
  timer: null,
  segundos: 30
};

const HUD_CASCADA = {
  web: [
    { id: 'bnb', label: 'BancoBNB & InscripcionesUniversidad', rec: 'Arquitectura Web + PWA Offline-First' },
    { id: 'med', label: 'GestionMedica & BusquedaTrabajo', rec: 'Formularios validados + Blindaje Anti-XSS' }
  ],
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

function actualizarRedHud() {
  const $net = $('#estadoRed');
  if (navigator.onLine) {
    $net.text('🟢 En Línea').removeClass('offline');
  } else {
    $net.text('🟠 Offline').addClass('offline');
  }
}

function logHud(tipo, msg) {
  const hora = new Date().toLocaleTimeString();
  $('#pwaLogOutput').prepend($('<div>').text(`[${hora}] ${tipo}: ${msg}`));
}

function toastHud(msg) {
  $('#pwaToast').text(msg).stop(true, true).slideDown(200).delay(2500).fadeOut(300);
}

function cambiarPaneHud(target) {
  $('.hud-pane').removeClass('active');
  $(`#${target}`).addClass('active');
  $('.hud-tab').removeClass('active');
  $(`.hud-tab[data-target="${target}"]`).addClass('active');
}

function cargarPersonalJson() {
  fetch('data/personal.json')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(data => {
      HUD_STATE.catalogo = data;
      renderCatalogoHud();
      logHud('FETCH_JSON', `${data.length} ítems cargados`);
    })
    .catch(() => {
      HUD_STATE.catalogo = [
        { id: 'PRJ-01', titulo: 'BancoBNB', categoria: 'proyecto', detalle: 'Proyecto Web • Sistema Bancario', precio: 180, portada: 'icons/icon-192.png' },
        { id: 'JUE-01', titulo: 'Tekken 8', categoria: 'juego', detalle: 'Juego Favorito • Lucha / Pelea', precio: 50, portada: 'icons/icon-192.png' },
        { id: 'MUS-01', titulo: 'Reptilia — The Strokes', categoria: 'musica', detalle: 'Música Favorita • Indie Rock', precio: 25, portada: 'icons/icon-192.png' }
      ];
      renderCatalogoHud();
    });
}

function renderCatalogoHud() {
  const $grid = $('#pwaCatalogGrid').empty();
  const q = HUD_STATE.busqueda.toLowerCase();
  const cat = HUD_STATE.categoria;
  const filtrados = HUD_STATE.catalogo.filter(i => {
    const okCat = cat === 'todos' || i.categoria === cat;
    const okTxt = !q || `${i.titulo} ${i.categoria} ${i.detalle}`.toLowerCase().includes(q);
    return okCat && okTxt;
  });

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / HUD_STATE.porPagina));
  if (HUD_STATE.pagina > totalPaginas) HUD_STATE.pagina = totalPaginas;
  const inicio = (HUD_STATE.pagina - 1) * HUD_STATE.porPagina;
  const items = filtrados.slice(inicio, inicio + HUD_STATE.porPagina);

  $('#infoPag').text(`${HUD_STATE.pagina} / ${totalPaginas}`);
  $('#btnPrevPag').prop('disabled', HUD_STATE.pagina <= 1);
  $('#btnNextPag').prop('disabled', HUD_STATE.pagina >= totalPaginas);

  items.forEach(item => {
    const $card = $('<div>').addClass('hud-item-card').data({ nombre: item.titulo, precio: item.precio });
    const $top = $('<div>').addClass('hud-item-top').append(
      $('<img>').attr({ src: item.portada, alt: item.titulo, width: 40, height: 40, loading: 'lazy' }),
      $('<div>').addClass('hud-item-info').append(
        $('<h5>').text(item.titulo),
        $('<small>').text(item.detalle)
      )
    );
    const $btn = $('<button>').attr('type', 'button').addClass('btn-hud-primary btn-cotizar-hud')
      .text(`⚡ ${item.precio} BOB`);
    $card.append($top, $btn);
    $grid.append($card);
  });
}

$(document).ready(function () {
  actualizarRedHud();
  $(window).off('online offline').on('online offline', actualizarRedHud);
  cargarPersonalJson();

  $('.hud-tab, .side-shortcut').off('click').on('click', function () {
    const target = $(this).data('target') || $(this).data('go');
    if (target) cambiarPaneHud(target);
  });

  $('#btnIrCatalogo').off('click').on('click', () => cambiarPaneHud('pane-catalogo'));

  $('#pwaThemeBtn').off('click').on('click', function () {
    $('body').toggleClass('light-mode');
    $(this).text($('body').hasClass('light-mode') ? '☀️' : '🌙');
  });

  $('#btnPWA').off('click').on('click', function () {
    $('#contenedorMenu').attr('data-hidratado', 'true');
    $(this).text('✓ Hidratado');
    toastHud('⚡ Service Worker hidratado');
    logHud('HYDRATION', 'Interfaz PWA hidratada');
  });

  $('#pwaBuscar').off('keyup').on('keyup', function () {
    HUD_STATE.busqueda = $(this).val().trim();
    HUD_STATE.pagina = 1;
    renderCatalogoHud();
    logHud('KEYUP', `Búsqueda: "${HUD_STATE.busqueda}"`);
  });

  $('#pwaFilterBar').off('click', '.hud-filter-btn').on('click', '.hud-filter-btn', function () {
    $('.hud-filter-btn').removeClass('active');
    $(this).addClass('active');
    HUD_STATE.categoria = $(this).data('cat');
    HUD_STATE.pagina = 1;
    renderCatalogoHud();
    logHud('FILTRO', `Categoría: ${HUD_STATE.categoria}`);
  });

  $('#btnPrevPag').off('click').on('click', () => {
    if (HUD_STATE.pagina > 1) { HUD_STATE.pagina--; renderCatalogoHud(); }
  });

  $('#btnNextPag').off('click').on('click', () => {
    HUD_STATE.pagina++;
    renderCatalogoHud();
  });

  $('#pwaCascadaArea').off('change').on('change', function () {
    const area = $(this).val();
    const $sub = $('#pwaCascadaSub').empty().append('<option value="">2. Especialidad</option>');
    $('#pwaCascadaRes').hide();
    if (area && HUD_CASCADA[area]) {
      HUD_CASCADA[area].forEach(x => $sub.append($('<option>').val(x.id).text(x.label).data('rec', x.rec)));
      $sub.prop('disabled', false);
    } else {
      $sub.prop('disabled', true);
    }
  });

  $('#pwaCascadaSub').off('change').on('change', function () {
    const rec = $(this).find(':selected').data('rec');
    if (rec) {
      $('#pwaCascadaRes').text(`✅ ${rec}`).fadeIn();
      logHud('CASCADA', rec);
    }
  });

  $('#pwaCatalogGrid').off('click', '.btn-cotizar-hud').on('click', '.btn-cotizar-hud', function () {
    const $c = $(this).closest('.hud-item-card');
    HUD_STATE.servicio = { nombre: $c.data('nombre'), precio: $c.data('precio') };
    HUD_STATE.horas = 1;
    $('#pwaServicioNombre').text(HUD_STATE.servicio.nombre);
    $('#pwaServicioPrecio').text(HUD_STATE.servicio.precio);
    $('#pwaHorasDisplay').text(1);
    $('#pwaTotalBob').text(HUD_STATE.servicio.precio);
    cambiarPaneHud('pane-cotizar');
  });

  $('#pwaCatalogGrid').off('dblclick', '.hud-item-card').on('dblclick', '.hud-item-card', function () {
    const nom = $(this).data('nombre');
    toastHud(`❤️ Favorito: ${nom}`);
    logHud('DBLCLICK', nom);
  });

  $('#pwaSumarHr').off('click').on('click', () => {
    HUD_STATE.horas++;
    $('#pwaHorasDisplay').text(HUD_STATE.horas);
    $('#pwaTotalBob').text(HUD_STATE.horas * HUD_STATE.servicio.precio);
  });

  $('#pwaRestarHr').off('click').on('click', () => {
    if (HUD_STATE.horas > 1) {
      HUD_STATE.horas--;
      $('#pwaHorasDisplay').text(HUD_STATE.horas);
      $('#pwaTotalBob').text(HUD_STATE.horas * HUD_STATE.servicio.precio);
    }
  });

  $('#pwaAbrirModal30s').off('click').on('click', () => {
    $('#pwaModalServicio').text(HUD_STATE.servicio.nombre);
    $('#pwaModalTotal').text(`${$('#pwaTotalBob').text()} BOB`);
    clearInterval(HUD_STATE.timer);
    HUD_STATE.segundos = 30;
    $('#pwaTimerVisual').text('00:30s');
    HUD_STATE.timer = setInterval(() => {
      HUD_STATE.segundos--;
      $('#pwaTimerVisual').text(`00:${HUD_STATE.segundos < 10 ? '0' + HUD_STATE.segundos : HUD_STATE.segundos}s`);
      if (HUD_STATE.segundos <= 0) {
        clearInterval(HUD_STATE.timer);
        $('#pwaModal30s').fadeOut(150);
        toastHud('⚠️ Tarifa Flash Expirada');
      }
    }, 1000);
    $('#pwaModal30s').fadeIn(150).css('display', 'flex');
  });

  $('#pwaCancelar30s').off('click').on('click', () => {
    clearInterval(HUD_STATE.timer);
    $('#pwaModal30s').fadeOut(150);
  });

  $('#pwaConfirmar30s').off('click').on('click', () => {
    clearInterval(HUD_STATE.timer);
    $('#pwaModal30s').fadeOut(150);
    toastHud(`✅ Confirmado: ${$('#pwaModalTotal').text()}`);
    logHud('COTIZACION', $('#pwaModalTotal').text());
  });

  $('#pwaFormSeguro').off('submit').on('submit', function (e) {
    e.preventDefault();
    const txt = $('#pwaInputSeguro').val().trim();
    if (!txt) return;
    const $fila = $('<div>').addClass('fila-hud').append(
      $('<span>').addClass('titulo-truncado').text(txt),
      $('<button>').attr('type', 'button').addClass('btn-tactil-hud btn-quitar-hud').text('✕')
    );
    $('#pwaListaSegura').prepend($fila);
    this.reset();
    logHud('ANTI_XSS', txt);
  });

  $('#pwaBtnTestXss').off('click').on('click', () => {
    $('#pwaInputSeguro').val("<script>alert('XSS')</script>");
    $('#pwaFormSeguro').submit();
  });

  $('#pwaListaSegura').off('click', '.btn-quitar-hud').on('click', '.btn-quitar-hud', function () {
    $(this).closest('.fila-hud').fadeOut(150, function () { $(this).remove(); });
  });

  $('#pwaLimpiarLog').off('click').on('click', () => {
    $('#pwaLogOutput').empty().append($('<div>').text('[Sistema] Bitácora limpia.'));
  });
});

