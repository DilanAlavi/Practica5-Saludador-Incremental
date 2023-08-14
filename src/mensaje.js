export function mostrarMensaje(nombre, saludoCompleto) {
    const mensajeDiv = document.getElementById("mensaje");
    const nuevoMensaje = document.createElement("p");
    nuevoMensaje.innerHTML = `<strong>${saludoCompleto}</strong>`;
    mensajeDiv.appendChild(nuevoMensaje);
}
