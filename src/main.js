import { mostrarMensaje } from "./mensaje.js";

document.addEventListener("DOMContentLoaded", function() {
    const miBoton = document.getElementById("miBoton");
    const nombreInput = document.getElementById("nombreInput");

    miBoton.addEventListener("click", function() {
        const nombre = nombreInput.value;
        if (nombre.trim() !== "") {
            mostrarMensaje(`Hola, ${nombre}!`);
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const nombre = nombreInput.value;
            if (nombre.trim() !== "") {
                mostrarMensaje(`Hola, ${nombre}!`);
            }
        }
    });
});
