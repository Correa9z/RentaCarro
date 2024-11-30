document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnConsultar").addEventListener("click", function () {
        const idTipoArticulo = document.getElementById("cboTipoArticulo").value;

        if (!idTipoArticulo) {
            alert("Seleccione un tipo de artículo.");
            return;
        }

        fetch(`https://localhost:44369/api/TipoArticulo?idTipoArticulo=${idTipoArticulo}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al consultar el tipo de artículo.');
                }
                return response.json();
            })
            .then(tipoArticulo => {
                console.log('Datos del TipoArticulo:', tipoArticulo);
                // Asignar los datos obtenidos a los campos del formulario
                document.getElementById("txtArticulo").value = tipoArticulo.Nombre;
                // Puedes agregar más campos aquí si es necesario
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("dvMensaje").textContent = `Error al consultar los datos: ${error.message}`;
            });
    });

    document.getElementById("btnInsertar").addEventListener("click", function () {
        const codigoSubasta = document.getElementById("txtCodigo").value;
        const codigoTipoArticulo = document.getElementById("cboTipoArticulo").value;
        const vendedor = document.getElementById("txtVendedor").value;
        const comprador = document.getElementById("txtComprador").value;
        const valorVenta = document.getElementById("txtValorVenta").value;
        const articulo = document.getElementById("txtArticulo").value;
        const fechaInicioSubasta = document.getElementById("txtFechaInicioSubasta").value;
        const fechaFinSubasta = document.getElementById("txtFechaFinSubasta").value;
        const fechaPago = document.getElementById("txtFechaPago").value;

        if (!codigoSubasta || !codigoTipoArticulo || !vendedor || !comprador || !valorVenta || !articulo || !fechaInicioSubasta || !fechaFinSubasta || !fechaPago) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const subastaData = {
            idTipoArticulo: codigoTipoArticulo,
            Articulo: articulo,
            Vendedor: vendedor,
            Comprador: comprador,
            ValorVenta: valorVenta,
            FechaInicioSubasta: fechaInicioSubasta,
            FechaFinSubasta: fechaFinSubasta,
            FechaPago: fechaPago
        };

        fetch('https://localhost:44369/api/Subasta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subastaData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al insertar la subasta.');
                }
                return response.json();
            })
            .then(subastaResult => {
                console.log('Subasta Insertada:', subastaResult);
                document.getElementById("dvMensaje").textContent = 'Datos insertados correctamente en la tabla Subasta.';
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("dvMensaje").textContent = `Error al insertar los datos: ${error.message}`;
            });
    });

    document.getElementById("btnActualizar").addEventListener("click", function () {
        const codigoSubasta = document.getElementById("txtCodigo").value;
        const codigoTipoArticulo = document.getElementById("cboTipoArticulo").value;
        const vendedor = document.getElementById("txtVendedor").value;
        const comprador = document.getElementById("txtComprador").value;
        const valorVenta = document.getElementById("txtValorVenta").value;
        const articulo = document.getElementById("txtArticulo").value;
        const fechaInicioSubasta = document.getElementById("txtFechaInicioSubasta").value;
        const fechaFinSubasta = document.getElementById("txtFechaFinSubasta").value;
        const fechaPago = document.getElementById("txtFechaPago").value;

        if (!codigoSubasta || !codigoTipoArticulo || !vendedor || !comprador || !valorVenta || !articulo || !fechaInicioSubasta || !fechaFinSubasta || !fechaPago) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const subastaData = {
            idSubasta: codigoSubasta,
            idTipoArticulo: codigoTipoArticulo,
            Articulo: articulo,
            Vendedor: vendedor,
            Comprador: comprador,
            ValorVenta: valorVenta,
            FechaInicioSubasta: fechaInicioSubasta,
            FechaFinSubasta: fechaFinSubasta,
            FechaPago: fechaPago
        };

        fetch(`https://localhost:44369/api/Subasta?idSubasta=${codigoSubasta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subastaData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la subasta.');
                }
                return response.json();
            })
            .then(subastaResult => {
                console.log('Subasta Actualizada:', subastaResult);
                document.getElementById("dvMensaje").textContent = 'Datos actualizados correctamente en la tabla Subasta.';
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("dvMensaje").textContent = `Error al actualizar los datos: ${error.message}`;
            });
    });
});
