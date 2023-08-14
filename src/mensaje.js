export function mostrarMensaje(texto) {
    const mensajeDiv = document.getElementById("mensaje");
    const nuevoMensaje = document.createElement("p");
    nuevoMensaje.textContent = texto;
    mensajeDiv.appendChild(nuevoMensaje);
}
