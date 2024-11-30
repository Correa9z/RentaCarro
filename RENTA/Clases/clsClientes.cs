using RENTA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RENTA.Clases

{
    public class LoginRequesta
    {
        public string Email { get; set; }
        public string Contra { get; set; }
    }

    public class LoginRespuestas
    {
        public int ClienteID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string DNI { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string Direccion { get; set; }
        public string Contra { get; set; }

    }
    public class clsClientes
    {

        private RentaEntities4 renta = new RentaEntities4();
        public LoginRequesta login { get; set; }
        public IQueryable Ingresar()
        {
            if (login == null)
                //throw new HttpResponseException(HttpStatusCode.BadRequest);
                return null;

            return ConsultarUsuario();
        }
        private bool ValidarUsuario()
        {
            //clsCypher cypher = new clsCypher();
            Clientes _cliente = renta.Clientes.FirstOrDefault(u => u.Email == login.Email);
            if (_cliente == null)
                return false;

            byte[] storedSaltBytes = Convert.FromBase64String(_cliente.Salt);
            //string PasswordCifrado = cypher.HashPassword(login.Contra, storedSaltBytes);
            login.Contra = login.Contra;
            return true;
        }
        private IQueryable<LoginRespuestas> ConsultarUsuario()
        {
            if (!ValidarUsuario())
                return null;

            //string Token = TokenGenerator.GenerateTokenJwt(login.Username);
            return from usu in renta.Set<Clientes>()
                   where usu.Email == login.Email &&
                         usu.Contra == login.Contra

                   select new LoginRespuestas
                   {
                       ClienteID = usu.ClienteID,
                       //token = "",//Token,
                       Nombre = usu.Nombre,
                       Apellido = usu.Apellido,
                       DNI = usu.DNI,
                       Telefono = usu.Telefono,
                       Email = login.Email,
                       Contra = login.Contra,
                   };

        }
    }


          
        }
