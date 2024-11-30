using RENTA.Clases;
using RENTA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RENTA.Controllers
{
    public class TiposDeVehiculosController : ApiController
    {
        [EnableCors(origins: "http://localhost:61531", headers: "*", methods: "*")]
        public string Post([FromBody] TiposDeVehiculos tipos_)
        {
            clsTiposDeVehiculos  _tipos = new clsTiposDeVehiculos();
            _tipos.tiposDeVehiculos = tipos_;
            return _tipos.Insertar(tipos_);
        }
        public List<TiposDeVehiculos> Get()
        {
            clsTiposDeVehiculos _tipos = new clsTiposDeVehiculos();
            return _tipos.ConsultarTodo();
        }
        public TiposDeVehiculos Get(int TipoVehiculoID)
        {
            clsTiposDeVehiculos _tipos = new clsTiposDeVehiculos();
            return _tipos.ConsultaID(TipoVehiculoID);
        }
        public string Put(int TipoVehiculoID, [FromBody] TiposDeVehiculos tipos_)
        {
            clsTiposDeVehiculos _tipos = new clsTiposDeVehiculos();
            if (_tipos.Modificar(TipoVehiculoID,tipos_.Descripcion))
            {
                return "Tipo de vehículo actualizado correctamente.";
            }
            else
            {
                return "Tipo de vehículo no encontrado para actualizar.";
            }
        }
        public string Delete(int TipoVehiculoID)
        {
            clsTiposDeVehiculos _tipos = new clsTiposDeVehiculos();

            return _tipos.Eliminar(TipoVehiculoID);
        }



    }
}
