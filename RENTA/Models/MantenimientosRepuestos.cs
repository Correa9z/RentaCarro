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
    
    public partial class MantenimientosRepuestos
    {
        public int MantenimientoID { get; set; }
        public int RepuestoID { get; set; }
        public Nullable<int> Cantidad { get; set; }
    
        public virtual Mantenimientos Mantenimientos { get; set; }
        public virtual Repuestos Repuestos { get; set; }
    }
}
