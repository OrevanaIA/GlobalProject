using System;
using System.ComponentModel.DataAnnotations;

namespace GestionTickets.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio")]
        [StringLength(100, ErrorMessage = "El título no puede exceder los 100 caracteres")]
        [Display(Name = "Título")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria")]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "El estado es obligatorio")]
        [Display(Name = "Estado")]
        public EstadoTicket Estado { get; set; }

        [Required(ErrorMessage = "La prioridad es obligatoria")]
        [Display(Name = "Prioridad")]
        public PrioridadTicket Prioridad { get; set; }

        [Required(ErrorMessage = "La persona asignada es obligatoria")]
        [StringLength(100, ErrorMessage = "El nombre no puede exceder los 100 caracteres")]
        [Display(Name = "Persona Asignada")]
        public string PersonaAsignada { get; set; }

        [Required(ErrorMessage = "El cargo es obligatorio")]
        [StringLength(100, ErrorMessage = "El cargo no puede exceder los 100 caracteres")]
        [Display(Name = "Cargo")]
        public string Cargo { get; set; }

        [Required(ErrorMessage = "El número de teléfono es obligatorio")]
        [Phone(ErrorMessage = "Formato de teléfono inválido")]
        [Display(Name = "Teléfono")]
        public string Telefono { get; set; }

        [Required(ErrorMessage = "El correo electrónico es obligatorio")]
        [EmailAddress(ErrorMessage = "Formato de correo electrónico inválido")]
        [Display(Name = "Correo Electrónico")]
        public string Email { get; set; }

        [Display(Name = "Fecha de Creación")]
        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        [Display(Name = "Última Actualización")]
        public DateTime? UltimaActualizacion { get; set; }
    }

    public enum EstadoTicket
    {
        [Display(Name = "Pendiente")]
        Pendiente,
        
        [Display(Name = "En Progreso")]
        EnProgreso,
        
        [Display(Name = "En Revisión")]
        EnRevision,
        
        [Display(Name = "Completado")]
        Completado,
        
        [Display(Name = "Cancelado")]
        Cancelado
    }

    public enum PrioridadTicket
    {
        [Display(Name = "Baja")]
        Baja,
        
        [Display(Name = "Media")]
        Media,
        
        [Display(Name = "Alta")]
        Alta,
        
        [Display(Name = "Crítica")]
        Critica
    }
}
