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

/* =========================
   LIGHTBOX DE LA GALERÍA
========================= */

const fotosGaleria = [
    { src: "images/concierto-galeria-1.jpg", titulo: "Esa voz en vivo" },
    { src: "images/concierto-galeria-2.jpg", titulo: "De cerca, en la pantalla" },
    { src: "images/concierto-galeria-3.jpg", titulo: "Un estallido de luz" },
    { src: "images/concierto-galeria-4.jpg", titulo: "Un instante en blanco y negro" },
    { src: "images/concierto-galeria-5.jpg", titulo: "El escenario completo" },
    { src: "images/concierto-galeria-6.jpg", titulo: "El cierre con fuegos artificiales" },
];

let indiceLightbox = 0;

function abrirLightbox(indice) {
    indiceLightbox = indice;
    mostrarFotoLightbox();
    document.getElementById("lightbox").classList.add("activo");
}

function cerrarLightbox() {
    document.getElementById("lightbox").classList.remove("activo");
}

function moverLightbox(direccion) {
    indiceLightbox = (indiceLightbox + direccion + fotosGaleria.length) % fotosGaleria.length;
    mostrarFotoLightbox();
}

function mostrarFotoLightbox() {
    const foto = fotosGaleria[indiceLightbox];
    document.getElementById("lightbox-img").src = foto.src;
    document.getElementById("lightbox-img").alt = foto.titulo;
    document.getElementById("lightbox-titulo").textContent = foto.titulo;
}

// Cerrar con la tecla Escape, moverse con las flechas del teclado
document.addEventListener("keydown", function (evento) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox.classList.contains("activo")) return;

    if (evento.key === "Escape") cerrarLightbox();
    if (evento.key === "ArrowRight") moverLightbox(1);
    if (evento.key === "ArrowLeft") moverLightbox(-1);
});

// Cerrar si se hace clic fuera de la imagen
document.getElementById("lightbox").addEventListener("click", function (evento) {
    if (evento.target.id === "lightbox") cerrarLightbox();
});
