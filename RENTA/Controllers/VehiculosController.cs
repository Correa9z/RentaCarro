using RENTA.Clases;
using RENTA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace RENTA.Controllers
{
    public class VehiculosController : ApiController
    {
        [EnableCors(origins: "http://localhost:61531", headers: "*", methods: "*")]
        public string Post(int TipoVehiculoID,[FromBody] Vehiculos vehiculo)
        {

            clsVehiculos vehiculo_ = new clsVehiculos();
            return vehiculo_.Insertar(TipoVehiculoID,vehiculo);
        }

        public string Put(int tipoVehiculoID, [FromBody] Vehiculos vehiculo)
        {
            clsVehiculos _Vehiculos = new clsVehiculos();
            if (vehiculo == null)
            {
                return "Datos del vehículo son inválidos.";
            }

            // Asegúrate de que los campos que requieren ser enteros sean convertidos a int correctamente
            bool resultado = _Vehiculos.Modificar(
                tipoVehiculoID,
                vehiculo.Marca,
                vehiculo.Modelo,
                vehiculo.Estado,
                (int)vehiculo.TarifaQuincenal, // Asumiendo que este ya es int como debería ser
               (int) vehiculo.SucursalID,      // Asumiendo que este ya es int como debería ser
                vehiculo.NumeroPlaca,     // Si esto no es un int, necesitas ajustar tu modelo o convertirlo
               (int) vehiculo.Ano              // Asumiendo que este ya es int como debería ser
            );

            if (resultado)
            {
                return "Vehículo actualizado correctamente.";
            }
            else
            {
                return "Vehículo no encontrado para actualizar.";
            }
        }




        public string Delete(int tipoVehiculoID)
        {
            clsVehiculos vehiculo = new clsVehiculos();
            return vehiculo.Eliminar(tipoVehiculoID);
        }
    }
}
