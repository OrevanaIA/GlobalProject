using System;
using System.Diagnostics;
using GestionTickets.Controllers;
using GestionTickets.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace GestionTickets.Tests
{
    public class HomeControllerTests
    {
        private Mock<ILogger<HomeController>> _loggerMock;
        private HomeController _controller;

        public HomeControllerTests()
        {
            _loggerMock = new Mock<ILogger<HomeController>>();
            _controller = new HomeController(_loggerMock.Object);
        }

        [Fact]
        public void Index_ReturnsViewResult()
        {
            // Act
            var result = _controller.Index();

            // Assert
            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public void Privacy_ReturnsViewResult()
        {
            // Act
            var result = _controller.Privacy();

            // Assert
            Assert.IsType<ViewResult>(result);
        }

        [Fact]
        public void Error_ReturnsViewWithErrorViewModel()
        {
            // Arrange
            var expectedRequestId = "TestRequestId";
            Activity.Current = new Activity("TestActivity").SetParentId(expectedRequestId);

            // Act
            var result = _controller.Error();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<ErrorViewModel>(viewResult.Model);
            Assert.Equal(expectedRequestId, model.RequestId);
        }

        [Fact]
        public void Error_WithNoActivity_ReturnsViewWithTraceIdentifier()
        {
            // Arrange
            Activity.Current = null;
            var httpContext = new Microsoft.AspNetCore.Http.DefaultHttpContext();
            httpContext.TraceIdentifier = "TestTraceIdentifier";
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = httpContext
            };

            // Act
            var result = _controller.Error();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<ErrorViewModel>(viewResult.Model);
            Assert.Equal("TestTraceIdentifier", model.RequestId);
        }
    }
}
