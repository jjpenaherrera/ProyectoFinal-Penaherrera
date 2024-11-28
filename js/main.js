
// Variables para los precios de los dispositivos
const precios = {
    alexa: 50,
    termostato: 100,
    sensorMovimiento: 75
};

// Bienvenida
alert("Bienvenido al simulador de cotizaciones de dispositivos inteligentes");

// Mostrar opciones de dispositivos
const opciones = "Seleccione el numero del dispositivo para cotizar: " +
    "1. Alexa - $" + precios.alexa + ", " +
    "2. Termostato - $" + precios.termostato + ", " +
    "3. Sensor de Movimiento - $" + precios.sensorMovimiento;

// Solicitar al usuario su selección
let dispositivo = Number(prompt(opciones));

// Validar selección del usuario
if (dispositivo === 1 || dispositivo === 2 || dispositivo === 3) {
    let cantidad = Number(prompt("¿Cuántas unidades de dispositivos desea comprar?"));
    if (cantidad <= 0) {
        alert("Cantidad inválida. Por favor, ingrese un número válido.");
    } else {
        // Determinar el precio según la selección
        let precioSeleccionado = 0;
        let nombreDispositivo = "";

        if (dispositivo === 1) {
            precioSeleccionado = precios.alexa;
            nombreDispositivo = "Alexa";
        } else if (dispositivo === 2) {
            precioSeleccionado = precios.termostato;
            nombreDispositivo = "Termostato";
        } else if (dispositivo === 3) {
            precioSeleccionado = precios.sensorMovimiento;
            nombreDispositivo = "Sensor de Movimiento";
        }

        // Calcular el total
        const total = precioSeleccionado * cantidad;

        // Mostrar el resultado
        alert("El costo total de su cotización es: $" + total);
        console.log("Dispositivo seleccionado: " + nombreDispositivo);
        console.log("Cantidad: " + cantidad);
        console.log("Costo total: $" + total);
    }
} else {
    alert("Selección inválida. Por favor, recargue la página para intentar nuevamente.");
}
