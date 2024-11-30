document.addEventListener("DOMContentLoaded", function () {
    const agregarForm = document.getElementById("formAgregarTipoVehiculo");
    agregarForm.addEventListener("submit", function (event) {
        event.preventDefault();
        agregarTipoVehiculo();
    });

    const consultarTodosBtn = document.getElementById("consultarTodosBtn");
    if (consultarTodosBtn) {
        consultarTodosBtn.addEventListener("click", consultarTodosTiposVehiculos);
    }
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("btnConsultarPorID").addEventListener("click", consultarTipoVehiculoPorID);
    });



});

function agregarTipoVehiculo() {
    const tipoVehiculoID = document.getElementById("TipoVehiculoID").value;
    const descripcion = document.getElementById("descripcion").value;

    fetch('https://localhost:44356/api/TiposDeVehiculos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ TipoVehiculoID: tipoVehiculoID, Descripcion: descripcion })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Tipo de Vehículo agregado con éxito');
            document.getElementById("formAgregarTipoVehiculo").reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al agregar el tipo de vehículo');
        });
}

function consultarTodosTiposVehiculos() {
    console.log("Consultando todos los tipos de vehículos...");
    fetch('https://localhost:44356/api/TiposDeVehiculos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            const listado = document.getElementById("listadoTiposVehiculos");
            listado.innerHTML = ''; // Limpia la lista antes de mostrar los resultados
            if (data.length > 0) {
                data.forEach(tipo => {
                    let vehiculosHTML = tipo.Vehiculos && tipo.Vehiculos.length > 0 ?
                        tipo.Vehiculos.map(vehiculo => `
                <tr>
                  <td>${vehiculo.VehiculoID}</td>
                  <td>${vehiculo.SucursalID}</td>
                  <td>${vehiculo.Marca}</td>
                  <td>${vehiculo.Modelo}</td>
                  <td>${vehiculo.Ano}</td>
                  <td>${vehiculo.NumeroPlaca}</td>
                  <td>${vehiculo.Estado}</td>
                  <td>${vehiculo.SeguroID}</td>
                  <td>${vehiculo.TarifaQuincenal}</td>
                </tr>
              `).join('') :
                        '<tr><td colspan="9">No hay vehículos asociados a este tipo.</td></tr>';

                    listado.innerHTML += `
            <div class="tipo-vehiculo-container">
              <h4>ID Tipo: ${tipo.TipoVehiculoID} - Descripción: ${tipo.Descripcion}</h4>
              <table>
                <tr>
                  <th>VehiculoID</th>
                  <th>SucursalID</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Año</th>
                  <th>Número de Placa</th>
                  <th>Estado</th>
                  <th>SeguroID</th>
                  <th>Tarifa Quincenal</th>
                </tr>
                ${vehiculosHTML}
              </table>
            </div>
          `;
                });
            } else {
                listado.innerHTML = '<p>No hay tipos de vehículos disponibles.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al consultar todos los tipos de vehículos: ' + error.message);
        });
}


function consultarTipoVehiculoPorID() {
    var TipoVehiculoID = parseInt(document.getElementById('consultaTipoVehiculoID').value);
    if (isNaN(TipoVehiculoID) || TipoVehiculoID <= 0) {
        alert('Por favor, introduce un ID válido.');
        return;
    }

    fetch(`https://localhost:44356/api/TiposDeVehiculos?TipoVehiculoID=${TipoVehiculoID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el tipo de vehículo con el ID proporcionado');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                document.getElementById('tipoVehiculoID').value = data.TipoVehiculoID;
                document.getElementById('editDescripcion').value = data.Descripcion;
                document.getElementById('detallesTipoVehiculo').style.display = 'block';

                if (data.Vehiculos && data.Vehiculos.length > 0) {
                    cargarDatosVehiculosAsociados(data.Vehiculos);
                } else {
                    // Inicializar el formulario de vehículos asociados para permitir inserciones
                    inicializarFormularioVehiculosAsociados();
                }
                // Asegurarse de que el formulario de vehículos asociados siempre se muestre
                document.getElementById('vehiculosAsociados').style.display = 'block';
            } else {
                alert('No se encontró un tipo de vehículo con el ID proporcionado.');
                document.getElementById('detallesTipoVehiculo').style.display = 'none';
                document.getElementById('vehiculosAsociados').style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al consultar el tipo de vehículo.');
            document.getElementById('detallesTipoVehiculo').style.display = 'none';
            document.getElementById('vehiculosAsociados').style.display = 'none';
        });
}

function cargarDatosVehiculosAsociados(vehiculos) {
    // Asignar los valores del primer vehículo al formulario
    const primerVehiculo = vehiculos[0];
    llenarFormularioVehiculosAsociados(primerVehiculo);
}

function inicializarFormularioVehiculosAsociados() {
    // Limpiar o establecer valores predeterminados para un nuevo vehículo
    llenarFormularioVehiculosAsociados({
        VehiculoID: '',
        TipoDeVehiculoID: '',
        SucursalID: '',
        Marca: '',
        Modelo: '',
        Ano: '',
        NumeroPlaca: '',
        Estado: '',
        SeguroID: '',
        TarifaQuincenal: ''
    });
}

function llenarFormularioVehiculosAsociados(vehiculo) {

    document.getElementById('editVehiculoID').value = vehiculo.VehiculoID;
    document.getElementById('editTipoVehiculoID').value = vehiculo.TipoVehiculoID;
    document.getElementById('editSucursalID').value = vehiculo.SucursalID;
    document.getElementById('editMarca').value = vehiculo.Marca;
    document.getElementById('editModelo').value = vehiculo.Modelo;
    document.getElementById('editAno').value = vehiculo.Ano;
    document.getElementById('editNumeroPlaca').value = vehiculo.NumeroPlaca;
    document.getElementById('editEstado').value = vehiculo.Estado;
    document.getElementById('editSeguroID').value = vehiculo.SeguroID;
    document.getElementById('editTarifaQuincenal').value = vehiculo.TarifaQuincenal;
}

function eliminarTipoVehiculo() {
    const TipoVehiculoID = document.getElementById('tipoVehiculoID').value;

    fetch(`https://localhost:44356/api/TiposDeVehiculos?TipoVehiculoID=${TipoVehiculoID}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar el tipo de vehículo: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            alert(data); // Mostrar el mensaje de éxito o error devuelto por el servidor
            document.getElementById('detallesTipoVehiculo').style.display = 'none'; // Ocultar detalles después de eliminar
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el tipo de vehículo: ' + error.message);
        });
}

// Asegurarse de que el botón de eliminar esté correctamente vinculado al evento
document.addEventListener("DOMContentLoaded", function () {
    const btnEliminar = document.getElementById('btnEliminarTipo');
    if (btnEliminar) {
        btnEliminar.addEventListener('click', eliminarTipoVehiculo);
    } else {
        console.error("No se encontró el botón de eliminar.");
    }
});
function actualizarDescripcion() {
    const TipoVehiculoID = document.getElementById('tipoVehiculoID').value;
    const nuevaDescripcion = document.getElementById('editDescripcion').value;

    fetch(`https://localhost:44356/api/TiposDeVehiculos?TipoVehiculoID=${TipoVehiculoID}`, {
        method: 'PUT', // Usando PUT como método de actualización, ajusta según tu API
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Descripcion: nuevaDescripcion }) // Asegúrate de que el backend espera un objeto con esta forma
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo actualizar el tipo de vehículo: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            alert('Descripción actualizada con éxito');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el tipo de vehículo: ' + error.message);
        });
}

// Vincular el botón de actualizar con el evento click
document.addEventListener("DOMContentLoaded", function () {
    const btnActualizar = document.getElementById('btnActualizarDescripcion');
    if (btnActualizar) {
        btnActualizar.addEventListener('click', actualizarDescripcion);
    } else {
        console.error("No se encontró el botón de actualizar.");
    }
});

//CRUD DE VEHICULOS
// Evento para manejar la inserción de vehículos
document.addEventListener("DOMContentLoaded", function () {
    const btnInsertarVehiculo = document.getElementById('btnInsertarVehiculo');
    if (btnInsertarVehiculo) {
        btnInsertarVehiculo.addEventListener('click', function () {
            const TipoVehiculoID = document.getElementById('tipoVehiculoID').value; // Este es el ID obtenido y mostrado en el formulario.

            // Asegúrate de que TipoVehiculoID no es nulo ni undefined antes de enviar
            if (!TipoVehiculoID) {
                alert("Tipo de Vehículo ID no está disponible.");
                return;
            }

            const vehiculoData = {
                TipoVehiculoID: TipoVehiculoID, // Asegurándonos de que TipoVehiculoID se incluye en los datos enviados.
                VehiculoID: document.getElementById('editVehiculoID').value,
                SucursalID: document.getElementById('editSucursalID').value,
                Marca: document.getElementById('editMarca').value,
                Modelo: document.getElementById('editModelo').value,
                Ano: document.getElementById('editAno').value,
                NumeroPlaca: document.getElementById('editNumeroPlaca').value,
                Estado: document.getElementById('editEstado').value,
                SeguroID: document.getElementById('editSeguroID').value,
                TarifaQuincenal: document.getElementById('editTarifaQuincenal').value
            };

            fetch('https://localhost:44356/api/Vehiculos?TipoVehiculoID=' + TipoVehiculoID, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehiculoData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Fallo: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Vehiculo insertado!');
                    console.log(data);
                    // Opcionalmente, resetea el formulario aquí o realiza cualquier otra acción necesaria post-inserción
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al insertar: ' + error.message);
                });
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const btnActualizarVehiculo = document.getElementById('btnActualizarVehiculo');
    if (btnActualizarVehiculo) {
        btnActualizarVehiculo.addEventListener('click', function () {
            // Asegurándonos de que el tipoVehiculoID esté establecido por la consulta previa
            const TipoVehiculoID = document.getElementById('tipoVehiculoID').value;
            const VehiculoID = document.getElementById('editVehiculoID').value; // ID del vehículo que se está editando

            // Datos del formulario
            const vehiculoData = {
                VehiculoID: VehiculoID,
                SucursalID: document.getElementById('editSucursalID').value,
                Marca: document.getElementById('editMarca').value,
                Modelo: document.getElementById('editModelo').value,
                Ano: document.getElementById('editAno').value,
                NumeroPlaca: document.getElementById('editNumeroPlaca').value,
                Estado: document.getElementById('editEstado').value,
                SeguroID: document.getElementById('editSeguroID').value,
                TarifaQuincenal: document.getElementById('editTarifaQuincenal').value
            };

            fetch(`https://localhost:44356/api/Vehiculos?TipoVehiculoID=` + TipoVehiculoID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehiculoData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update vehicle: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Vehiculo actualizado Con EXITO');
                    console.log(data);
                    // Refresca los datos del formulario o realiza cualquier otra acción necesaria después de la actualización
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('ERROR: ' + error.message);
                });
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const btnEliminarVehiculo = document.getElementById('btnEliminarVehiculo');
    if (btnEliminarVehiculo) {
        btnEliminarVehiculo.addEventListener('click', function () {
            const VehiculoID = document.getElementById('editVehiculoID').value; // ID del vehículo a eliminar
            const TipoVehiculoID = document.getElementById('editTipoVehiculoID').value; // Asegura que el TipoVehiculoID sea correcto para asociar correctamente

            // Verifica que realmente quieres eliminar este vehículo
            if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
                fetch(`https://localhost:44356/api/Vehiculos?TipoVehiculoID=` + TipoVehiculoID, {
                    method: 'DELETE'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('No se pudo eliminar el vehículo: ' + response.statusText);
                        }
                        return response.text();
                    })
                    .then(data => {
                        alert('Vehículo eliminado correctamente');
                        // Limpiar formulario o realizar otras acciones necesarias tras eliminar
                        document.getElementById('editVehiculoID').value = '';
                        document.getElementById('editSucursalID').value = '1';
                        document.getElementById('editMarca').value = '';
                        document.getElementById('editModelo').value = '';
                        document.getElementById('editAno').value = '';
                        document.getElementById('editNumeroPlaca').value = '';
                        document.getElementById('editEstado').value = '';
                        document.getElementById('editSeguroID').value = '1';
                        document.getElementById('editTarifaQuincenal').value = '';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error al eliminar el vehículo: ' + error.message);
                    });
            }
        });
    }
});



