# Sistema de Gestión de Tickets

![Banner de Gestión de Tickets](https://via.placeholder.com/800x200/1a73e8/ffffff?text=Gesti%C3%B3n+de+Tickets)

Una aplicación web elegante y profesional desarrollada en ASP.NET Core para gestionar tickets similar a Jira. Esta aplicación permite crear, editar, eliminar y gestionar tickets con diferentes propiedades como título, descripción, estado, prioridad, persona asignada, cargo, teléfono y correo electrónico.

## 🌟 Características Principales

- **Diseño Elegante en Tonos Azules**: Interfaz moderna y profesional con una paleta de colores azules
- **Gestión Completa de Tickets (CRUD)**: Crear, leer, actualizar y eliminar tickets
- **Asignación de Tickets**: Asignar tickets a personas específicas con información de contacto
- **Seguimiento de Estados**: Pendiente, En Progreso, En Revisión, Completado, Cancelado
- **Gestión de Prioridades**: Baja, Media, Alta, Crítica
- **Interfaz Intuitiva y Responsive**: Diseño adaptable a diferentes dispositivos
- **Validación de Datos Mejorada**: Feedback visual inmediato al usuario
- **Animaciones y Transiciones**: Mejora de la experiencia de usuario
- **Búsqueda y Filtrado**: Búsqueda rápida y filtros para tickets
- **Confirmaciones Elegantes**: Modales de confirmación para acciones destructivas

## 📋 Requisitos Previos

- **.NET 6.0 SDK** o superior
- **SQLite** (incluido en el proyecto, no requiere instalación adicional)
- **Visual Studio 2022**, **Visual Studio Code** con extensiones para C#, o **JetBrains Rider**
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)

## 🚀 Instalación y Configuración

### Opción 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/GestionTickets.git

# Navegar al directorio del proyecto
cd GestionTickets

# Restaurar dependencias
dotnet restore

# Ejecutar migraciones para crear la base de datos
dotnet ef database update

# Ejecutar la aplicación
dotnet run
```

### Opción 2: Descargar y Configurar

1. **Descargar el Código Fuente**:
   - Descargar el archivo ZIP del repositorio
   - Extraer el contenido en una carpeta de su elección

2. **Abrir el Proyecto**:
   - Abrir la solución `GestionTickets.sln` en Visual Studio
   - O abrir la carpeta del proyecto en Visual Studio Code

3. **Restaurar Dependencias**:
   ```bash
   dotnet restore
   ```

4. **Configurar la Base de Datos**:
   - La aplicación utiliza SQLite por defecto, configurada en `appsettings.json`
   - Para cambiar a otro proveedor de base de datos, modificar la cadena de conexión

5. **Aplicar Migraciones**:
   ```bash
   dotnet ef database update
   ```

6. **Restaurar Bibliotecas Cliente**:
   ```bash
   # Instalar LibMan CLI si no está instalado
   dotnet tool install -g Microsoft.Web.LibraryManager.Cli --version 2.1.175

   # Restaurar bibliotecas cliente
   libman restore
   ```

7. **Ejecutar la Aplicación**:
   ```bash
   dotnet run
   ```

8. **Acceder a la Aplicación**:
   - Abrir un navegador y navegar a:
     - http://localhost:5000 (HTTP)
     - https://localhost:5001 (HTTPS)

## 🏗️ Estructura del Proyecto

```
GestionTickets/
├── Controllers/                # Controladores MVC
│   ├── HomeController.cs       # Controlador para la página de inicio
│   └── TicketsController.cs    # Controlador para la gestión de tickets
├── Data/                       # Capa de acceso a datos
│   └── ApplicationDbContext.cs # Contexto de Entity Framework
├── Models/                     # Modelos de datos
│   ├── ErrorViewModel.cs       # Modelo para manejo de errores
│   └── Ticket.cs               # Modelo principal para los tickets
├── Views/                      # Vistas de la aplicación
│   ├── Home/                   # Vistas para el controlador Home
│   ├── Shared/                 # Vistas compartidas y layouts
│   └── Tickets/                # Vistas para la gestión de tickets
├── wwwroot/                    # Archivos estáticos
│   ├── css/                    # Hojas de estilo
│   ├── js/                     # Scripts de JavaScript
│   └── lib/                    # Bibliotecas de terceros
├── appsettings.json            # Configuración de la aplicación
├── GestionTickets.csproj       # Archivo de proyecto .NET
├── Program.cs                  # Punto de entrada de la aplicación
└── README.md                   # Este archivo
```

## 📱 Uso Detallado

### Gestión de Tickets

1. **Listar Tickets**:
   - Navegar a la página principal de tickets para ver todos los tickets existentes
   - Utilizar los filtros rápidos para ver tickets por estado
   - Usar la función de búsqueda para encontrar tickets específicos
   - Ordenar la tabla haciendo clic en los encabezados de columna

2. **Crear Ticket**:
   - Hacer clic en "Crear Nuevo Ticket"
   - Completar el formulario con la información requerida:
     - Título: Descripción breve del ticket
     - Estado: Estado inicial del ticket (por defecto: Pendiente)
     - Prioridad: Importancia del ticket (por defecto: Baja)
     - Descripción: Detalles completos del problema o tarea
     - Información de Asignación: Persona responsable y datos de contacto
   - Hacer clic en "Crear Ticket" para guardar

3. **Ver Detalles**:
   - Hacer clic en el icono de información junto a un ticket
   - Ver toda la información del ticket, incluyendo fechas de creación y actualización
   - La vista de detalles muestra una línea de tiempo con el historial del ticket

4. **Editar Ticket**:
   - Hacer clic en el icono de edición junto a un ticket
   - Modificar los campos necesarios
   - Hacer clic en "Guardar" para actualizar el ticket
   - La fecha de última actualización se actualiza automáticamente

5. **Eliminar Ticket**:
   - Hacer clic en el icono de eliminación junto a un ticket
   - Confirmar la eliminación en el modal de confirmación
   - Esta acción es irreversible

### Estados de Tickets

- **Pendiente** <span style="color:#fbbc05">⬤</span>: El ticket está pendiente de ser atendido
- **En Progreso** <span style="color:#4285f4">⬤</span>: El ticket está siendo trabajado actualmente
- **En Revisión** <span style="color:#0288d1">⬤</span>: El ticket está en fase de revisión
- **Completado** <span style="color:#34a853">⬤</span>: El ticket ha sido resuelto
- **Cancelado** <span style="color:#ea4335">⬤</span>: El ticket ha sido cancelado

### Prioridades

- **Baja** <span style="color:#34a853">⬤</span>: Prioridad baja, puede esperar
- **Media** <span style="color:#0288d1">⬤</span>: Prioridad media, atender cuando sea posible
- **Alta** <span style="color:#fbbc05">⬤</span>: Prioridad alta, atender pronto
- **Crítica** <span style="color:#ea4335">⬤</span>: Prioridad crítica, atender inmediatamente

## 🎨 Personalización Avanzada

La aplicación puede ser personalizada de múltiples formas:

### Estilos y Temas

- **Modificar Colores**: Editar las variables CSS en `wwwroot/css/site.css`:
  ```css
  :root {
    --primary-color: #1a73e8;
    --primary-light: #4285f4;
    --primary-dark: #0d47a1;
    /* Más variables de color... */
  }
  ```

- **Cambiar Fuentes**: Actualizar las referencias de fuentes en `Views/Shared/_Layout.cshtml`

### Funcionalidades JavaScript

- **Añadir Animaciones**: Modificar o extender las funciones en `wwwroot/js/site.js`
- **Personalizar Validaciones**: Ajustar la función `setupFormValidation()` en el archivo JavaScript

### Vistas y Plantillas

- **Modificar Layouts**: Editar `Views/Shared/_Layout.cshtml` para cambios globales
- **Personalizar Formularios**: Actualizar las vistas en `Views/Tickets/`

### Modelo de Datos

- **Añadir Campos**: Extender el modelo `Ticket.cs` con propiedades adicionales
- **Crear Nuevas Entidades**: Añadir modelos relacionados como `Proyecto` o `Usuario`

## 🔄 Actualización y Mantenimiento

Para mantener la aplicación actualizada:

1. **Actualizar Dependencias**:
   ```bash
   dotnet restore
   ```

2. **Actualizar Bibliotecas Cliente**:
   ```bash
   libman restore
   ```

3. **Aplicar Nuevas Migraciones** (si se modifican los modelos):
   ```bash
   dotnet ef migrations add NombreDeLaMigracion
   dotnet ef database update
   ```

## 📊 Características Técnicas

- **Patrón MVC**: Arquitectura Modelo-Vista-Controlador
- **Entity Framework Core**: ORM para acceso a datos
- **SQLite**: Base de datos ligera y portable
- **Bootstrap 5**: Framework CSS para diseño responsive
- **Font Awesome 6**: Iconos vectoriales
- **jQuery**: Biblioteca JavaScript para manipulación del DOM
- **Validación del lado del cliente y servidor**: Garantiza la integridad de los datos

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 📞 Contacto y Soporte

Para preguntas, soporte o contribuciones:

- **Correo Electrónico**: [tu-email@ejemplo.com]
- **GitHub**: [tu-usuario-github]
- **Sitio Web**: [tu-sitio-web.com]

---

<p align="center">
  Desarrollado con ❤️ por [Tu Nombre/Empresa]
</p>
