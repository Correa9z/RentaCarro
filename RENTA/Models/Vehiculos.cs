//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RENTA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Vehiculos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Vehiculos()
        {
            this.EventosDeVehiculos = new HashSet<EventosDeVehiculos>();
            this.HistorialDeAccidentes = new HashSet<HistorialDeAccidentes>();
            this.Mantenimientos = new HashSet<Mantenimientos>();
            this.Reservas = new HashSet<Reservas>();
        }
    
        public int VehiculoID { get; set; }
        public Nullable<int> TipoVehiculoID { get; set; }
        public Nullable<int> SucursalID { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public Nullable<int> Ano { get; set; }
        public string NumeroPlaca { get; set; }
        public string Estado { get; set; }
        public Nullable<int> SeguroID { get; set; }
        public Nullable<int> TarifaQuincenal { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EventosDeVehiculos> EventosDeVehiculos { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HistorialDeAccidentes> HistorialDeAccidentes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Mantenimientos> Mantenimientos { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Reservas> Reservas { get; set; }
        public virtual Seguros Seguros { get; set; }
        public virtual Sucursales Sucursales { get; set; }
        public virtual TiposDeVehiculos TiposDeVehiculos { get; set; }
    }
}