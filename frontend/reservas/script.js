BASE_URL = "http://localhost:8080/reservas"; // URL base de tu backend

// Elementos del DOM
const calendar = document.getElementById("calendar");
const currentMonth = document.getElementById("currentMonth");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const appointmentForm = document.getElementById("appointmentForm");
const appointmentModal = new bootstrap.Modal(document.getElementById("appointmentModal"));

// Variables globales
let selectedDate = null;
let today = new Date();
let currentYear = today.getFullYear();
let currentMonthIndex = today.getMonth();
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Configuración de horarios
const citasPorDiaYHora = {}; // Objeto para almacenar citas organizadas por fecha y rango horario
const horariosDisponibles = [
    "09:00 AM - 12:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM"
];

// Función para renderizar el calendario
function renderCalendar(year, month) {
    currentMonth.textContent = `${monthNames[month]} ${year}`;
    calendar.innerHTML = "";

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Días vacíos antes del 1º
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement("div");
        calendar.appendChild(emptyDay);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = day;

        dayElement.addEventListener("click", () => {
            selectedDate = new Date(year, month, day);
            document.getElementById("appointmentModalLabel").textContent = `Agendar Cita para el ${day} de ${monthNames[month]} ${year}`;
            cargarRangosDisponibles(selectedDate.toLocaleDateString());
            appointmentModal.show();
        });

        calendar.appendChild(dayElement);
    }
}

// Navegación entre meses
prevMonthButton.addEventListener("click", () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonthIndex);
});

nextMonthButton.addEventListener("click", () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonthIndex);
});

// Función para cargar rangos horarios disponibles para la fecha seleccionada
function cargarRangosDisponibles(fecha) {
    const selectHorario = document.getElementById('appointmentTimeSlot');
    selectHorario.innerHTML = ''; // Limpiar opciones anteriores

    horariosDisponibles.forEach(horario => {
        const citasEnFecha = citasPorDiaYHora[fecha] || [];
        if (!citasEnFecha.includes(horario)) {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
        }
    });

    if (selectHorario.options.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No hay horarios disponibles';
        option.disabled = true;
        selectHorario.appendChild(option);
    }
}

// Nuevo cerrar sesión
document.getElementById("logoutButton").addEventListener("click", function () {
    // Lógica para cerrar sesión
    localStorage.removeItem("nombreCliente"); // Eliminar el nombre guardado
    alert("Has cerrado sesión.");
    window.location.href = "/login/login.html"; // Redirigir al login
});

// Obtener el nombre del cliente y mostrarlo en el formulario
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el nombre del cliente del localStorage
    const clienteNombre = localStorage.getItem("clienteNombre");

    if (clienteNombre) {
        // Reemplazar el texto de "Mi Cuenta" por el nombre del cliente
        const userLink = document.querySelector(".user-link");
        if (userLink) {
            userLink.textContent = clienteNombre;
        }

        // Establecer el valor del input "Cliente" con el nombre del cliente
        const appointmentTitleInput = document.getElementById("appointmentTitle");
        if (appointmentTitleInput) {
            appointmentTitleInput.value = clienteNombre; // Establece el valor del input con el nombre del cliente
        }
    }
});

// Guardar una cita
appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("appointmentTitle").value;
    const time = document.getElementById("appointmentTimeSlot").value;

    if (!selectedDate || !time) {
        alert("Por favor selecciona una fecha y un horario.");
        return;
    }

    const fecha = selectedDate.toLocaleDateString();

    if (!citasPorDiaYHora[fecha]) {
        citasPorDiaYHora[fecha] = [];
    }

    if (citasPorDiaYHora[fecha].includes(time)) {
        alert("El rango horario ya está ocupado. Selecciona otro.");
        return;
    }

    citasPorDiaYHora[fecha].push(time);
    alert(`Cita agendada para el ${fecha} a las ${time} con título: "${title}"`);

    appointmentModal.hide();
    appointmentForm.reset(); // Limpiar el formulario después de agendar la cita

    // Obtener el ID del cliente desde localStorage
    const clienteId = localStorage.getItem("clienteId");

    if (!clienteId) {
        alert("No se encontró el cliente. Por favor, inicia sesión.");
        return;
    }

    // Enviar la reserva al backend
    const reserva = {
        clienteId: clienteId, // El id del cliente
        tipoServicio: title,  // Puedes usar el título como tipo de servicio, ajusta según lo necesario
        rangoHora: time,
        fecha: fecha
    };

    // Hacer la solicitud POST para guardar la reserva
    fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("Reserva guardada exitosamente.");
        } else {
            alert("Hubo un error al guardar la reserva.");
        }
    })
    .catch(error => {
        console.error("Error al guardar la reserva:", error);
        alert("Error en la comunicación con el servidor.");
    });
});

// Renderizar el calendario inicial
renderCalendar(currentYear, currentMonthIndex);