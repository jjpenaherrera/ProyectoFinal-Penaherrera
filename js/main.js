document.addEventListener("DOMContentLoaded", function () {
    // Definición de los dispositivos disponibles
    const dispositivos = [
        { id: 50, nombre: "Alexa", precio: 50 },
        { id: 100, nombre: "Termostato", precio: 100 },
        { id: 75, nombre: "Sensor de Movimiento", precio: 75 },
        { id: 150, nombre: "Cámara de Seguridad", precio: 150 },
        { id: 300, nombre: "Aspiradora Robot", precio: 300 },
        { id: 25, nombre: "Interruptor Inteligente", precio: 25 }
    ];

    let carrito = []; // Carrito de compras donde se almacenarán los dispositivos seleccionados

    // Función para agregar dispositivo al carrito
    function agregarDispositivo(id, cantidad) {
        const dispositivo = dispositivos.find(d => d.id === parseInt(id)); 
        if (dispositivo) {
            carrito.push({ ...dispositivo, cantidad });
        } else {
            console.log("Dispositivo no encontrado.");
        }
    }

    // Función para calcular el total
    function calcularTotal() {
        return carrito.reduce((total, dispositivo) => total + (dispositivo.precio * dispositivo.cantidad), 0);
    }

    // Función para mostrar el resultado
    function mostrarResultado() {
        const total = calcularTotal();
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `
            <h3>Total de la cotización:</h3>
            <p>$${total}</p>
        `;
    }

    // Manejar el evento del formulario
    document.getElementById("cotizadorForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Obtener todos los dispositivos seleccionados y las cantidades
        const dispositivosSeleccionados = document.querySelectorAll("select[name='dispositivo']");
        const cantidades = document.querySelectorAll("input[name='cantidad']");
        
        // Iterar sobre cada dispositivo seleccionado y agregarlo al carrito
        dispositivosSeleccionados.forEach((select, index) => {
            const id = select.value;
            const cantidad = cantidades[index].value;
            if (id && cantidad) {
                agregarDispositivo(id, parseInt(cantidad));
            }
        });

        // Mostrar el resultado de la cotización
        mostrarResultado();
    });

    // Manejar el evento de agregar un dispositivo
    document.getElementById("addDispositivo").addEventListener("click", function () {
        // Clonamos el último grupo de dispositivo
        const dispositivoContainer = document.getElementById("dispositivos-container");
        const nuevoDispositivo = dispositivoContainer.lastElementChild.cloneNode(true);
        
        // Limpiamos el valor de la cantidad en el nuevo dispositivo
        nuevoDispositivo.querySelector("input[name='cantidad']").value = '';
        
        // Insertamos el nuevo grupo de dispositivo al final del contenedor
        dispositivoContainer.appendChild(nuevoDispositivo);
    });

    // Manejar el evento de "Empezar de nuevo"
    document.getElementById("resetCotizacion").addEventListener("click", function () {
        // Vaciar el carrito
        carrito = [];

        // Restablecer el formulario
        const dispositivoContainer = document.getElementById("dispositivos-container");
        dispositivoContainer.innerHTML = `
            <div class="dispositivo-group mb-3">
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
                <input type="number" class="form-control cantidad" name="cantidad" min="1" placeholder="Ejemplo: 2">
            </div>
        `;

        // Restablecer el resultado
        document.getElementById("resultado").innerHTML = "";
    });
});
