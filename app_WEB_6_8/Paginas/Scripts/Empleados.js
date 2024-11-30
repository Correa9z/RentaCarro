document.addEventListener("DOMContentLoaded", function () {
    const formAgregarEmpleado = document.getElementById('formAgregarEmpleado');
    formAgregarEmpleado.addEventListener('submit', function (event) {
        event.preventDefault();

        const empleadoData = {
            EmpleadoID: document.getElementById('EmpleadoID').value,
            SucursalID: document.getElementById('SucursalID').value,
            Nombre: document.getElementById('Nombre').value,
            Apellido: document.getElementById('Apellido').value,
            Telefono: document.getElementById('Telefono').value,
            Email: document.getElementById('Email').value,
            Posicion: document.getElementById('Posicion').value
        };

        fetch('https://localhost:44356/api/Empleados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar empleado: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                alert('Empleado agregado con éxito!');
                console.log(data);
                formAgregarEmpleado.reset();  // Resetear el formulario tras la inserción exitosa
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al agregar el empleado: ' + error.message);
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const btnConsultarTodos = document.getElementById('consultarTodosBtn');
    btnConsultarTodos.addEventListener('click', function () {
        fetch('https://localhost:44356/api/Empleados')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(empleados => {
                const listado = document.getElementById("listadoEmpleados");
                listado.innerHTML = ''; // Limpia la lista antes de mostrar los resultados
                if (empleados.length > 0) {
                    const tabla = document.createElement('table');
                    tabla.innerHTML = `
                    <tr>
                        <th>EmpleadoID</th>
                        <th>SucursalID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Posición</th>
                    </tr>
                `;
                    empleados.forEach(empleado => {
                        tabla.innerHTML += `
                        <tr>
                            <td>${empleado.EmpleadoID}</td>
                            <td>${empleado.SucursalID}</td>
                            <td>${empleado.Nombre}</td>
                            <td>${empleado.Apellido}</td>
                            <td>${empleado.Telefono}</td>
                            <td>${empleado.Email}</td>
                            <td>${empleado.Posicion}</td>
                        </tr>
                    `;
                    });
                    listado.appendChild(tabla);
                } else {
                    listado.innerHTML = '<p>No hay empleados disponibles.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al consultar todos los empleados: ' + error.message);
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnConsultarEmpleadoPorID").addEventListener("click", function () {
        var empleadoID = document.getElementById("consultaEmpleadoID").value;
        if (!empleadoID) {
            alert("Por favor ingrese un ID válido.");
            return;
        }

        fetch(`https://localhost:44356/api/Empleados?empleadoID=${empleadoID}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se encontró el empleado con el ID proporcionado');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    document.getElementById('detEmpleadoID').value = data.EmpleadoID;
                    document.getElementById('detNombre').value = data.Nombre;
                    document.getElementById('detApellido').value = data.Apellido;
                    document.getElementById('detTelefono').value = data.Telefono;
                    document.getElementById('detEmail').value = data.Email;
                    document.getElementById('detSucursalID').value = data.SucursalID;
                    document.getElementById('detPosicion').value = data.Posicion;

                    document.getElementById('detallesEmpleado').style.display = 'block';
                } else {
                    alert('No se encontró un empleado con el ID proporcionado.');
                    document.getElementById('detallesEmpleado').style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al consultar el empleado.');
                document.getElementById('detallesEmpleado').style.display = 'none';
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnEliminarEmpleado").addEventListener("click", function () {
        const empleadoID = document.getElementById("detEmpleadoID").value;
        if (!empleadoID) {
            alert("No se puede eliminar: ID de empleado no disponible.");
            return;
        }

        fetch(`https://localhost:44356/api/Empleados?empleadoID=${empleadoID}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falló la eliminación del empleado: ' + response.statusText);
                }
                return response.text();  // o response.json() si tu API retorna una respuesta en JSON
            })
            .then(data => {
                alert('Empleado eliminado con éxito.');
                document.getElementById('detallesEmpleado').style.display = 'none'; // Ocultar detalles después de eliminar
                // Aquí podrías llamar a otras funciones para actualizar la lista de empleados visualizados, etc.
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al eliminar el empleado: ' + error.message);
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnActualizarEmpleado").addEventListener("click", function () {
        const empleadoID = document.getElementById("detEmpleadoID").value;
        const empleadoData = {
            SucursalID: document.getElementById("detSucursalID").value,
            Nombre: document.getElementById("detNombre").value,
            Apellido: document.getElementById("detApellido").value,
            Telefono: document.getElementById("detTelefono").value,
            Email: document.getElementById("detEmail").value,
            Posicion: document.getElementById("detPosicion").value,
        };

        if (!empleadoID) {
            alert("No se puede actualizar: ID de empleado no disponible.");
            return;
        }

        fetch(`https://localhost:44356/api/Empleados?empleadoID=${empleadoID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falló la actualización del empleado: ' + response.statusText);
                }
                return response.text();  // o response.json() si tu API retorna una respuesta en JSON
            })
            .then(data => {
                alert('Empleado actualizado con éxito.');
                // Aquí podrías llamar a otras funciones para actualizar la lista de empleados visualizados, etc.
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al actualizar el empleado: ' + error.message);
            });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const txtCodigoTipoArticulo = document.getElementById("txtCodigoTipoArticulo");

    txtCodigoTipoArticulo.addEventListener("change", function () {
        const idTipoArticulo = txtCodigoTipoArticulo.value;
        if (idTipoArticulo) {
            fetch(`https://localhost:44369/api/TipoArticulo?idTipoArticulo=${idTipoArticulo}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Rellenar los campos del formulario con los datos obtenidos
                    document.getElementById("txtCodigo").value = data.CodigoSubasta || '';
                    document.getElementById("txtVendedor").value = data.Vendedor || '';
                    document.getElementById("txtComprador").value = data.Comprador || '';
                    document.getElementById("txtValorVenta").value = data.ValorVenta || '';
                    document.getElementById("cboTipoArticulo").value = data.TipoArticulo || '';
                    document.getElementById("txtArticulo").value = data.Articulo || '';
                    document.getElementById("txtFechaInicioSubasta").value = data.FechaInicioSubasta ? new Date(data.FechaInicioSubasta).toISOString().split('T')[0] : '';
                    document.getElementById("txtFechaFinSubasta").value = data.FechaFinSubasta ? new Date(data.FechaFinSubasta).toISOString().split('T')[0] : '';
                    document.getElementById("txtFechaPago").value = data.FechaPago ? new Date(data.FechaPago).toISOString().split('T')[0] : '';
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    document.getElementById("dvMensaje").textContent = 'Error al obtener los datos del tipo de artículo.';
                });
        }
    });
});

