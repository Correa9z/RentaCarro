jQuery(function () {
	$("#dvMenu").load("../Paginas/Menu.html");

	// Activar el evento de click en los botones
	// Con jquery los objetos se identifican con "$(#)" al inicio
	$("#btnInsertar").on("click", function () {
		$("#dvMensaje").html("");
		Insertar();
	});
});

async function Insertar() {

	let Documento = $("#txtDocumento").val();
	let Nombre = $("#txtNombre").val();
	let FechaInicio = $("#txtFechaInicio").val();
	let NumeroViajeros = $("#txtNumeroViajeros").val();
	let NumeroDias = $("#txtNumeroDias").val();
	let Destino = $("#txtDestino").val();

	let DatosPaquete = {
		Documento: Documento,
		Nombre: Nombre,
		FechaInicio: FechaInicio,
		NumeroViajeros: NumeroViajeros,
		NumeroDias: NumeroDias,
		Destino: Destino
	}

	try {
		const Respuesta = await fetch("https://localhost:44308/api/paquete",
		{
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(DatosPaquete)
		});

		const Resultado = await Respuesta.json();
		$("#dvMensaje").html(Resultado);

	} catch (error) {
		$("#dvMensaje").html(error);
	}
}
