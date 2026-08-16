MARCADORES · FLIP 7 + LA CUENTA
===============================

Una sola PWA (app web instalable) con dos marcadores:
- Flip 7
- La Cuenta

La pantalla principal es index.html. Los dos juegos conservan su propia partida e historial mediante localStorage.
El service worker de la raíz permite usar la app sin conexión después de la primera carga correcta.

INSTALACIÓN RECOMENDADA
-----------------------
1. Publica el CONTENIDO de esta carpeta en un sitio HTTPS (por ejemplo GitHub Pages).
2. Abre la URL raíz en Safari en el iPhone.
3. Pulsa Compartir.
4. Elige "Añadir a pantalla de inicio".
5. Activa "Abrir como app" si aparece y pulsa Añadir.
6. Usa el único icono "Marcadores" para entrar a Flip 7 o La Cuenta.

IMPORTANTE
----------
No abras index.html directamente desde la app Archivos del iPhone: para que la PWA y el modo offline funcionen correctamente necesita servirse desde HTTPS.

Los datos de las partidas se guardan solo en el navegador/dispositivo. Si se borran los datos de Safari, se perderán salvo que antes se haya usado la función de exportar copia disponible en cada juego.
