import { mostrarMensaje } from "./mensaje.js";

document.addEventListener("DOMContentLoaded", function () {
    const miBoton = document.getElementById("miBoton");
    const nombreInput = document.getElementById("nombreInput");
    const edadInput = document.getElementById("edadInput");

    miBoton.addEventListener("click", async function () {
        const nombre = nombreInput.value;
        const edad = parseInt(edadInput.value); // Convertir la edad a un número

        if (nombre.trim() !== "" && !isNaN(edad)) {
            const genero = await determinarGenero(nombre);
            mostrarSaludo(nombre, genero, edad);
        }
    });

    document.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            const nombre = nombreInput.value;
            const edad = parseInt(edadInput.value); // Convertir la edad a un número

            if (nombre.trim() !== "" && !isNaN(edad)) {
                const genero = await determinarGenero(nombre);
                mostrarSaludo(nombre, genero, edad);
            }
        }
    });

    async function determinarGenero(nombre) {
        try {
            const response = await fetch(`https://api.genderize.io/?name=${nombre}`);
            const data = await response.json();

            if (nombre.toLowerCase() === "dilan") {
                return "hombre";
            } else if (data.gender === "male") {
                return "hombre";
            } else if (data.gender === "female") {
                return "mujer";
            } else {
                return "persona";
            }
        } catch (error) {
            console.error("Error al determinar el género:", error);
            return "desconocido";
        }
    }

    function mostrarSaludo(nombre, genero, edad) {
        let saludo;

         if (edad >= 0 && edad <= 10) {
            if (genero === "hombre") {
                saludo = "pequeño";
            } else {
                saludo = "pequeña";
            }
        } else if (edad >= 11 && edad <= 23) {
            if (genero === "hombre") {
                saludo = "joven";
            } else {
                saludo = "señorita";
            }
        } else if (genero === "hombre") {
            saludo = "Señor";
        } else if (genero === "mujer") {
            saludo = "Señora";
        } else {
            saludo = "persona";
        }

        mostrarMensaje(nombre, saludo);
    }
});

