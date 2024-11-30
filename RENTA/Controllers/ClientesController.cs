using RENTA.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RENTA.Controllers
{
    [EnableCors(origins: "http://localhost:61531", headers: "*", methods: "*")]
    [AllowAnonymous]
    [RoutePrefix("api/Clientes")]
    public class ClientesController : ApiController
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
        public IQueryable Ingresar(LoginRequesta Clientes)
        {
            clsClientes _clientes = new clsClientes();
            _clientes.login = Clientes;
            return _clientes.Ingresar();
        }
        [HttpPost]
        [Route("loginWin")]
        public IQueryable loginWin(string Email, string Contra)
        {
            LoginRequesta login = new LoginRequesta();
            login.Email = Email;
            login.Contra = Contra;
            clsClientes _clientes = new clsClientes();
            _clientes.login = login;
            return _clientes.Ingresar();
        }


    }
}
