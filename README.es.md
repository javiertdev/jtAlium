# jtAlium

![jtAlium](https://s6.imgcdn.dev/YKt5ke.png)

¡Una extensión que alumbrará el camino de tus desarrollos!

Lee esto en [Inglés](https://github.com/javiertdev/jtAlium/blob/main/README.md)

## Features

### Workspace Color

![jtAlium - Workspace Color](https://s6.imgcdn.dev/YKt1jV.png)

Personaliza el color de la barra superior de tu espacio de trabajo. Muy util cuando tienes distintos proyectos en varias ventanas.
Todo esto sin cambiar el tema que te gusta, solo ajusta lo necesario en el lugar necesario.

![Workspace Color](https://s6.imgcdn.dev/YKWp5a.png)

#### Utilidades principales:
- **Seleccionar temas predefinidos**: Haz click en los cuadrados de colores para aplicar temas listos.
- **Aplicar colores personalizados**: Usa los selectores de color para fondo y texto, luego presiona "Apply custom colors".
- **Remover personalización**: Haz click en el botón "×" para quitar cualquier personalización aplicada.

#### Cómo usar:
1. Abre la vista "Workspace Color" desde el panel lateral de jtAlium
2. Selecciona un tema predefinido haciendo click en uno de los cuadrados de colores
3. O ajusta colores personalizados usando los inputs de color para el background, el text y luego presiona "Apply custom colors"
4. Para remover la personalización, haz click en el botón "×"

![Workspace Color](https://s6.imgcdn.dev/YKWoDL.png)

### Hide Resources

![jtAlium](https://s6.imgcdn.dev/YKtPFM.png)

Gestiona fácilmente qué archivos y carpetas quieres ocultar del explorador de VSCode. Perfecto para mantener tu workspace limpio ocultando archivos innecesarios como `node_modules`, archivos temporales, o cualquier elemento que no quieras ver.

> **Nota importante**: Esta funcionalidad solo oculta los archivos del explorador de VSCode. Los archivos *"físicos"* **no se eliminan** ni se modifican de ninguna manera, solo se ocultan visualmente para mantener una vista más limpia del proyecto.

#### Utilidades principales:
- **Agregar archivos/carpetas**: Escribe la ruta en el input y presiona "Add" o Enter.
- **Lista de archivos ocultos**: Ve todos los archivos/carpetas que has ocultado.
- **Desocultar individualmente**: Click en la "×" al lado de cada elemento para desocultarlo.
- **Desocultar todos**: Botón "Unhide All" para desocultar todos los elementos de una vez.
- **Abrir archivos**: Click en el nombre de un archivo para abrirlo directamente.
- **Menú contextual**: Click derecho en cualquier archivo/carpeta del explorador para ocultarlo rápidamente.

#### Cómo usar:
1. Abre la vista "Hide resources" desde el panel lateral de jtAlium
2. Escribe la ruta del archivo/carpeta que quieres ocultar (ej: `node_modules`, `dist`, `*.keys`)
3. Presiona el botón "Add" o la tecla Enter
4. El elemento desaparecerá del explorador
5. Para desocultar, usa la "×" individual o "Unhide All"

![Hide Resources](https://s6.imgcdn.dev/YKWHeN.png)

#### Menú contextual:
También puedes ocultar archivos directamente desde el explorador:
- Click derecho en cualquier archivo o carpeta
- Selecciona "Hide this file/folder"

![Context Menu](https://s6.imgcdn.dev/YKWgMq.png)

### Package Version Updater

![jtAlium](https://s6.imgcdn.dev/YKtz3h.png)

Gestiona fácilmente las versiones de todos los archivos `package.json` en tu workspace. Perfecto para proyectos con múltiples paquetes (como librerías Angular) donde necesitas mantener sincronizadas las versiones de semantic versioning.

#### Utilidades principales:
- **Escaneo automático**: Encuentra todos los `package.json` en tu workspace, excluyendo carpetas como `node_modules`, `vendor`, `dist`, etc.
- **Orden inteligente**: El `package.json` de la raíz aparece primero, seguido de los demás ordenados alfabéticamente.
- **Controles independientes**: Cada paquete tiene controles separados para Major, Minor y Patch.
- **Actualización en tiempo real**: Los cambios se guardan inmediatamente en los archivos `package.json`.
- **Navegación rápida**: Click en el path del archivo para abrirlo directamente en el editor.

#### Cómo usar:
1. Abre la vista "Package Version Updater" desde el panel lateral de jtAlium
2. Verás todos los `package.json` encontrados en tu workspace
3. Para cada paquete, usa los botones "+" y "-" para incrementar/decrementar Major, Minor o Patch
4. Los cambios se guardan automáticamente en el archivo correspondiente
5. Click en el path del archivo (ej: `package.json` o `projects/utils/package.json`) para abrirlo en el editor

![Package Version Updater](https://s6.imgcdn.dev/YKW8tu.png)

### Package Scripts Manager

![jtAlium](https://s6.imgcdn.dev/YKtl0l.png)

Gestiona todos los scripts de tus archivos `package.json` con facilidad. Perfecto para proyectos con múltiples paquetes donde necesitas crear, editar, ejecutar y eliminar scripts npm de manera eficiente.

#### Utilidades principales:
- **Escaneo automático**: Encuentra todos los `package.json` en tu workspace, excluyendo carpetas como `node_modules`, `vendor`, `dist`, etc.
- **Orden inteligente**: El `package.json` de la raíz aparece primero, seguido de los demás ordenados alfabéticamente.
- **Gestión de scripts**: Crear, editar, ejecutar y eliminar scripts para cada paquete.
- **Ejecutar scripts**: Ejecuta scripts npm directamente desde la interfaz, abriéndose en terminales nuevas.
- **Edición en línea**: Edita comandos de scripts directamente en la interfaz.
- **Agregar scripts**: Crea nuevos scripts con nombres y comandos personalizados.
- **Eliminar scripts**: Remueve scripts con diálogo de confirmación.
- **Package.json limpio**: Elimina automáticamente objetos `scripts` vacíos cuando se elimina el último script.
- **Navegación rápida**: Click en el path del archivo para abrirlo directamente en el editor.

#### Cómo usar:
1. Abre la vista "Package Scripts Manager" desde el panel lateral de jtAlium
2. Verás todos los `package.json` encontrados en tu workspace con sus scripts
3. Para cada script, usa el botón ▶ para ejecutarlo, ✎ para editarlo, o × para eliminarlo
4. Usa el botón "+ Add Script" para crear nuevos scripts
5. Click en el path del archivo (ej: `package.json` o `projects/utils/package.json`) para abrirlo en el editor

![Package Scripts Manager](https://s6.imgcdn.dev/YKWEzB.png)