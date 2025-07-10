// Agregar interacciones adicionales si es necesario

// Si deseas que los botones de redes sociales abran un mensaje de confirmación al hacer clic, puedes agregar el siguiente código:

document.querySelectorAll('.social-media-links .btn').forEach(button => {
    button.addEventListener('click', function(event) {
        alert("¡Gracias por seguirnos! Te redirigiremos a nuestras redes sociales.");
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

