using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestionTickets.Controllers;
using GestionTickets.Data;
using GestionTickets.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace GestionTickets.Tests
{
    public class TicketsControllerTests
    {
        private ApplicationDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new ApplicationDbContext(options);
            
            // Seed the database with test data
            context.Tickets.Add(new Ticket
            {
                Id = 1,
                Titulo = "Test Ticket 1",
                Descripcion = "Test Description 1",
                Estado = EstadoTicket.Pendiente,
                Prioridad = PrioridadTicket.Media,
                PersonaAsignada = "Test Person 1",
                Cargo = "Test Position 1",
                Telefono = "123456789",
                Email = "test1@example.com",
                FechaCreacion = DateTime.Now.AddDays(-1)
            });

            context.Tickets.Add(new Ticket
            {
                Id = 2,
                Titulo = "Test Ticket 2",
                Descripcion = "Test Description 2",
                Estado = EstadoTicket.EnProgreso,
                Prioridad = PrioridadTicket.Alta,
                PersonaAsignada = "Test Person 2",
                Cargo = "Test Position 2",
                Telefono = "987654321",
                Email = "test2@example.com",
                FechaCreacion = DateTime.Now.AddDays(-2)
            });

            context.SaveChanges();
            
            return context;
        }

        [Fact]
        public async Task Index_ReturnsViewWithTickets()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);

            // Act
            var result = await controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Ticket>>(viewResult.Model);
            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task Details_WithValidId_ReturnsViewWithTicket()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;

            // Act
            var result = await controller.Details(ticketId);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<Ticket>(viewResult.Model);
            Assert.Equal(ticketId, model.Id);
            Assert.Equal("Test Ticket 1", model.Titulo);
        }

        [Fact]
        public async Task Details_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            int? ticketId = null;

            // Act
            var result = await controller.Details(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Details_WithNonExistentId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 999; // Non-existent ID

            // Act
            var result = await controller.Details(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Create_Get_ReturnsView()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);

            // Act
            var result = controller.Create();

            // Assert
            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public async Task Create_Post_WithValidModel_RedirectsToIndex()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticket = new Ticket
            {
                Titulo = "New Test Ticket",
                Descripcion = "New Test Description",
                Estado = EstadoTicket.Pendiente,
                Prioridad = PrioridadTicket.Media,
                PersonaAsignada = "New Test Person",
                Cargo = "New Test Position",
                Telefono = "123123123",
                Email = "newtest@example.com"
            };

            // Act
            var result = await controller.Create(ticket);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectToActionResult.ActionName);
            
            // Verify ticket was added to database
            var addedTicket = await context.Tickets.FirstOrDefaultAsync(t => t.Titulo == "New Test Ticket");
            Assert.NotNull(addedTicket);
            Assert.Equal("New Test Description", addedTicket.Descripcion);
            Assert.NotEqual(default, addedTicket.FechaCreacion);
        }

        [Fact]
        public async Task Create_Post_WithInvalidModel_ReturnsView()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticket = new Ticket(); // Empty ticket will fail validation
            controller.ModelState.AddModelError("Titulo", "Required");

            // Act
            var result = await controller.Create(ticket);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(ticket, viewResult.Model);
        }

        [Fact]
        public async Task Edit_Get_WithValidId_ReturnsViewWithTicket()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;

            // Act
            var result = await controller.Edit(ticketId);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<Ticket>(viewResult.Model);
            Assert.Equal(ticketId, model.Id);
            Assert.Equal("Test Ticket 1", model.Titulo);
        }

        [Fact]
        public async Task Edit_Get_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            int? ticketId = null;

            // Act
            var result = await controller.Edit(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Edit_Get_WithNonExistentId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 999; // Non-existent ID

            // Act
            var result = await controller.Edit(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Edit_Post_WithValidModel_RedirectsToIndex()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;
            var ticket = await context.Tickets.FindAsync(ticketId);
            ticket.Titulo = "Updated Test Ticket";
            ticket.Estado = EstadoTicket.Completado;

            // Act
            var result = await controller.Edit(ticketId, ticket);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectToActionResult.ActionName);
            
            // Verify ticket was updated in database
            var updatedTicket = await context.Tickets.FindAsync(ticketId);
            Assert.Equal("Updated Test Ticket", updatedTicket.Titulo);
            Assert.Equal(EstadoTicket.Completado, updatedTicket.Estado);
            Assert.NotNull(updatedTicket.UltimaActualizacion);
        }

        [Fact]
        public async Task Edit_Post_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;
            var ticket = await context.Tickets.FindAsync(ticketId);
            ticket.Id = 999; // Different ID than the route ID

            // Act
            var result = await controller.Edit(ticketId, ticket);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Edit_Post_WithInvalidModel_ReturnsView()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;
            var ticket = await context.Tickets.FindAsync(ticketId);
            controller.ModelState.AddModelError("Titulo", "Required");

            // Act
            var result = await controller.Edit(ticketId, ticket);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(ticket, viewResult.Model);
        }

        [Fact]
        public async Task Delete_Get_WithValidId_ReturnsViewWithTicket()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;

            // Act
            var result = await controller.Delete(ticketId);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<Ticket>(viewResult.Model);
            Assert.Equal(ticketId, model.Id);
            Assert.Equal("Test Ticket 1", model.Titulo);
        }

        [Fact]
        public async Task Delete_Get_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            int? ticketId = null;

            // Act
            var result = await controller.Delete(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Delete_Get_WithNonExistentId_ReturnsNotFound()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 999; // Non-existent ID

            // Act
            var result = await controller.Delete(ticketId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteConfirmed_WithValidId_RedirectsToIndex()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 1;

            // Act
            var result = await controller.DeleteConfirmed(ticketId);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectToActionResult.ActionName);
            
            // Verify ticket was deleted from database
            var deletedTicket = await context.Tickets.FindAsync(ticketId);
            Assert.Null(deletedTicket);
        }

        [Fact]
        public async Task DeleteConfirmed_WithNonExistentId_RedirectsToIndex()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new TicketsController(context);
            var ticketId = 999; // Non-existent ID

            // Act
            var result = await controller.DeleteConfirmed(ticketId);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Equal("Index", redirectToActionResult.ActionName);
        }
    }
}
