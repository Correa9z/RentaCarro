using RENTA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RENTA.Clases
{
    public class clsTiposDeVehiculos
    {
       private RentaEntities4 renta = new RentaEntities4();   
       public TiposDeVehiculos tiposDeVehiculos= new TiposDeVehiculos();   

        public string Insertar(TiposDeVehiculos tiposDeVehiculos)
        {
            try 
            {
                renta.TiposDeVehiculos.Add(tiposDeVehiculos);
                renta.SaveChanges();
                return "se agrego tipo de veehiculo: "+tiposDeVehiculos.TipoVehiculoID;

            }catch (Exception ex) 
            {
                return ex.Message;  
            }
        }
        
        public List<TiposDeVehiculos> ConsultarTodo()
        {
            return renta.TiposDeVehiculos.OrderBy(e => e.TipoVehiculoID).ToList();
        }
        public TiposDeVehiculos ConsultaID(int TipoVehiculoID) 
        {
            return renta.TiposDeVehiculos.FirstOrDefault(e => e.TipoVehiculoID == TipoVehiculoID);
        }
        public bool Modificar(int TipoVehiculoID,string nuevaDescripcion) 
        {
            try
            {
                TiposDeVehiculos tiposDeVehiculos = renta.TiposDeVehiculos.FirstOrDefault(tv => tv.TipoVehiculoID == TipoVehiculoID);
                tiposDeVehiculos.Descripcion = nuevaDescripcion;
                renta.SaveChanges();
                return true; 
            }catch(Exception ex) 
            {
                return false;  
            }
        }
        public string Eliminar(int TipoVehiculoID)
        {
            try 
            {
                TiposDeVehiculos tiposDeVehiculos = renta.TiposDeVehiculos.FirstOrDefault(tv => tv.TipoVehiculoID == TipoVehiculoID);
                renta.TiposDeVehiculos.Remove(tiposDeVehiculos);
                renta.SaveChanges();
                return "se elimino tipo de vehiculo";

            }
            catch(Exception ex) 
            {
                return ex.Message;  
            }
        }

        

    }
}