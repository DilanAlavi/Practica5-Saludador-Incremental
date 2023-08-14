import { mostrarMensaje } from "./mensaje.js";

document.addEventListener("DOMContentLoaded", function () {
    const miBoton = document.getElementById("miBoton");
    const nombreInput = document.getElementById("nombreInput");

    miBoton.addEventListener("click", async function () {
        const nombre = nombreInput.value;
        if (nombre.trim() !== "") {
            const genero = await determinarGenero(nombre);
            mostrarMensaje(nombre, genero);
        }
    });

    document.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            const nombre = nombreInput.value;
            if (nombre.trim() !== "") {
                const genero = await determinarGenero(nombre);
                mostrarMensaje(nombre, genero);
            }
        }
    });

    async function determinarGenero(nombre) {
        try {
            const response = await fetch(`https://api.genderize.io/?name=${nombre}`);
            const data = await response.json();
            
            if (data.gender === "male") {
                return "Señor";
            } else if (data.gender === "female") {
                return "Señora";
            } else {
                return "Persona";
            }
        } catch (error) {
            console.error("Error al determinar el género:", error);
            return "Desconocido";
        }
    }
});
