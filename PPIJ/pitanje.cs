//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PPIJ
{
    using System;
    using System.Collections.Generic;
    
    public partial class pitanje
    {
        public pitanje()
        {
            this.odgovor = new HashSet<odgovor>();
            this.test_pitanje = new HashSet<test_pitanje>();
        }
    
        public int id_pitanje { get; set; }
        public string pitanje1 { get; set; }
        public Nullable<int> id_slika { get; set; }
        public int id_uputa { get; set; }
        public int id_tema { get; set; }
    
        public virtual ICollection<odgovor> odgovor { get; set; }
        public virtual slika slika { get; set; }
        public virtual tema tema { get; set; }
        public virtual uputa uputa { get; set; }
        public virtual ICollection<test_pitanje> test_pitanje { get; set; }
    }
}