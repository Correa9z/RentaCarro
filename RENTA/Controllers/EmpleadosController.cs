//using RENTA.Clases;
//using RENTA.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Threading;
//using System.Web.Http;
//using System.Web.Http.Cors;

//namespace RENTA.Controllers

//{
//    [EnableCors(origins: "http://localhost:61531", headers: "*", methods: "*")]
//    [AllowAnonymous]
//    [RoutePrefix("api/Empleados")]


//    public class EmpleadosController : ApiController
//    {
//        [HttpGet]
//        [Route("echoping")]
//        public IHttpActionResult EchoPing()
//        {
//            return Ok(true);
//        }
//        [HttpGet]
//        [Route("echouser")]
//        public IHttpActionResult EchoUser()
//        {
//            var identity = Thread.CurrentPrincipal.Identity;

//            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
//        }

//        //[HttpPost]
//        //[Route("Ingresar")]
//        //public IQueryable Ingresar(LoginRequest Empleados)
//        //{
//        //    clsEmpleados _empleados = new clsEmpleados();
//        //    _empleados.login = Empleados;
//        //    return _empleados.Ingresar();
//        //}
//        [HttpPost]
//        [Route("Ingresar")]
//        public IHttpActionResult Ingresar(LoginRequest empleados)
//        {
//            clsEmpleados _empleados = new clsEmpleados();
//            _empleados.login = empleados;
//            var resultado = _empleados.Ingresar();
//            if (resultado == null)
//            {
//                return BadRequest("Usuario o contraseña incorrectos.");
//            }
//            return Ok(resultado);
//        }

//        [HttpPost]
//        [Route("loginWin")]
//        public IQueryable loginWin(string Email, string Contra)
//        {
//            LoginRequest login = new LoginRequest();
//            login.Email = Email;
//            login.Contra = Contra;
//            clsEmpleados _empleados = new clsEmpleados();
//            _empleados.login = login;
//            return _empleados.Ingresar();
//        }


//    }
//}
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;
using RENTA.Clases;

[EnableCors(origins: "http://localhost:61531", headers: "*", methods: "*")]
[AllowAnonymous]
[RoutePrefix("api/Empleados")]
public class EmpleadosController : ApiController
{
    [HttpGet]
    [Route("echoping")]
    public IHttpActionResult EchoPing()
    {
        return Ok(true);
    }

    [HttpGet]
    [Route("echouser")]
    public IHttpActionResult EchoUser()
    {
        var identity = Thread.CurrentPrincipal.Identity;
        return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
    }

    [HttpPost]
    [Route("Ingresar")]
    public IHttpActionResult Ingresar(LoginRequest empleados)
    {
        clsEmpleados _empleados = new clsEmpleados();
        _empleados.login = empleados;
        var resultado = _empleados.Ingresar();
        if (resultado == null)
        {
            return BadRequest("Usuario o contraseña incorrectos.");
        }
        return Ok(resultado);
    }

    [HttpPost]
    [Route("loginWin")]
    public IHttpActionResult loginWin(string Email, string Contra)
    {
        LoginRequest login = new LoginRequest
        {
            Email = Email,
            Contra = Contra
        };
        clsEmpleados _empleados = new clsEmpleados();
        _empleados.login = login;
        var resultado = _empleados.Ingresar();
        if (resultado == null)
        {
            return BadRequest("Usuario o contraseña incorrectos.");
        }
        return Ok(resultado);
    }
}
