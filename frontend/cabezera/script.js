document.addEventListener("DOMContentLoaded", function () {
    // Obtener el nombre del cliente del localStorage
    const clienteNombre = localStorage.getItem("clienteNombre");

    if (clienteNombre) {
        // Reemplazar el texto de "Mi Cuenta" por el nombre del cliente
        const userLink = document.querySelector(".user-link");
        if (userLink) {
            userLink.textContent = clienteNombre;
        }
    }
});


document.getElementById("logoutButton").addEventListener("click", function () {
    // Lógica para cerrar sesión
    localStorage.removeItem("nombreCliente"); // Eliminar el nombre guardado (si es que lo has almacenado)
    alert("Has cerrado sesión.");
    window.location.href = "/index.html"; // Redirigir al login
});

document.getElementById("logoutButton").addEventListener("click", function () {
    // Lógica para cerrar sesión
    localStorage.removeItem("nombreCliente"); // Eliminar el nombre guardado
    alert("Has cerrado sesión.");
    window.location.href = "/login/login.html"; // Redirigir al login
});
