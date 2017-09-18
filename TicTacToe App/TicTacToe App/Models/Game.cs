namespace Game_App.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Game
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string GamePlayed { get; set; }

        [StringLength(50)]
        public string Level { get; set; }

        public int? Duration { get; set; }

        [Required]
        [StringLength(128)]
        public string PlayerID { get; set; }

        [StringLength(50)]
        public string Result { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DatePlayed { get; set; }
    }
}
