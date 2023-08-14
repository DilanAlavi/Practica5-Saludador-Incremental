import { mostrarMensaje } from "./mensaje.js";

document.addEventListener("DOMContentLoaded", function() {
    const miBoton = document.getElementById("miBoton");

    miBoton.addEventListener("click", function() {
        mostrarMensaje("Hola");
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            mostrarMensaje("Hola");
        }
    });
});
