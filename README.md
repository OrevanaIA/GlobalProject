# Sistema de Gestión de Tickets - Documentación Técnica

## Resumen

Este repositorio contiene un sistema de gestión de tickets desarrollado en ASP.NET Core 6.0. El sistema permite la creación, seguimiento, actualización y resolución de tickets de soporte o incidencias, proporcionando una interfaz intuitiva y funcional para los usuarios.

## Documentación Técnica

La documentación técnica completa está disponible en los siguientes formatos:

- **Markdown**: [Documentacion_Tecnica_GestionTickets.md](Documentacion_Tecnica_GestionTickets.md)
- **HTML**: [Documentacion_Tecnica_GestionTickets.html](Documentacion_Tecnica_GestionTickets.html)

Para visualizar correctamente los diagramas en la documentación HTML, asegúrese de tener conexión a internet, ya que se utiliza la biblioteca Mermaid.js para renderizar los diagramas.

### Acceso a la documentación

Hay varias formas de acceder a la documentación:

1. **Página de inicio**: Abra el archivo `index.html` en su navegador para acceder a una página de inicio con enlaces a toda la documentación.

2. **Scripts para abrir la documentación**:
   - **Linux/macOS**: Ejecute `./abrir_documentacion.sh` en la terminal
   - **Windows**: Haga doble clic en `abrir_documentacion.bat`

3. **Acceso directo a los archivos**:
   - **Markdown**: [Documentacion_Tecnica_GestionTickets.md](Documentacion_Tecnica_GestionTickets.md)
   - **HTML**: [Documentacion_Tecnica_GestionTickets.html](Documentacion_Tecnica_GestionTickets.html)

## Contenido de la Documentación

La documentación técnica incluye:

1. **Introducción**: Visión general del sistema y propósito de la documentación.
2. **Diseño Detallado**: Modelo de dominio, diagramas de clases y de base de datos.
3. **Flujo de Trabajo**: Diagramas de flujo y casos de uso principales.
4. **Implementación Técnica**: Arquitectura, tecnologías utilizadas y estructura del proyecto.
5. **Patrones de Diseño**: Descripción de los patrones implementados (MVC, Repository, Dependency Injection).
6. **API Reference**: Controladores, endpoints y modelos de datos.
7. **Seguridad**: Autenticación, autorización, protección de datos y validación de entradas.
8. **Rendimiento y Escalabilidad**: Optimizaciones, estrategias de caché y escalabilidad.
9. **Pruebas de Calidad**: Estrategia de pruebas, cobertura y automatización.
10. **Despliegue y Operaciones**: Entornos, CI/CD y monitoreo.
11. **Mantenimiento y Roadmap**: Gestión de versiones, roadmap de funcionalidades y deuda técnica.

## Estructura del Proyecto

```
GestionTickets/
├── Controllers/                # Controladores MVC
│   ├── HomeController.cs       # Controlador para la página principal
│   └── TicketsController.cs    # Controlador para la gestión de tickets
├── Data/                       # Capa de acceso a datos
│   └── ApplicationDbContext.cs # Contexto de EF Core
├── Models/                     # Modelos de dominio
│   ├── ErrorViewModel.cs       # Modelo para manejo de errores
│   └── Ticket.cs               # Modelo principal de Ticket
├── Views/                      # Vistas Razor
│   ├── Home/                   # Vistas del controlador Home
│   ├── Shared/                 # Vistas compartidas (layouts, etc.)
│   └── Tickets/                # Vistas para la gestión de tickets
├── wwwroot/                    # Recursos estáticos
│   ├── css/                    # Hojas de estilo
│   ├── js/                     # Scripts JavaScript
│   └── lib/                    # Bibliotecas de terceros
├── Migrations/                 # Migraciones de EF Core
├── GestionTickets.Tests/       # Proyecto de pruebas
│   ├── HomeControllerTests.cs  # Pruebas para HomeController
│   ├── TicketModelTests.cs     # Pruebas para el modelo Ticket
│   └── TicketsControllerTests.cs # Pruebas para TicketsController
├── Program.cs                  # Punto de entrada y configuración
└── appsettings.json            # Configuración de la aplicación
```

## Tecnologías Utilizadas

- **Backend**:
  - ASP.NET Core 6.0
  - Entity Framework Core 6.0
  - ASP.NET Core Identity
  - SQLite

- **Frontend**:
  - Razor Views
  - Bootstrap 5
  - jQuery
  - Font Awesome

- **Herramientas de Desarrollo**:
  - Visual Studio / Visual Studio Code
  - Git
  - xUnit
  - Moq

## Cómo Ejecutar el Proyecto

1. Asegúrese de tener instalado .NET 6.0 SDK
2. Clone el repositorio
3. Navegue a la carpeta del proyecto
4. Ejecute los siguientes comandos:

```bash
dotnet restore
dotnet build
dotnet run
```

5. Abra un navegador y vaya a `https://localhost:5001` o `http://localhost:5000`

## Pruebas

Para ejecutar las pruebas, utilice el siguiente comando:

```bash
dotnet test
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrese de seguir las convenciones de código y añadir pruebas para las nuevas funcionalidades.
