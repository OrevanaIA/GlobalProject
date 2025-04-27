using System;
using Xunit;

namespace GestionTickets.Tests
{
    public class SimpleTests
    {
        [Fact]
        public void Test_Addition()
        {
            // Arrange
            int a = 2;
            int b = 3;
            
            // Act
            int result = a + b;
            
            // Assert
            Assert.Equal(5, result);
        }

        [Fact]
        public void Test_String_Comparison()
        {
            // Arrange
            string str1 = "Hello";
            string str2 = "Hello";
            
            // Act & Assert
            Assert.Equal(str1, str2);
        }
    }
}
