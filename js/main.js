// Variables y Objetos
const dispositivos = [
    { id: 1, nombre: "Alexa", precio: 50 },
    { id: 2, nombre: "Termostato", precio: 100 },
    { id: 3, nombre: "Sensor de Movimiento", precio: 75 }
];

// Función para multiplicar (calcular costo total)
function multiplicar(a, b) {
    return a * b;
}

// Función para buscar un dispositivo por ID
function buscarDispositivo(id) {
    return dispositivos.find(dispositivo => dispositivo.id === id);
}

// Función para validar cantidad
function validarCantidad() {
    let cantidad;
    do {
        cantidad = Number(prompt("¿Cuántas unidades desea comprar?"));
        if (cantidad <= 0 || isNaN(cantidad)) {
            alert("Cantidad inválida. Por favor, ingrese un número mayor a 0.");
        }
    } while (cantidad <= 0 || isNaN(cantidad));
    return cantidad;
}

// Función para validar la selección de ID
function validarSeleccion() {
    let seleccion;
    do {
        let mensajeOpciones = "Seleccione el número del dispositivo para cotizar:\n";
        dispositivos.forEach(item => {
            mensajeOpciones += `${item.id}. ${item.nombre} - $${item.precio}\n`;
        });

        seleccion = Number(prompt(mensajeOpciones));
        if (seleccion !== 1 && seleccion !== 2 && seleccion !== 3) {
            alert("Selección inválida. Por favor, ingrese 1, 2 o 3.");
        }
    } while (seleccion !== 1 && seleccion !== 2 && seleccion !== 3);
    return seleccion;
}

// Bienvenida
alert("Bienvenido al simulador de cotizaciones de dispositivos inteligentes");

// Validar selección del usuario
const seleccion = validarSeleccion();
const dispositivoSeleccionado = buscarDispositivo(seleccion);

// Validar cantidad ingresada
const cantidad = validarCantidad();

// Calcular costo total
const costoTotal = multiplicar(dispositivoSeleccionado.precio, cantidad);

// Salida de resultados
alert(`El costo total de su cotización es: $${costoTotal}`);
console.log(`Dispositivo seleccionado: ${dispositivoSeleccionado.nombre}`);
console.log(`Cantidad: ${cantidad}`);
console.log(`Costo total: $${costoTotal}`);

// Extra: Filtrar dispositivos con precios menores a $100
const dispositivosEconomicos = dispositivos.filter(d => d.precio < 100);
console.log("Dispositivos con precios menores a $100:");
console.log(dispositivosEconomicos);
