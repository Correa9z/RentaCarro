function insertarTipoVehiculo() {
    var tipoVehiculoData = {
        NombreTipo: document.getElementById('NombreTipo').value,
        TarifaDiaria: parseFloat(document.getElementById('TarifaDiaria').value)
    };

    fetch('http://localhost:58023/api/TiposVehiculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoVehiculoData)
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            alert(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al insertar el tipo de vehículo.');
        });
}
// En TiposVehiculo.js

function consultarTipoVehiculoParaEditar() {
    var TipoVehiculoID = parseInt(document.getElementById('buscarTipoVehiculoID').value); // Cambiado a parseInt
    if (isNaN(TipoVehiculoID) || TipoVehiculoID <= 0) {
        alert('Por favor, introduce un ID válido.');
        return;
    }

    fetch(`http://localhost:58023/api/TiposVehiculo?TipoVehiculoID=${TipoVehiculoID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el tipo de vehículo con el ID proporcionado');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                document.getElementById('editNombreTipo').value = data.NombreTipo;
                document.getElementById('editTarifaDiaria').value = data.TarifaDiaria;
                document.getElementById('editarVehiculoDiv').style.display = 'block';
              
               
            } else {
                alert('No se encontró el tipo de vehículo con el ID proporcionado.');
                document.getElementById('editarVehiculoDiv').style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al consultar el tipo de vehículo.');
            document.getElementById('editarVehiculoDiv').style.display = 'none';
        });
}
// En TiposVehiculo.js

// ... (El resto de tu código de insertar, modificar y eliminar para TipoVehiculo)


// Agrega aquí las funciones para insertar, modificar y eliminar vehículos.

function mostrarDetallesVehiculos(vehiculos) {
    const vehiculosDiv = document.getElementById('gestionVehiculosDiv');
    vehiculosDiv.innerHTML = '<h5>Detalles de Vehículos Asociados</h5>'; // Limpiar y preparar para nuevos datos

    if (vehiculos.length > 0) {
        vehiculos.forEach(vehiculo => {
            vehiculosDiv.innerHTML += `
                <div>Placa: ${vehiculo.Placa}, Estado: ${vehiculo.Estado}, Sucursal ID: ${vehiculo.SucursalID}</div>
            `;
        });
    } else {
        vehiculosDiv.innerHTML += '<p>No hay vehículos asociados a este tipo. Puedes agregar uno.</p>';
    }
}


function modificarTipoVehiculo() {
    var tipoVehiculoData = {
        NombreTipo: document.getElementById('editNombreTipo').value,
        TarifaDiaria: parseFloat(document.getElementById('editTarifaDiaria').value)
    };
    var TipoVehiculoID = parseInt(document.getElementById('buscarTipoVehiculoID').value);

    fetch(`http://localhost:58023/api/TiposVehiculo?TipoVehiculoID=${TipoVehiculoID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoVehiculoData)
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            alert(data);
            document.getElementById('editarVehiculoDiv').style.display = 'none'; // Ocultar después de actualizar
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al actualizar el tipo de vehículo.');
        });
}
function eliminarTipoVehiculo() {
    var TipoVehiculoID = parseInt(document.getElementById('buscarTipoVehiculoID').value);

    fetch(`http://localhost:58023/api/TiposVehiculo?TipoVehiculoID=${TipoVehiculoID}`, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            alert(data);
            document.getElementById('editarVehiculoDiv').style.display = 'none'; // Ocultar después de eliminar
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al eliminar el tipo de vehículo.');
        });
}

function consultarTodosTipos() {
    fetch('http://localhost:58023/api/TiposVehiculo')
        .then(response => response.json())
        .then(data => {
            const detallesDiv = document.getElementById('resultadoTiposVehiculo');
            let contenido = '<div class="list-group">';
            data.forEach(tipo => {
                contenido += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Tipo Vehículo ID: ${tipo.TipoVehiculoID}</h5>
                  <small>Nombre: ${tipo.NombreTipo}</small>
                </div>
                <p class="mb-1">Tarifa Diaria: ${tipo.TarifaDiaria}</p>`;

                if (tipo.Vehiculos && tipo.Vehiculos.length > 0) {
                    contenido += `<p class="mb-1">Vehículos Asociados:</p><ul>`;
                    tipo.Vehiculos.forEach(vehiculo => {
                        contenido += `<li>Vehiculo ID: ${vehiculo.VehiculoID}, Placa: ${vehiculo.Placa}, Estado: ${vehiculo.Estado}, Sucursal ID: ${vehiculo.SucursalID}</li>`;
                    });
                    contenido += '</ul>';
                } else {
                    contenido += '<p>No hay vehículos asociados a este tipo.</p>';
                }
                contenido += '</a>';
            });
            contenido += '</div>';
            detallesDiv.innerHTML = contenido;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al consultar los tipos de vehículos.');
            document.getElementById('resultadoTiposVehiculo').innerHTML = '<p>Error al realizar la consulta.</p>';
        });
}

