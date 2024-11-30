//using RENTA.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace RENTA.Clases
//{
//    public class LoginRequest
//    {
//        public string Email { get; set; }
//        public string Contra { get; set; }
//    }

//    public class LoginRespuesta
//    {
//        public int EmpleadoID { get; set; }
//        public Nullable<int> SucursalID { get; set; }
//        public string Nombre { get; set; }
//        public string Apellido { get; set; }
//        public string Telefono { get; set; }
//        public string Email { get; set; }
//        public string Posicion { get; set; }
//        public string Contra { get; set; }
//        public string PaginaNavegar { get; set; }

//    }
//    public class clsEmpleados
//    {
//        private RentaEntities4 renta = new RentaEntities4();
//        public LoginRequest login { get; set; }
//        public IQueryable Ingresar()
//        {
//            if (login == null)
//                //throw new HttpResponseException(HttpStatusCode.BadRequest);
//                return null;

//            return ConsultarUsuario();
//        }
//        private bool ValidarUsuario()
//        {

//            //clsCypher cypher = new clsCypher();
//            Empleados _empleado = renta.Empleados.FirstOrDefault(u => u.Email == login.Email);
//            if (_empleado == null)
//                return false;

//            //byte[] storedSaltBytes = Convert.FromBase64String("1");
//            //string PasswordCifrado = cypher.HashPassword(login.Contra, storedSaltBytes);
//            login.Contra = login.Contra;
//            return true;
//        }
//        private IQueryable<LoginRespuesta> ConsultarUsuario()
//        {
//            if (!ValidarUsuario())
//                return null;

//            //string Token = TokenGenerator.GenerateTokenJwt(login.Username);
//            return from usu in renta.Set<Empleados>()
//                   where usu.Email == login.Email &&
//                         usu.Contra == login.Contra

//                   select new LoginRespuesta
//                   {
//                       EmpleadoID = usu.EmpleadoID,
//                       //token = "",//Token,
//                       SucursalID = usu.SucursalID,
//                       Nombre = usu.Nombre,
//                       Apellido = usu.Apellido,
//                       Telefono = usu.Telefono,
//                       Email = login.Email,
//                       Posicion = usu.Posicion,
//                       Contra = login.Contra,
//                       PaginaNavegar = "Menu.html",
//                   };


//        }
//    }
//}
using RENTA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RENTA.Clases
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Contra { get; set; }
    }

    public class LoginRespuesta
    {
        public int EmpleadoID { get; set; }
        public Nullable<int> SucursalID { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string Posicion { get; set; }
        public string Contra { get; set; }
        public string PaginaNavegar { get; set; }
    }

    public class clsEmpleados
    {
        private RentaEntities4 renta = new RentaEntities4();
        public LoginRequest login { get; set; }

        public IQueryable<LoginRespuesta> Ingresar()
        {
            if (login == null)
            {
                return null;
            }

            return ConsultarUsuario();
        }

        private bool ValidarUsuario()
        {
            Empleados empleado = renta.Empleados.FirstOrDefault(u => u.Email == login.Email);
            if (empleado == null || empleado.Contra != login.Contra)
            {
                return false;
            }

            return true;
        }

        private IQueryable<LoginRespuesta> ConsultarUsuario()
        {
            if (!ValidarUsuario())
            {
                return null;
            }

            return from usu in renta.Set<Empleados>()
                   where usu.Email == login.Email &&
                         usu.Contra == login.Contra
                   select new LoginRespuesta
                   {
                       EmpleadoID = usu.EmpleadoID,
                       SucursalID = usu.SucursalID,
                       Nombre = usu.Nombre,
                       Apellido = usu.Apellido,
                       Telefono = usu.Telefono,
                       Email = usu.Email,
                       Posicion = usu.Posicion,
                       Contra = usu.Contra,
                       PaginaNavegar = "Menu.html",
                   };
        }
    }
}
