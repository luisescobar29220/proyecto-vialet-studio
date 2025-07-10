document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    });

    card.addEventListener('mouseout', () => {
        card.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
    });
});

document.getElementById("logoutButton").addEventListener("click", function () {
    // Lógica para cerrar sesión
    localStorage.removeItem("nombreCliente"); // Eliminar el nombre guardado (si es que lo has almacenado)
    alert("Has cerrado sesión.");
    window.location.href = "/login/login.html"; // Redirigir al login
});

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


