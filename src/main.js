import { mostrarMensaje } from "./mensaje.js";

document.addEventListener("DOMContentLoaded", function () {
    const miBoton = document.getElementById("miBoton");
    const nombreInput = document.getElementById("nombreInput");
    const edadInput = document.getElementById("edadInput");
    const idiomaSelector = document.getElementById("idiomaSelector");

    // Objeto de traducción
    const traducciones = {
        ES: {
            bienvenida: "Bienvenido",
            etiquetaTidioma : "Seleccionar Idioma",
            pregunta: "¿Me podrías decir tu nombre y tu edad?",
            etiquetaNombre: "Nombre:",
            etiquetaEdad: "Edad:",
            boton: "Listo",
            // Para agregar mas traducciones
        },
        EN: {
            bienvenida: "Welcome",
            etiquetaTidioma: "Select Language",
            pregunta: "Could you please tell me your name and age?",
            etiquetaNombre: "Name:",
            etiquetaEdad: "Age:",
            boton: "Submit",
            // Para Agregar Mas traducciones
        }
    };
    function mostrarMensajeSegunIdioma(nombre, genero, edad, idioma) {
        const fechaActual = new Date();
        const horaActual = fechaActual.getHours();
        const saludoHora = obtenerSaludoHora(horaActual, idioma);
    
        mostrarSaludo(nombre, genero, edad, idioma);
    }
    function limpiarMensaje() {
        const mensajeDiv = document.getElementById("mensaje");
        mensajeDiv.innerHTML = "";
    }
    function limpiarPagina() {
        nombreInput.value = "";
        edadInput.value = "";
        limpiarMensaje();
    }


    // Función para cargar el contenido según el idioma seleccionado
    function cargarContenido(idioma) {
        limpiarPagina();
        limpiarMensaje();
        const textoTraducido = traducciones[idioma];
        document.title = textoTraducido.bienvenida;
        document.getElementById("tituloBienvenida").textContent = textoTraducido.bienvenida;
        document.getElementById("etiquetaTidioma").textContent=textoTraducido.etiquetaTidioma;
        document.getElementById("pregunta").textContent = textoTraducido.pregunta;
        document.getElementById("etiquetaNombre").textContent = textoTraducido.etiquetaNombre;
        document.getElementById("etiquetaEdad").textContent = textoTraducido.etiquetaEdad;
        document.getElementById("miBoton").textContent = textoTraducido.boton;
    }
    

    // Evento para detectar el cambio en el selector de idioma
    idiomaSelector.addEventListener("change", function () {
        const idiomaSeleccionado = idiomaSelector.value;
        cargarContenido(idiomaSeleccionado);
    });

    miBoton.addEventListener("click", async function () {
        limpiarMensaje();
        const nombre = nombreInput.value;
        const edad = parseInt(edadInput.value); // Convertir la edad a un número

        if (nombre.trim() !== "" && !isNaN(edad)) {
            const genero = await determinarGenero(nombre);
            const idioma = idiomaSelector.value; // Obtener el idioma seleccionado
            mostrarSaludo(nombre, genero, edad, idioma);
        }
    });

    document.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") {
            const nombre = nombreInput.value;
            const edad = parseInt(edadInput.value); // Convertir la edad a un número

            if (nombre.trim() !== "" && !isNaN(edad)) {
                const genero = await determinarGenero(nombre);
                const idioma = idiomaSelector.value; // Obtener el idioma seleccionado
                mostrarSaludo(nombre, genero, edad, idioma);
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
    function obtenerSaludoHora(hora, idioma) {
        let saludoHora;
    
        if (idioma === "ES") {
            if (hora >= 6 && hora < 12) {
                saludoHora = "Buenos días";
            } else if (hora >= 12 && hora < 18) {
                saludoHora = "Buenas tardes";
            } else {
                saludoHora = "Buenas noches";
            }
        } else if (idioma === "EN") {
            if (hora >= 6 && hora < 12) {
                saludoHora = "Good Morning";
            } else if (hora >= 12 && hora < 18) {
                saludoHora = "Good Afternoon";
            } else {
                saludoHora = "Good Evening";
            }
        } else {
            saludoHora = "Hello"; // Saludo predeterminado si no se selecciona ES o EN
        }
    
        return saludoHora;
    }
    
    function mostrarSaludo(nombre, genero, edad, idioma) {
        const fechaActual = new Date();
        const horaActual = fechaActual.getHours();
        const saludoHora = obtenerSaludoHora(horaActual, idioma);
    
        let saludo;
    
        if (idioma === "ES") {
            if (edad >= 0 && edad <= 10) {
                if (genero === "hombre") {
                    saludo = "pequeño";
                } else {
                    saludo = "pequeña";
                }
            } else if (edad >= 11 && edad <= 23) {
                if (genero === "hombre") {
                    saludo = "Joven";
                } else {
                    saludo = "Señorita";
                }
            } else if (genero === "hombre") {
                saludo = "Señor";
            } else if (genero === "mujer") {
                saludo = "Señora";
            } else {
                saludo = "persona";
            }
            mostrarMensaje(nombre, `${saludoHora}, ${saludo} ${nombre}! ¿En qué puedo ser de ayuda?`);
        } else if (idioma === "EN") {
            if (edad >= 0 && edad <= 10) {
                if (genero === "hombre") {
                    saludo = "little";
                } else {
                    saludo = "little";
                }
            } else if (edad >= 11 && edad <= 23) {
                if (genero === "hombre") {
                    saludo = "young man";
                } else {
                    saludo = "miss";
                }
            } else if (genero === "hombre") {
                saludo = "Mr.";
            } else if (genero === "mujer") {
                saludo = "Mrs.";
            } else {
                saludo = "person";
            }
            mostrarMensaje(nombre, `${saludoHora}, ${saludo} ${nombre}! How can I help you?`);
        } else {
            saludo = "person"; // Saludo predeterminado si no se selecciona ES o EN
            mostrarMensaje(nombre, `${saludoHora}, ${saludo} ${nombre}! How can I help you?`);
        }
    }
    
});

