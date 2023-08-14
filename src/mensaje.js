export function mostrarMensaje(texto) {
    const mensajeDiv = document.getElementById("mensaje");
    const nuevoMensaje = document.createElement("p");
    nuevoMensaje.innerHTML = `<strong>${texto}</strong>`;
    mensajeDiv.appendChild(nuevoMensaje);
}
