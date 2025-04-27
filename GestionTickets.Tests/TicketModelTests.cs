using System;
using GestionTickets.Models;
using Xunit;

namespace GestionTickets.Tests
{
    public class TicketModelTests
    {
        [Fact]
        public void Ticket_DefaultFechaCreacion_ShouldBeCurrentDate()
        {
            // Arrange
            var ticket = new Ticket();
            
            // Act
            var now = DateTime.Now;
            
            // Assert
            Assert.True((now - ticket.FechaCreacion).TotalMinutes < 1);
        }

        [Fact]
        public void Ticket_SetProperties_ShouldRetainValues()
        {
            // Arrange
            var ticket = new Ticket
            {
                Titulo = "Test Ticket",
                Descripcion = "Test Description",
                Estado = EstadoTicket.Pendiente,
                Prioridad = PrioridadTicket.Alta,
                PersonaAsignada = "Test Person",
                Cargo = "Test Position",
                Telefono = "123456789",
                Email = "test@example.com"
            };
            
            // Assert
            Assert.Equal("Test Ticket", ticket.Titulo);
            Assert.Equal("Test Description", ticket.Descripcion);
            Assert.Equal(EstadoTicket.Pendiente, ticket.Estado);
            Assert.Equal(PrioridadTicket.Alta, ticket.Prioridad);
            Assert.Equal("Test Person", ticket.PersonaAsignada);
            Assert.Equal("Test Position", ticket.Cargo);
            Assert.Equal("123456789", ticket.Telefono);
            Assert.Equal("test@example.com", ticket.Email);
        }
    }
}
