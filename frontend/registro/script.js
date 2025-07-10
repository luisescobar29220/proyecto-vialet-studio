const BASE_URL = "http://localhost:8080/cliente"; // URL base de tu backend

// Función para registrar un cliente
async function createCliente(nombres, apellidos, correo, telefono, password) {
    const url = `${BASE_URL}`;
    const body = {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        telefono: telefono,
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
        console.error("Error al registrar cliente:", errorText);
        throw new Error(errorText);
    }

    return await response.json();
}

// Manejo del evento de registro
document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    const nombres = document.getElementById("firstName").value;
    const apellidos = document.getElementById("lastName").value;
    const correo = document.getElementById("email").value;
    const telefono = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    try {
        // Intentar registrar al cliente
        await createCliente(nombres, apellidos, correo, telefono, password);

        // Mostrar mensaje de éxito y redirigir
        successMessage.style.display = "block";
        successMessage.textContent = "¡Registro exitoso! Redirigiendo...";
        setTimeout(() => {
            window.location.href = "/index.html"; // Cambiar a la página de inicio
        }, 2000);
    } catch (error) {
        // Mostrar mensaje de error
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.style.color = "red";
    }
});
