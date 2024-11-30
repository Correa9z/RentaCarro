//async function Ingresar() {
//    let Email = document.getElementById('txtEmail').value;
//    let Contra = document.getElementById("txtContra").value;

//    DatosLogin =
//    {
//        Email: Email,
//        Contra: Contra
//    }

//    //Invocamos el servicio de empleados de nuestra api, para realizar el proceso de inserción
//    try {
//        const Respuesta = await fetch("http://localhost:44356/Api/Empleados/Ingresar",
//            {
//                method: "POST",
//                mode: "cors",
//                headers: {
//                    "content-type": "application/json",
//                },
//                body: JSON.stringify(DatosLogin)
//            }
//        );
//        const Rpta = await Respuesta.json();
//        alert(Rpta.Error);
//        if (Rpta.length == 0) {
//           /* document.cookie = "token=0;path=/";*/
//            //Hubo un error al procesar el comando
//            $("#dvMensaje").removeClass("alert alert-success");
//            $("#dvMensaje").addClass("alert alert-danger");
//            $("#dvMensaje").html("El usuario no está registrado u olvidó la clave");
//        }
//        else {
//            const extdays = 5;
//            const d = new Date();
//            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
//            let expires = ";expires=" + d.toUTCString();
//            //alert(Rpta[0].Perfil);
//           /* document.cookie = "token=" + Rpta[0].token + expires + ";path=/";*/
//            $("#dvMensaje").removeClass("alert alert-danger");
//            $("#dvMensaje").addClass("alert alert-success");
///*            $("#dvMensaje").html(Rpta[0].Autenticado);*/
//            window.location.href = Rpta[0].PaginaNevagar;
//        }
//    }
//    catch (error) {
//        $("#dvMensaje").removeClass("alert alert-success");
//        $("#dvMensaje").addClass("alert alert-danger");
//        $("#dvMensaje").html(error);
//    }
//}
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    Ingresar();
});

async function Ingresar() {
    let Email = document.getElementById('txtEmail').value;
    let Contra = document.getElementById("txtContra").value;

    const DatosLogin = {
        Email: Email,
        Contra: Contra
    };

    try {
        const response = await fetch("https://localhost:44356/api/Empleados/Ingresar", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(DatosLogin)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            showMessage("El usuario no está registrado u olvidó la clave", "danger");
        } else {
            const extdays = 5;
            const d = new Date();
            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
            const expires = ";expires=" + d.toUTCString();
            document.cookie = "token=" + data[0].token + expires + ";path=/";
            showMessage("Login successful!", "success");
            window.location.href = data[0].PaginaNavegar;
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        showMessage("Ocurrió un error durante la solicitud. Por favor, inténtalo de nuevo más tarde.", "danger");
    }
}

function showMessage(message, type) {
    const dvMensaje = document.getElementById("dvMensaje");
    dvMensaje.className = ""; // Clear existing classes
    dvMensaje.classList.add("alert", `alert-${type}`);
    dvMensaje.textContent = message;
}

















//document.getElementById('loginForm').addEventListener('submit', async function (event) {
//    event.preventDefault(); // Previene la recarga de la página

//    let Email = document.getElementById('txtEmail').value;
//    let Contra = document.getElementById('txtContra').value;

//    let DatosLogin = {
//        Email: Email,
//        Contra: Contra
//    };

//    //Invocamos el servicio de empleados de nuestra api, para realizar el proceso de inserción
//    try {
//        const Respuesta = await fetch("http://localhost:44356/Api/Empleados/Ingresar ", {
//            method: "POST",
//            mode: "cors",
//            headers: {
//                "content-type": "application/json",
//            },
//            body: JSON.stringify(DatosLogin)
//        });
//        const Rpta = await Respuesta.json();
//        //alert(Rpta.Error);
//        if (Rpta.length == 0) {
//            document.cookie = "token=0;path=/";
//            Hubo un error al procesar el comando
//            $("#dvMensaje").removeClass("alert alert-success");
//            $("#dvMensaje").addClass("alert alert-danger");
//            $("#dvMensaje").html("El usuario no está registrado u olvidó la clave");
//        } else {
//            const extdays = 5;
//            const d = new Date();
//            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
//            let expires = ";expires=" + d.toUTCString();
//            //alert(Rpta[0].Perfil);
//            document.cookie = "token=" + Rpta[0].token + expires + ";path=/";
//            $("#dvMensaje").removeClass("alert alert-danger");
//            $("#dvMensaje").addClass("alert alert-success");
//            $("#dvMensaje").html(Rpta[0].Autenticado);
//            window.location.href = Rpta[0].PaginaNavegar;
//        }
//    } catch (error) {
//        $("#dvMensaje").removeClass("alert alert-success");
//        $("#dvMensaje").addClass("alert alert-danger");
//        $("#dvMensaje").html(error);
//    }
//});
