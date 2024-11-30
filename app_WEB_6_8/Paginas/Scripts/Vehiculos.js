//document.addEventListener("DOMContentLoaded", function () {
    
//    const btnInsertarVehiculo = document.getElementById("btnInsertarVehiculo");
//    if (btnInsertarVehiculo) {
//        btnInsertarVehiculo.addEventListener("click", insertarVehiculo);
//    }
//});

//function insertarVehiculo() {
//    const TipoVehiculoID = document.getElementById('tipoVehiculoID').value; // Asegúrate de que este campo exista y tenga valor
//    const vehiculoData = {
//        TipoVehiculoID: TipoVehiculoID,
//        VehiculoID: document.getElementById('editVehiculoID').value,
//        SucursalID: document.getElementById('editSucursalID').value,
//        Marca: document.getElementById('editMarca').value,
//        Modelo: document.getElementById('editModelo').value,
//        Ano: document.getElementById('editAno').value,
//        NumeroPlaca: document.getElementById('editNumeroPlaca').value,
//        Estado: document.getElementById('editEstado').value,
//        SeguroID: document.getElementById('editSeguroID').value,
//        TarifaQuincenal: document.getElementById('editTarifaQuincenal').value
//    };

//    fetch('https://localhost:44356/api/Vehiculos', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(vehiculoData)
//    })
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Respuesta de red no fue ok: ' + response.statusText);
//            }
//            return response.text();
//        })
//        .then(data => {
//            console.log('Vehículo insertado con éxito:', data);
//            alert('Vehículo insertado con éxito: ' + data);
//            // Opcionalmente limpiar o actualizar la vista
//        })
//        .catch(error => {
//            console.error('Error al insertar vehículo:', error);
//            alert('Error al insertar vehículo: ' + error.message);
//        });
//}
