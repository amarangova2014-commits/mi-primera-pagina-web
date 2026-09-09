const carrusel = document.getElementById("carrusel");
        const dots = document.querySelectorAll("#carrusel-dots span");

        function anchoTarjeta() {
            const tarjeta = carrusel.querySelector(".tarjeta-artista");
            return tarjeta.offsetWidth + 22; // ancho de tarjeta + gap
        }

        function moverCarrusel(direccion) {
            carrusel.scrollBy({
                left: direccion * anchoTarjeta(),
                behavior: "smooth"
            });
        }

        function irATarjeta(indice) {
            carrusel.scrollTo({
                left: indice * anchoTarjeta(),
                behavior: "smooth"
            });
        }

        carrusel.addEventListener("scroll", () => {
            const indiceActivo = Math.round(carrusel.scrollLeft / anchoTarjeta());
            dots.forEach((dot, i) => {
                dot.classList.toggle("activo", i === indiceActivo);
            });
        });

/* =========================
   VALIDACIÓN DEL FORMULARIO DE CONTACTO
========================= */

const formulario = document.getElementById("formulario-contacto");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); // evita que la página se recargue

        let esValido = true;

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const mensaje = document.getElementById("mensaje");

        const errorNombre = document.getElementById("error-nombre");
        const errorCorreo = document.getElementById("error-correo");
        const errorMensaje = document.getElementById("error-mensaje");
        const confirmacion = document.getElementById("confirmacion");

        // limpiar errores anteriores
        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorMensaje.textContent = "";
        confirmacion.textContent = "";

        // validar nombre
        if (nombre.value.trim() === "") {
            errorNombre.textContent = "Por favor escribe tu nombre.";
            esValido = false;
        }

        // validar correo (formato básico: algo@algo.algo)
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!patronCorreo.test(correo.value.trim())) {
            errorCorreo.textContent = "Escribe un correo electrónico válido.";
            esValido = false;
        }

        // validar mensaje
        if (mensaje.value.trim() === "") {
            errorMensaje.textContent = "Por favor escribe un mensaje.";
            esValido = false;
        }

        if (esValido) {
            confirmacion.textContent = "¡Gracias por tu mensaje, " + nombre.value.trim() + "! 🎵";
            formulario.reset();
        }
    });
}
