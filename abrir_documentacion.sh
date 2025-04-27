#!/bin/bash

# Script para abrir la documentación técnica en el navegador predeterminado

echo "Abriendo documentación técnica de GestionTickets..."

# Detectar el sistema operativo
case "$(uname -s)" in
   Darwin)
     # macOS
     open Documentacion_Tecnica_GestionTickets.html
     ;;
   Linux)
     # Linux
     if command -v xdg-open > /dev/null; then
       xdg-open Documentacion_Tecnica_GestionTickets.html
     else
       echo "No se pudo abrir el navegador automáticamente. Por favor, abra el archivo manualmente:"
       echo "Documentacion_Tecnica_GestionTickets.html"
     fi
     ;;
   CYGWIN*|MINGW*|MSYS*)
     # Windows
     start Documentacion_Tecnica_GestionTickets.html
     ;;
   *)
     # Otro sistema operativo
     echo "No se pudo detectar el sistema operativo. Por favor, abra el archivo manualmente:"
     echo "Documentacion_Tecnica_GestionTickets.html"
     ;;
esac

echo "Si los diagramas no se muestran correctamente, asegúrese de tener conexión a internet."
echo "También puede ver la documentación en formato Markdown abriendo el archivo:"
echo "Documentacion_Tecnica_GestionTickets.md"
