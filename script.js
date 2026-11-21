// ============================================================================
// FUNCIÓN 1: MODO OSCURO / MODO CLARO DINÁMICO (Dark Mode)
// ============================================================================
const themeBtn = document.getElementById('themeBtn');
const bodyElement = document.body;

themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');

    if (bodyElement.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️ Modo Claro';
    } else {
        themeBtn.textContent = '🌙 Cambiar Modo';
    }
});


// ============================================================================
// FUNCIÓN 2: 2 DESPLEGABLES LÓGICOS CON EL DOM (GÉNERO -> TARJETAS -> DETALLE)
// ============================================================================
// DESPLEGABLE 1: Al apretar un género, despliega en el DOM las tarjetas de ese género
function filtrarSeccion(seccion, categoria, botonActivo) {
    const contenedor = document.getElementById('lista-' + seccion);
    const aviso = document.getElementById('aviso-' + seccion);
    if (!contenedor) return;

    // Si el usuario vuelve a apretar el mismo género que ya estaba activo, lo pliega
    if (botonActivo && botonActivo.classList.contains('activo') && !contenedor.classList.contains('contenedor-colapsado')) {
        contenedor.classList.add('contenedor-colapsado');
        botonActivo.classList.remove('activo');
        if (aviso) aviso.style.display = 'block';
        return;
    }

    // Desplegamos el contenedor de tarjetas en el DOM
    contenedor.classList.remove('contenedor-colapsado');
    if (aviso) aviso.style.display = 'none';

    // 1. Seleccionamos las tarjetas (.card) del apartado correspondiente en el DOM
    const tarjetas = contenedor.querySelectorAll('.card');

    // 2. Recorremos cada tarjeta y verificamos su atributo HTML5 data-categoria con dataset
    tarjetas.forEach(card => {
        const categoriasCard = card.dataset.categoria || '';

        // 3. Cambiamos style.display directamente en el DOM según coincida la categoría
        if (categoria === 'todos' || categoriasCard.includes(categoria)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Resaltamos el botón de filtro activo solo dentro de su apartado
    if (botonActivo && botonActivo.parentElement) {
        const botones = botonActivo.parentElement.querySelectorAll('.btn-filtro');
        botones.forEach(btn => btn.classList.remove('activo'));
        botonActivo.classList.add('activo');
    }
}

// DESPLEGABLE 2: Al apretar una canción o videojuego, despliega su historia o logros con el DOM
function toggleHistoria(cardElement) {
    const panelHistoria = cardElement.querySelector('.historia-desplegable');
    const icono = cardElement.querySelector('.icono-desplegar');

    if (!panelHistoria) return;

    // Alternamos la clase 'abierto' en el DOM
    panelHistoria.classList.toggle('abierto');
    cardElement.classList.toggle('activa');

    if (icono) {
        const esJuego = cardElement.closest('#lista-juegos') !== null;
        if (panelHistoria.classList.contains('abierto')) {
            icono.textContent = esJuego ? '▲ Ocultar logros' : '▲ Ocultar historia';
        } else {
            icono.textContent = esJuego ? '▼ Ver mis logros' : '▼ Ver historia';
        }
    }
}


// ============================================================================
// FUNCIÓN 3: MENÚ DESPLEGABLE HAMBURGUESA (Responsive Navbar)
// ============================================================================
const burguerBtn = document.getElementById('burguerBtn');
const navMenu = document.getElementById('navMenu');

burguerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


// ============================================================================
// FUNCIÓN 4: VALIDACIÓN DEL FORMULARIO DE CONTRATACIÓN
// - Las validaciones de formato (letras, números, rangos, longitud) actúan en
//   tiempo real mientras el usuario escribe en cada campo.
// - La validación de "Falta ingresar datos" (campos vacíos) SOLO aparece
//   cuando el usuario presiona el botón de Enviar Solicitud de Contratación.
// ============================================================================
const form = document.getElementById('contactForm');

const nombreInput = document.getElementById('nombre');
const msgNombre = document.getElementById('msgNombre');

const diaInput = document.getElementById('dia');
const mesInput = document.getElementById('mes');
const anioInput = document.getElementById('anio');
const msgFecha = document.getElementById('msgFecha');

const carreraInput = document.getElementById('carrera');
const msgCarrera = document.getElementById('msgCarrera');

const semestreInput = document.getElementById('semestre');
const msgSemestre = document.getElementById('msgSemestre');

const codigoPais = document.getElementById('codigoPais');
const celularInput = document.getElementById('celular');
const msgCelular = document.getElementById('msgCelular');

const alertaBox = document.getElementById('alertaBox');

// Bandera que indica si el usuario ya presionó el botón de Enviar
let intentoEnviar = false;

// Limpia el estado visual cuando el campo está vacío y aún no se ha presionado Enviar
function limpiarEstado(elementoMsg, inputsArray) {
    elementoMsg.textContent = '';
    elementoMsg.className = 'campo-msg oculto';
    inputsArray.forEach(inp => {
        inp.classList.remove('input-error', 'input-ok');
    });
}

// Muestra el aviso (error en rojo o éxito en verde) en el sector correspondiente
function actualizarEstado(elementoMsg, inputsArray, esValido, texto) {
    elementoMsg.textContent = texto;
    if (esValido) {
        elementoMsg.className = 'campo-msg msg-exito';
        inputsArray.forEach(inp => {
            inp.classList.remove('input-error');
            inp.classList.add('input-ok');
        });
    } else {
        elementoMsg.className = 'campo-msg msg-error';
        inputsArray.forEach(inp => {
            inp.classList.remove('input-ok');
            inp.classList.add('input-error');
        });
    }
}

// 1. Validar Nombre Completo / Empresa Contratante (solo letras, espacios y puntos)
function validarNombre(mostrarVacio = intentoEnviar) {
    const valor = nombreInput.value.trim();

    if (valor === "") {
        if (mostrarVacio) {
            actualizarEstado(msgNombre, [nombreInput], false, "⚠️ Falta ingresar el nombre completo o empresa contratante.");
        } else {
            limpiarEstado(msgNombre, [nombreInput]);
        }
        return false;
    }

    // Validar que solo contenga letras (incluyendo tildes/ñ), espacios, puntos o barras
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s./-]+$/;
    if (!soloLetras.test(valor)) {
        actualizarEstado(msgNombre, [nombreInput], false, "⚠️ El nombre solo debe contener letras y espacios (no números).");
        return false;
    }

    if (valor.length < 3) {
        actualizarEstado(msgNombre, [nombreInput], false, "⚠️ El nombre es muy corto (mínimo 3 letras).");
        return false;
    }

    actualizarEstado(msgNombre, [nombreInput], true, "✅ Nombre del contratante válido.");
    return true;
}

// 2. Validar Fecha de Contratación (Día, Mes y Año reales)
function validarFecha(mostrarVacio = intentoEnviar) {
    const dTexto = diaInput.value.trim();
    const mTexto = mesInput.value.trim();
    const aTexto = anioInput.value.trim();

    // Si los 3 están vacíos y aún no apretó Enviar, se mantiene limpio
    if (dTexto === "" && mTexto === "" && aTexto === "") {
        if (mostrarVacio) {
            actualizarEstado(msgFecha, [diaInput, mesInput, anioInput], false, "⚠️ Falta completar la fecha: Día, Mes y Año.");
        } else {
            limpiarEstado(msgFecha, [diaInput, mesInput, anioInput]);
        }
        return false;
    }

    // Validamos en tiempo real cada subcampo que ya haya sido escrito
    if (dTexto !== "") {
        const dia = Number(dTexto);
        if (!Number.isInteger(dia) || dia < 1 || dia > 31) {
            actualizarEstado(msgFecha, [diaInput], false, "⚠️ El Día debe ser un número entero entre 1 y 31.");
            return false;
        } else {
            diaInput.classList.remove('input-error');
            diaInput.classList.add('input-ok');
        }
    }

    if (mTexto !== "") {
        const mes = Number(mTexto);
        if (!Number.isInteger(mes) || mes < 1 || mes > 12) {
            actualizarEstado(msgFecha, [mesInput], false, "⚠️ El Mes debe ser un número entero entre 1 y 12.");
            return false;
        } else {
            mesInput.classList.remove('input-error');
            mesInput.classList.add('input-ok');
        }
    }

    if (aTexto !== "") {
        const anio = Number(aTexto);
        const anioActual = new Date().getFullYear();
        if (!Number.isInteger(anio) || anio < anioActual || anio > anioActual + 1) {
            actualizarEstado(msgFecha, [anioInput], false, `⚠️ El Año debe ser ${anioActual} o ${anioActual + 1} (no años pasados como 1950).`);
            return false;
        } else {
            anioInput.classList.remove('input-error');
            anioInput.classList.add('input-ok');
        }
    }

    // Si todavía falta alguno de los 3 campos de fecha
    if (dTexto === "" || mTexto === "" || aTexto === "") {
        if (mostrarVacio) {
            let faltantes = [];
            if (dTexto === "") { faltantes.push("Día"); diaInput.classList.add('input-error'); }
            if (mTexto === "") { faltantes.push("Mes"); mesInput.classList.add('input-error'); }
            if (aTexto === "") { faltantes.push("Año"); anioInput.classList.add('input-error'); }
            msgFecha.textContent = "⚠️ Falta completar en la fecha: " + faltantes.join(", ") + ".";
            msgFecha.className = 'campo-msg msg-error';
        } else {
            msgFecha.textContent = '';
            msgFecha.className = 'campo-msg oculto';
        }
        return false;
    }

    // Validación de días máximos según el mes (ej. febrero 28/29, meses de 30 días)
    const dia = parseInt(dTexto, 10);
    const mes = parseInt(mTexto, 10);
    const anio = parseInt(aTexto, 10);
    const diasPorMes = [31, (anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (dia > diasPorMes[mes - 1]) {
        actualizarEstado(msgFecha, [diaInput, mesInput, anioInput], false, `⚠️ Fecha inválida: el mes ${mes} solo tiene hasta ${diasPorMes[mes - 1]} días.`);
        return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const maxFecha = new Date(hoy);
    maxFecha.setMonth(maxFecha.getMonth() + 1);
    const fechaIngresada = new Date(anio, mes - 1, dia);

    if (fechaIngresada < hoy || fechaIngresada > maxFecha) {
        actualizarEstado(msgFecha, [diaInput, mesInput, anioInput], false, `⚠️ La fecha debe estar entre hoy (${hoy.toLocaleDateString()}) y máximo 1 mes (${maxFecha.toLocaleDateString()}).`);
        return false;
    }

    actualizarEstado(msgFecha, [diaInput, mesInput, anioInput], true, `✅ Fecha de inicio válida (${dia}/${mes}/${anio}).`);
    return true;
}

// 3. Validar Carrera / Puesto Requerido (solo letras, espacios y guiones)
function validarCarrera(mostrarVacio = intentoEnviar) {
    const valor = carreraInput.value.trim();

    if (valor === "") {
        if (mostrarVacio) {
            actualizarEstado(msgCarrera, [carreraInput], false, "⚠️ Falta ingresar la carrera o puesto requerido.");
        } else {
            limpiarEstado(msgCarrera, [carreraInput]);
        }
        return false;
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s/-]+$/;
    if (!soloLetras.test(valor)) {
        actualizarEstado(msgCarrera, [carreraInput], false, "⚠️ La carrera o puesto solo debe contener letras (no números).");
        return false;
    }

    if (valor.length < 3) {
        actualizarEstado(msgCarrera, [carreraInput], false, "⚠️ Escribe el nombre completo de la carrera o puesto (mínimo 3 letras).");
        return false;
    }

    actualizarEstado(msgCarrera, [carreraInput], true, "✅ Carrera / puesto ingresado correctamente.");
    return true;
}

// 4. Validar Semestre / Modalidad de Trabajo
function validarSemestre(mostrarVacio = intentoEnviar) {
    const valor = semestreInput.value.trim();

    if (valor === "") {
        if (mostrarVacio) {
            actualizarEstado(msgSemestre, [semestreInput], false, "⚠️ Falta seleccionar el semestre o modalidad de contratación.");
        } else {
            limpiarEstado(msgSemestre, [semestreInput]);
        }
        return false;
    }

    actualizarEstado(msgSemestre, [semestreInput], true, "✅ Modalidad seleccionada: " + valor + ".");
    return true;
}

// 5. Validar País y Número de Celular de Contacto (solo números, mínimo 8 dígitos, hasta 15)
function validarCelular(mostrarVacio = intentoEnviar) {
    const valor = celularInput.value.trim();
    const pais = codigoPais ? codigoPais.value.trim() : '';

    if (pais === "" && valor === "") {
        if (mostrarVacio) {
            actualizarEstado(msgCelular, [codigoPais, celularInput], false, "⚠️ Falta seleccionar el país e ingresar el número de celular.");
        } else {
            limpiarEstado(msgCelular, [codigoPais, celularInput]);
        }
        return false;
    }

    if (pais === "") {
        if (mostrarVacio) {
            actualizarEstado(msgCelular, [codigoPais], false, "⚠️ Falta seleccionar el país de contacto.");
        } else {
            limpiarEstado(msgCelular, [codigoPais]);
        }
        return false;
    }

    if (valor === "") {
        if (mostrarVacio) {
            actualizarEstado(msgCelular, [celularInput], false, "⚠️ Falta ingresar el número de celular (8 dígitos).");
        } else {
            limpiarEstado(msgCelular, [celularInput]);
        }
        return false;
    }

    if (!/^\d+$/.test(valor)) {
        actualizarEstado(msgCelular, [celularInput], false, "⚠️ El celular solo debe contener números (sin letras, espacios ni símbolos).");
        return false;
    }

    if (valor.length !== 8) {
        actualizarEstado(msgCelular, [celularInput], false, `⚠️ El celular debe tener exactamente 8 dígitos (llevas ${valor.length} de 8).`);
        return false;
    }

    const textoPais = codigoPais.options[codigoPais.selectedIndex].text;
    actualizarEstado(msgCelular, [codigoPais, celularInput], true, `✅ Número válido: ${textoPais} ${valor}`);
    return true;
}

// Escuchamos cada campo en tiempo real para validar formato mientras el usuario escribe
nombreInput.addEventListener('input', () => validarNombre(intentoEnviar));
diaInput.addEventListener('input', () => validarFecha(intentoEnviar));
mesInput.addEventListener('input', () => validarFecha(intentoEnviar));
anioInput.addEventListener('input', () => validarFecha(intentoEnviar));
carreraInput.addEventListener('input', () => validarCarrera(intentoEnviar));
semestreInput.addEventListener('change', () => validarSemestre(intentoEnviar));
if (codigoPais) {
    codigoPais.addEventListener('change', () => validarCelular(intentoEnviar));
}
celularInput.addEventListener('input', () => validarCelular(intentoEnviar));

// Al presionar el botón Enviar Solicitud de Contratación:
// recién aquí se activa mostrarVacio = true para todos los campos vacíos
form.addEventListener('submit', (e) => {
    e.preventDefault();
    intentoEnviar = true;

    const okNombre = validarNombre(true);
    const okFecha = validarFecha(true);
    const okCarrera = validarCarrera(true);
    const okSemestre = validarSemestre(true);
    const okCelular = validarCelular(true);

    alertaBox.textContent = '';

    if (okNombre && okFecha && okCarrera && okSemestre && okCelular) {
        const paisSeleccionado = codigoPais ? codigoPais.options[codigoPais.selectedIndex].text : '';
        const box = document.createElement('div');
        box.className = 'campo-msg msg-exito';
        box.style.padding = '12px';
        box.style.fontSize = '0.95rem';

        const titulo = document.createElement('strong');
        titulo.textContent = '🎉 ¡Solicitud de Contratación enviada con éxito!';
        box.appendChild(titulo);
        box.appendChild(document.createElement('br'));
        box.appendChild(document.createTextNode(
            `Contratante: ${nombreInput.value.trim()} | Fecha Inicio: ${diaInput.value}/${mesInput.value}/${anioInput.value} | Carrera/Puesto: ${carreraInput.value.trim()} (${semestreInput.value}) | Celular: ${paisSeleccionado} ${celularInput.value.trim()}`
        ));
        alertaBox.appendChild(box);
        if (typeof logPersonal === 'function') {
            logPersonal('FORM_SUBMIT', `Contratación enviada para ${nombreInput.value.trim()}`);
        }
        fetch(`${SUPABASE_URL}/rest/v1/contrataciones_personal`, {
            method: 'POST',
            headers: SUPABASE_HEADERS,
            body: JSON.stringify({
                contratante: nombreInput.value.trim(),
                fecha_inicio: `${diaInput.value}/${mesInput.value}/${anioInput.value}`,
                puesto: carreraInput.value.trim(),
                modalidad: semestreInput.value,
                celular: `${paisSeleccionado} ${celularInput.value.trim()}`
            })
        })
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(() => {
                logPersonal('SUPABASE_INSERT', `Contratación guardada en public.contrataciones_personal`);
                renderizarDetalleSeguro(`<strong>Guardado en Supabase:</strong> Solicitud de ${nombreInput.value.trim()} registrada en Postgres.`);
                cargarContratacionesSupabase();
            })
            .catch(() => {});
    } else {
        const box = document.createElement('div');
        box.className = 'campo-msg msg-error';
        box.style.padding = '12px';
        box.style.fontSize = '0.95rem';
        box.textContent = '⚠️ Faltan datos o hay errores en el formulario. Revisa los campos marcados en rojo arriba.';
        alertaBox.appendChild(box);
    }
});

// ==============================================================================
// MÓDULO UNIFICADO SEMANAS 1-3 (SUPABASE, PWA, FLEXBOX, A11Y, DOMPURIFY, ANTI-XSS)
// ==============================================================================
const SUPABASE_URL = 'https://urvevemsosutoaexikpw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVydmV2ZW1zb3N1dG9hZXhpa3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyMjY3OTEsImV4cCI6MjExMDgwMjc5MX0.SnA1-iZxacnY3ylKUti5sdtA18336vvGUCCgKVQSVsQ';
const SUPABASE_HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('[SW PERSONAL] Activo:', reg.scope))
            .catch(err => console.warn('[SW PERSONAL] Error:', err));
    });
}

let eventoInstalacion;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    eventoInstalacion = e;
    const btn = document.getElementById('btnInstalarPWA');
    if (btn) btn.hidden = false;
});

function renderizarDetalleSeguro(htmlDesdeServidor) {
    if (typeof DOMPurify !== 'undefined') {
        const limpio = DOMPurify.sanitize(htmlDesdeServidor);
        $('#detalleProyecto').html(limpio);
    } else {
        $('#detalleProyecto').text(htmlDesdeServidor);
    }
}

function cargarContratacionesSupabase() {
    if (typeof window.jQuery === 'undefined') return;
    fetch(`${SUPABASE_URL}/rest/v1/contrataciones_personal?select=*&order=created_at.desc&limit=8`, { headers: SUPABASE_HEADERS })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(lista => {
            const $box = $('#listaContratacionesSupabase').empty();
            $('#countContratacionesSupa').text(lista.length);
            if (!lista.length) {
                $box.append($('<div>').addClass('fila-tactil').append($('<span>').addClass('titulo-truncado').text('Sin solicitudes registradas aún.')));
                return;
            }
            lista.forEach(c => {
                const txt = `💼 ${c.contratante} — ${c.puesto} (${c.modalidad}) | Inicio: ${c.fecha_inicio} | Tel: ${c.celular}`;
                const $fila = $('<div>').addClass('fila-tactil').attr('data-id', c.id).append(
                    $('<span>').addClass('titulo-truncado').text(txt),
                    $('<button>').attr({ type: 'button', title: 'Editar puesto' }).addClass('btn-tactil btn-edit-cont')
                        .css({ background: '#e0f2fe', color: '#0369a1' }).text('✏️'),
                    $('<button>').attr({ type: 'button', title: 'Eliminar solicitud' }).addClass('btn-tactil btn-del-cont')
                        .css({ background: '#fee2e2', color: '#dc2626' }).text('🗑️')
                );
                $box.append($fila);
            });
        })
        .catch(() => {});
}

const PERSONAL_CASCADA = {
    web: [
        { id: 'pwa', label: 'Arquitectura PWA Offline-First', rec: 'Service Worker + Cache Storage + Manifest JSON' },
        { id: 'dom', label: 'Seguridad XSS & DOM', rec: 'Delegación .off().on() y sanitización estricta con .text()' }
    ],
    gaming: [
        { id: 'moba', label: 'MOBA Competitivo (Mobile Legends)', rec: 'Estrategia de líneas, rotación y HUD cero-scroll' },
        { id: 'shooter', label: 'FPS / Táctico', rec: 'Control de latencia y respuesta rápida' }
    ],
    musica: [
        { id: 'rock', label: 'Rock / Alternativo', rec: 'Repertorio con búsqueda keyup en tiempo real' },
        { id: 'pop', label: 'Pop / Electrónica', rec: 'Cola interactiva táctil >= 44px' }
    ]
};

let pTimerId = null;
let pSegundos = 30;

function logPersonal(tipo, msg) {
    const $log = $('#pLogOutput');
    if (!$log.length) return;
    const hora = new Date().toLocaleTimeString();
    $log.prepend($('<div>').text(`[${hora}] ${tipo}: ${msg}`));
}

function mostrarToastPersonal(msg) {
    const $t = $('#toastPersonal');
    $t.text(msg).stop(true, true).slideDown(250).delay(2800).fadeOut(350);
}

if (typeof window.jQuery !== 'undefined') {
    $(document).ready(function () {
        function actualizarRedPersonal() {
            const $net = $('#estadoRedPersonal');
            if (navigator.onLine) {
                $net.text('🟢 En Línea').css({ background: '#dcfce7', color: '#15803d' });
            } else {
                $net.text('🟠 Offline').css({ background: '#ffedd5', color: '#c2410c' });
            }
        }
        $(window).off('online offline').on('online offline', actualizarRedPersonal);
        actualizarRedPersonal();
        cargarContratacionesSupabase();

        $('#btnRefrescarContratacionesSupa').off('click').on('click', function () {
            cargarContratacionesSupabase();
            logPersonal('SUPABASE_REFRESH', 'Solicitudes de contratación actualizadas desde Postgres');
        });

        // CRUD: Editar (PATCH) y Eliminar (DELETE) contrataciones en Supabase
        $('#listaContratacionesSupabase').off('click', '.btn-edit-cont').on('click', '.btn-edit-cont', function () {
            const id = $(this).closest('.fila-tactil').attr('data-id');
            const nuevoPuesto = prompt('Nuevo puesto o servicio requerido:');
            if (!nuevoPuesto || nuevoPuesto.trim().length < 2) return;
            fetch(`${SUPABASE_URL}/rest/v1/contrataciones_personal?id=eq.${id}`, {
                method: 'PATCH',
                headers: SUPABASE_HEADERS,
                body: JSON.stringify({ puesto: nuevoPuesto.trim() })
            })
                .then(r => r.ok ? r.json() : Promise.reject())
                .then(() => {
                    cargarContratacionesSupabase();
                    mostrarToastPersonal('✏️ Solicitud actualizada en Supabase');
                    logPersonal('SUPABASE_UPDATE', `Solicitud #${id} actualizada`);
                })
                .catch(() => mostrarToastPersonal('⚠️ Error al actualizar en Supabase'));
        });

        $('#listaContratacionesSupabase').off('click', '.btn-del-cont').on('click', '.btn-del-cont', function () {
            const id = $(this).closest('.fila-tactil').attr('data-id');
            fetch(`${SUPABASE_URL}/rest/v1/contrataciones_personal?id=eq.${id}`, {
                method: 'DELETE',
                headers: SUPABASE_HEADERS
            })
                .then(r => r.ok ? r : Promise.reject())
                .then(() => {
                    cargarContratacionesSupabase();
                    mostrarToastPersonal('🗑️ Solicitud eliminada de Supabase');
                    logPersonal('SUPABASE_DELETE', `Solicitud #${id} eliminada`);
                })
                .catch(() => mostrarToastPersonal('⚠️ Error al eliminar en Supabase'));
        });

        // Sincronización Inicial desde Supabase (public.catalogo_personal)
        fetch(`${SUPABASE_URL}/rest/v1/catalogo_personal?select=*&order=id.asc`, { headers: SUPABASE_HEADERS })
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(data => {
                logPersonal('SUPABASE_SELECT', `${data.length} ítems sincronizados desde public.catalogo_personal`);
                renderizarDetalleSeguro(`<strong>Supabase Conectado:</strong> ${data.length} ítems activos en <code>public.catalogo_personal</code>.`);
            })
            .catch(() => logPersonal('SUPABASE_OFFLINE', 'Usando datos locales Offline-First'));

        $('#btnInstalarPWA').off('click').on('click', async function () {
            if (!eventoInstalacion) return;
            eventoInstalacion.prompt();
            await eventoInstalacion.userChoice;
            this.hidden = true;
            logPersonal('PWA_INSTALL', 'Instalación PWA solicitada');
        });

        $('#btnSimularContraste').off('click').on('click', function () {
            document.body.classList.toggle('alto-contraste');
            logPersonal('A11Y_CONTRASTE', document.body.classList.contains('alto-contraste') ? 'Alto Contraste ON' : 'Alto Contraste OFF');
        });

        $('#btnSimularVista').off('click').on('click', function () {
            $('.grid-tarjetas, .modulo-semanas-grid').toggleClass('sim-movil');
            logPersonal('LAYOUT_SIM', 'Alternada simulación Vista Móvil / Escritorio');
        });

        $('#btnAuditarA11Y').off('click').on('click', function () {
            const zonas = document.querySelectorAll('header, nav, main, article, footer').length;
            const sinAlt = document.querySelectorAll('img:not([alt]), img[alt=""]').length;
            const rep = document.getElementById('reporteA11Y');
            if (rep) {
                rep.textContent = `Auditoría en vivo: ${zonas} etiquetas semánticas HTML5 detectadas | Imágenes sin alt: ${sinAlt}.`;
            }
            logPersonal('AUDITORIA_A11Y', `${zonas} etiquetas semánticas | sin alt: ${sinAlt}`);
        });

        $(document).off('click', '.dock-btn').on('click', '.dock-btn', function () {
            const destino = $(this).attr('data-scroll');
            const $el = $(destino);
            if ($el.length) {
                $('html, body').animate({ scrollTop: $el.offset().top - 75 }, 350);
            }
        });

        // 1. Cascada 3 Capas
        $('#pCascadaArea').off('change').on('change', function () {
            const area = $(this).val();
            const $sub = $('#pCascadaSub');
            $sub.empty().append('<option value="">-- Selecciona Especialidad --</option>');
            $('#pCascadaRes').addClass('oculto').text('');

            if (area && PERSONAL_CASCADA[area]) {
                PERSONAL_CASCADA[area].forEach(item => {
                    $sub.append($('<option>').val(item.id).text(item.label).data('rec', item.rec));
                });
                $sub.prop('disabled', false);
                logPersonal('CASCADA_1', `Área seleccionada: ${area}`);
            } else {
                $sub.prop('disabled', true);
            }
        });

        $('#pCascadaSub').off('change').on('change', function () {
            const rec = $(this).find(':selected').data('rec');
            if (rec) {
                $('#pCascadaRes').removeClass('oculto').text(`✅ Recomendación: ${rec}`);
                logPersonal('CASCADA_2', rec);
            }
        });

        // 2. Calculador 50 BOB/hr + Modal 30s
        $('#pHoras').off('input').on('input', function () {
            let hrs = parseInt($(this).val(), 10) || 1;
            if (hrs < 1) { hrs = 1; $(this).val(1); }
            $('#pTotalBob').text(hrs * 50);
        });

        $('#pBtnAbrirModal').off('click').on('click', function () {
            $('#pModalMonto').text(`${$('#pTotalBob').text()} BOB`);
            clearInterval(pTimerId);
            pSegundos = 30;
            $('#pTimerVisual').text('00:30s');
            pTimerId = setInterval(() => {
                pSegundos--;
                $('#pTimerVisual').text(`00:${pSegundos < 10 ? '0' + pSegundos : pSegundos}s`);
                if (pSegundos <= 0) {
                    clearInterval(pTimerId);
                    $('#modalPersonal30s').fadeOut(200);
                    mostrarToastPersonal('⚠️ Tarifa Flash Expirada (30s).');
                }
            }, 1000);
            $('#modalPersonal30s').fadeIn(200).css('display', 'flex');
        });

        $('#pBtnCerrarModal').off('click').on('click', function () {
            clearInterval(pTimerId);
            $('#modalPersonal30s').fadeOut(200);
        });

        $('#pBtnConfirmarModal').off('click').on('click', function () {
            clearInterval(pTimerId);
            $('#modalPersonal30s').fadeOut(200);
            const monto = $('#pModalMonto').text();
            mostrarToastPersonal(`✅ Cotización confirmada: ${monto}`);
            logPersonal('COTIZACION', `Confirmada por ${monto}`);
        });

        // 3. Lista Táctil Anti-XSS (.text() + >= 44px + .off().on())
        $('#pBtnAgregarItem').off('click').on('click', function () {
            const txt = $('#pInputItem').val().trim();
            if (!txt) return;
            const $fila = $('<div>').addClass('fila-tactil');
            const $span = $('<span>').addClass('titulo-truncado').text(txt);
            const $btn = $('<button>').attr('type', 'button')
                .addClass('btn-tactil btn-quitar-item')
                .css({ background: '#fee2e2', color: '#dc2626' })
                .text('✕');
            $fila.append($span, $btn);
            $('#pListaTactil').prepend($fila);
            $('#pInputItem').val('');
            logPersonal('LISTA_ANTI_XSS', txt);
        });

        $('#pBtnTestXss').off('click').on('click', function () {
            $('#pInputItem').val("<script>alert('XSS')</script>");
            $('#pBtnAgregarItem').trigger('click');
        });

        $('#pListaTactil').off('click', '.btn-quitar-item').on('click', '.btn-quitar-item', function () {
            $(this).closest('.fila-tactil').fadeOut(200, function () { $(this).remove(); });
        });

        // 4. Doble clic en tarjetas de juegos/música (Semana 1 Día 1: dblclick)
        $(document).off('dblclick', '.tarjeta-item').on('dblclick', '.tarjeta-item', function () {
            const titulo = $(this).find('h3, h4').first().text().trim() || 'Elemento';
            logPersonal('DBLCLICK_FAV', `❤️ Favorito marcado: ${titulo}`);
            mostrarToastPersonal(`❤️ Favorito: ${titulo}`);
        });
    });
}