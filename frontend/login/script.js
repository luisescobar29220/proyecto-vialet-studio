const BASE_URL = "http://localhost:8080/cliente";

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    // Limpiar mensajes de error previos
    errorMessage.textContent = "";

    // Validar que los campos no estén vacíos
    if (correo === "" || password === "") {
        errorMessage.textContent = "Por favor, complete ambos campos.";
        return;
    }

    try {
        // Llamar a la función para autenticar al cliente
        const response = await loginCliente(correo, password);

        if (response.success) {
            alert(`Bienvenido a Vailet Nails Studio, ${response.nombre}!`);
            
            // Guardar el clienteId y el nombre en localStorage
            localStorage.setItem("clienteId", response.clienteId); // Asegúrate de que el servidor te pase el clienteId
            localStorage.setItem("clienteNombre", response.nombre); // Guardar el nombre del cliente

            // Redirigir a la página principal
            window.location.href = "/index.html";
        } else {
            errorMessage.textContent = response.message || "Usuario o contraseña incorrectos.";
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        errorMessage.textContent = "Ocurrió un problema. Por favor, intente nuevamente más tarde.";
    }
});

// Función para autenticar al cliente
async function loginCliente(correo, password) {
    const url = `${BASE_URL}/login`;
    const body = {
        correo: correo,
        password: password,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta del servidor:", errorText);
        throw new Error(errorText);
    }

    // Devolver la respuesta en formato JSON
    const responseData = await response.json();
    
    // Almacenar el clienteId y nombre en localStorage
    if (responseData.success && responseData.clienteId) {
        localStorage.setItem("clienteId", responseData.clienteId);
        localStorage.setItem("clienteNombre", responseData.clienteNombre);
    }

    return responseData;
}
