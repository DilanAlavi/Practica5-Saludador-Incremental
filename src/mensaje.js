export function mostrarMensaje(nombre, genero) {
    const mensajeDiv = document.getElementById("mensaje");
    const nuevoMensaje = document.createElement("p");
    nuevoMensaje.innerHTML = `<strong>Hola, ${genero} ${nombre}!</strong>`;
    mensajeDiv.appendChild(nuevoMensaje);
}
