// Lista de dispositivos
const dispositivos = [
    { id: 1, nombre: "Alexa", precio: 50 },
    { id: 2, nombre: "Termostato", precio: 100 },
    { id: 3, nombre: "Sensor de Movimiento", precio: 75 },
    { id: 4, nombre: "Cámara de Seguridad", precio: 150 },
    { id: 5, nombre: "Aspiradora Robot", precio: 300 },
    { id: 6, nombre: "Interruptor Inteligente", precio: 25 },
];

// Obtener elementos del DOM
const cotizadorForm = document.getElementById("cotizadorForm");
const dispositivosContainer = document.getElementById("dispositivos-container");
const addDispositivoButton = document.getElementById("addDispositivo");
const resultadoDiv = document.getElementById("resultado");

// Función para agregar un nuevo grupo de dispositivo
addDispositivoButton.addEventListener("click", () => {
    const nuevoDispositivo = document.createElement("div");
    nuevoDispositivo.classList.add("dispositivo-group", "mb-3");
    nuevoDispositivo.innerHTML = `
        <label for="dispositivo" class="form-label">Seleccione un dispositivo:</label>
        <select class="form-select dispositivo" name="dispositivo">
            <option value="50">Alexa - $50</option>
            <option value="100">Termostato - $100</option>
            <option value="75">Sensor de Movimiento - $75</option>
            <option value="150">Cámara de Seguridad - $150</option>
            <option value="300">Aspiradora Robot - $300</option>
            <option value="25">Interruptor Inteligente - $25</option>
        </select>
        <label for="cantidad" class="form-label mt-2">Ingrese la cantidad:</label>
        <input type="number" class="form-control cantidad" min="1" placeholder="Ejemplo: 2">
    `;
    dispositivosContainer.appendChild(nuevoDispositivo);
});

// Función para calcular la cotización
cotizadorForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío del formulario
    let total = 0;

    // Recorrer los grupos de dispositivos y calcular el total
    const dispositivos = dispositivosContainer.querySelectorAll(".dispositivo-group");
    const detalles = [];
    dispositivos.forEach((grupo, index) => {
        const dispositivo = grupo.querySelector(".dispositivo").value;
        const cantidad = parseInt(grupo.querySelector(".cantidad").value) || 0;
        const subtotal = dispositivo * cantidad;

        if (cantidad > 0) {
            detalles.push(`Dispositivo ${index + 1}: Cantidad ${cantidad} - Subtotal $${subtotal}`);
            total += subtotal;
        }
    });

    // Mostrar el resultado
    resultadoDiv.innerHTML = `
        <h3>Detalle de la cotización:</h3>
        <ul>
            ${detalles.map((detalle) => `<li>${detalle}</li>`).join("")}
        </ul>
        <p>Total General: $${total}</p>
    `;
});


// Función para guardar en localStorage
function guardarCotizacion(session) {
    let cotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    cotizaciones.push(session);
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
}

// Manejo del evento de agregar dispositivos
addDispositivoButton.addEventListener("click", agregarDispositivo);

// Manejo del evento submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dispositivosSeleccionados = document.querySelectorAll(".dispositivo");
    const cantidades = document.querySelectorAll(".cantidad");

    const session = [];

    dispositivosSeleccionados.forEach((select, index) => {
        const dispositivoId = Number(select.value);
        const cantidad = Number(cantidades[index].value);

        if (isNaN(cantidad) || cantidad <= 0) {
            mostrarResultado([{ dispositivo: "Error", cantidad: 0, costoTotal: 0 }]);
            return;
        }

        const dispositivo = dispositivos.find(d => d.id === dispositivoId);
        const costoTotal = dispositivo.precio * cantidad;

        session.push({ dispositivo: dispositivo.nombre, cantidad, costoTotal });
    });

    guardarCotizacion(session);
    mostrarResultado(session);

    form.reset();
    dispositivosContainer.innerHTML = ""; // Resetear campos dinámicos
    agregarDispositivo(); // Agregar un grupo por defecto
});

// Inicialización
agregarDispositivo();
