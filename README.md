# ⏩ YouTube Speed Controller (Extension)

**Extensión de Chrome para acelerar videos de YouTube más allá del límite nativo.**

Este proyecto es un prototipo funcional creado para superar la restricción predeterminada de velocidad de reproducción de YouTube (2x). Permite al usuario controlar la velocidad de cualquier video HTML5 en YouTube de manera granular, alcanzando hasta **5x**, ideal para consumir contenido educativo o conferencias largas en menos tiempo.

## 📋 Características Principales

### 🚀 Control de Reproducción Extendido
* **Rango Ampliado:** Permite ajustar la velocidad desde **0.1x** hasta **5.0x**, rompiendo el límite estándar de 2x que ofrece la interfaz nativa.
* **Ajuste Fino:** Utiliza un control deslizante (*slider*) con incrementos de **0.1**, lo que permite encontrar el ritmo exacto de escucha deseado.

### 🌐 Internacionalización y Persistencia
* **Soporte Bilingüe:** Detecta automáticamente el idioma del navegador o permite cambiar manualmente entre **Inglés (en)** y **Español (es)**, actualizando la interfaz al instante.
* **Memoria de Configuración:** Guarda la última velocidad seleccionada en el `localStorage`, por lo que no es necesario reajustarla cada vez que se abre el popup.

### 🛠️ Arquitectura Técnica (Manifest V3)
* **Scripting Injection:** Utiliza la API `chrome.scripting` para inyectar código directamente en el contexto de la pestaña activa de YouTube, modificando la propiedad `.playbackRate` del elemento `<video>`.
* **Service Worker:** Emplea un `background.js` como Service Worker para escuchar los mensajes desde la interfaz emergente (popup) y ejecutar las acciones de control de forma segura y eficiente.

## 📂 Estructura del Proyecto

* `manifest.json`: Definición de la extensión. Declara permisos (`activeTab`, `scripting`) y define el alcance (`*://*.youtube.com/*`).
* `popup.html`: Interfaz gráfica con el slider y el selector de idioma.
* `popup.js`: Lógica de la UI. Gestiona eventos del slider, traducciones y comunicación con el background.
* `background.js`: El cerebro lógico que ejecuta el cambio de velocidad en la página web.

## 🚀 Instalación (Modo Desarrollador)

1.  Descarga el código fuente.
2.  Abre Google Chrome y ve a `chrome://extensions/`.
3.  Activa el **"Modo de desarrollador"** (esquina superior derecha).
4.  Haz clic en **"Cargar descomprimida"** y selecciona la carpeta `YouTubeSpeedController`.
5.  Abre cualquier video de YouTube y usa el icono de la extensión para acelerarlo.

## ⚙️ Configuración (Hardcoded)

El enlace de donación está integrado directamente en el HTML. Si deseas modificarlo o eliminarlo, edita el archivo `popup.html`:

```html
<a target='_blank' href='[https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_AQUI](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TU_ID_AQUI)'>
