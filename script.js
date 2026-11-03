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
        if (!Number.isInteger(anio) || anio < 1950 || anio > 2030) {
            actualizarEstado(msgFecha, [anioInput], false, "⚠️ El Año debe ser un número entre 1950 y 2030.");
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

    actualizarEstado(msgFecha, [diaInput, mesInput, anioInput], true, `✅ Fecha de contratación válida (${dia}/${mes}/${anio}).`);
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
            actualizarEstado(msgCelular, [celularInput], false, "⚠️ Falta ingresar el número de celular (mínimo 8 dígitos).");
        } else {
            limpiarEstado(msgCelular, [celularInput]);
        }
        return false;
    }

    if (!/^\d+$/.test(valor)) {
        actualizarEstado(msgCelular, [celularInput], false, "⚠️ El celular solo debe contener números (sin letras, espacios ni símbolos).");
        return false;
    }

    if (valor.length < 8) {
        actualizarEstado(msgCelular, [celularInput], false, `⚠️ El celular debe tener al menos 8 dígitos (llevas ${valor.length} de mínimo 8).`);
        return false;
    }

    if (valor.length > 15) {
        actualizarEstado(msgCelular, [celularInput], false, "⚠️ El número no debe exceder los 15 dígitos internacionales.");
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

    if (okNombre && okFecha && okCarrera && okSemestre && okCelular) {
        const paisSeleccionado = codigoPais ? codigoPais.options[codigoPais.selectedIndex].text : '';
        alertaBox.innerHTML = `
            <div class="campo-msg msg-exito" style="padding: 12px; font-size: 0.95rem;">
                🎉 <strong>¡Solicitud de Contratación enviada con éxito!</strong><br>
                <strong>Contratante:</strong> ${nombreInput.value.trim()} |
                <strong>Fecha Inicio:</strong> ${diaInput.value}/${mesInput.value}/${anioInput.value} |
                <strong>Carrera/Puesto:</strong> ${carreraInput.value.trim()} (${semestreInput.value}) |
                <strong>Celular:</strong> ${paisSeleccionado} ${celularInput.value.trim()}
            </div>
        `;
    } else {
        alertaBox.innerHTML = `
            <div class="campo-msg msg-error" style="padding: 12px; font-size: 0.95rem;">
                ⚠️ Faltan datos o hay errores en el formulario. Revisa los campos marcados en rojo arriba.
            </div>
        `;
    }
});
