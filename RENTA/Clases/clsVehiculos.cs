using RENTA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RENTA.Clases
{
    public class clsVehiculos
    {
        private RentaEntities4 renta = new RentaEntities4();
        public Vehiculos vehiculos = new Vehiculos();
        
        public string Insertar(int TipoVehiculoID, Vehiculos vehiculos) 
        {
            try 
            {
                renta.Vehiculos.FirstOrDefault(tv => tv.TipoVehiculoID == TipoVehiculoID);
                renta.Vehiculos.Add( vehiculos );   
                renta.SaveChanges();
                return "se agrego Vehiculos" + vehiculos.Marca;

            }catch (Exception ex) 
            {
                return ex.Message;  
            }
        }
        public string Eliminar(int tipoVehiculoID)
        {
            try
            {
                Vehiculos vehiculos = renta.Vehiculos.FirstOrDefault(tv => tv.TipoVehiculoID == tipoVehiculoID);
                renta.Vehiculos.Remove(vehiculos);
                renta.SaveChanges();
                return "se elimino tipo de vehiculo";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public bool Modificar(int tipoVehiculoID, string nuevaMarca, string nuevoModelo, string nuevoEstado, int nuevaTarifa, int nuevaSucursalID, string nuevaPlaca, int nuevoAno)
        {
            try
            {
                // Buscar el vehículo por TipoVehiculoID
                Vehiculos vehiculo = renta.Vehiculos.FirstOrDefault(tv => tv.TipoVehiculoID == tipoVehiculoID);
                if (vehiculo == null)
                {
                    return false;  // No se encontró ningún vehículo con ese TipoVehiculoID
                }

                // Actualizar los campos del vehículo encontrado
                vehiculo.Marca = nuevaMarca;
                vehiculo.Modelo = nuevoModelo;
                vehiculo.Estado = nuevoEstado;
                vehiculo.TarifaQuincenal = nuevaTarifa;
                vehiculo.SucursalID = nuevaSucursalID;
                vehiculo.NumeroPlaca = nuevaPlaca;
                vehiculo.Ano = nuevoAno;  // Asegurándonos de actualizar el año también

                renta.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Modificar: " + ex.Message);
                return false;
            }
        }
      

    }
}