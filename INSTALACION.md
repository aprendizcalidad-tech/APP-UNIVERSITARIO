# Instalación paso a paso

## 1. Publicar la demostración en GitHub Pages

1. Crea un repositorio, por ejemplo `universidad-corporativa`, en tu cuenta de GitHub. No subas datos personales ni claves.
2. Abre la carpeta `web` del ZIP y sube **su contenido** al nivel principal del repositorio: `index.html`, `styles.css`, `app.js`, `config.js`, `demo.js` y `favicon.svg`. `index.html` debe quedar directamente en la raíz, no dentro de otra carpeta.
3. En el repositorio abre **Settings → Pages**.
4. Elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
5. Espera a que GitHub termine el despliegue. Abre la dirección que muestra Pages, normalmente `https://TU-USUARIO.github.io/universidad-corporativa/`.
6. Comprueba el ingreso como estudiante y administrador en la demostración.

Alternativa: si subes la estructura completa del proyecto con la carpeta `web` y `.github/workflows/pages.yml`, selecciona **GitHub Actions** en Pages. El flujo incluido publica solo `web`. No mezcles este método con la publicación manual de una raíz que no contiene `index.html`.

## 2. Crear el backend de Google

1. Entra a https://script.google.com/ con la cuenta que administrará la universidad.
2. Crea un proyecto y llámalo `Universidad Corporativa`.
3. Reemplaza el contenido de `Code.gs` por el archivo del mismo nombre de `google-apps-script`.
4. Agrega un archivo de secuencia de comandos llamado `Seed` y pega `Seed.gs`.
5. En **Configuración del proyecto**, activa **Mostrar el archivo de manifiesto appsscript.json en el editor**. Reemplaza ese manifiesto con el del paquete.
6. En **Configuración del proyecto → Propiedades de la secuencia de comandos**, agrega:

| Propiedad | Valor |
|---|---|
| `ADMIN_EMAILS` | Tu correo de administración. Para varios, sepáralos con comas. Ejemplo: `formacion@empresa.com,gestionhumana@empresa.com`. |
| `ALLOWED_DOMAINS` | Opcional: dominio de los empleados, sin `@`, por ejemplo `empresa.com`. Vacío obliga a autorizar cada correo en Administración. |

Evita autorizar dominios de correo público como `gmail.com`: permitirías acceso a cualquier persona de ese dominio. Puedes autorizar correos externos uno por uno desde el panel. Los administradores de `ADMIN_EMAILS` siempre están autorizados para solicitar códigos.

7. Guarda. En la lista de funciones del editor selecciona `instalar` y pulsa **Ejecutar**.
8. Revisa y acepta los permisos solicitados por tu propio proyecto. Si la organización bloquea el proyecto, consulta con el administrador de Google Workspace; no es un error que se solucione cambiando botones del portal.
9. Abre el registro de ejecución. Verás la dirección de la base de datos creada. También se crea la carpeta privada de certificados en Drive y un activador que procesa pendientes cada cinco minutos.
10. `instalar` puede ejecutarse otra vez: reutiliza los recursos configurados y no duplica el activador.

Las propiedades `SPREADSHEET_ID` y `CERTIFICATE_FOLDER_ID` se crean automáticamente. No las borres si quieres conservar los mismos datos.

## 3. Implementar como aplicación web

1. En Apps Script pulsa **Implementar → Nueva implementación**.
2. Selecciona **Aplicación web**.
3. En **Ejecutar como**, selecciona **Yo** (la cuenta administradora).
4. En **Quién tiene acceso**, selecciona **Cualquier persona**. La autenticación del campus se realiza con códigos y sesiones propios.
5. Implementa y copia la URL que termina en `/exec`. No uses la URL de edición ni la de prueba `/dev`.
6. Abre esa URL: debe mostrar una respuesta JSON con `ok: true` y el nombre del servicio.

Si la opción Cualquier persona no está disponible por política de la empresa, esta integración pública desde GitHub Pages necesita autorización del administrador de Workspace. No configures acceso restringido esperando que el portal pueda saltarse el inicio de sesión de Google.

## 4. Conectar GitHub Pages

Edita `config.js` en GitHub:

```javascript
window.UC_CONFIG = {
  name: 'Universidad Corporativa',
  company: 'NOMBRE DE TU EMPRESA',
  apiUrl: 'https://script.google.com/macros/s/TU-IMPLEMENTACION/exec',
  demo: false
};
```

Guarda los cambios, espera el nuevo despliegue y recarga la página con Ctrl + F5. La URL de Apps Script es pública; no es una contraseña. Ninguna clave administrativa se guarda en este archivo.

1. Pulsa **Ingresar al campus**.
2. Usa un correo de `ADMIN_EMAILS`.
3. Recibe el código de ocho dígitos y escríbelo antes de diez minutos.
4. Completa tu perfil.
5. Abre **Administración → Configuración**.
6. Define el nombre de la empresa, el firmante, la **URL pública completa del campus**, el número de intentos diarios y la información de tratamiento de datos aprobada por la empresa.
7. Guarda antes de emitir certificados: estos conservan la identidad, nombre del alumno y URL de verificación existentes al momento de emitirlos.
8. En **Personas**, autoriza los correos de prueba si no habilitaste un dominio.

## 5. Preparar los cursos reales

1. En **Administración → Cursos**, usa **Crear curso** o **Duplicar** el ejemplo.
2. Define título, escuela, duración, nivel, nota mínima y descripción.
3. Escribe las lecciones. Puedes añadir un enlace HTTPS por lección a Drive, YouTube, PDF, presentación o video. Para varios recursos, crea lecciones independientes.
4. Los enlaces se abren en otra pestaña. Configura previamente el acceso de lectura al recurso para tus empleados. El portal no cambia permisos de Drive automáticamente.
5. Crea las preguntas y selecciona la opción correcta de cada una. Las preguntas tienen igual peso.
6. Activa **Publicar en la oferta académica** cuando el contenido haya sido revisado internamente.
7. Retira de la oferta el curso de ejemplo cuando termines las pruebas, desmarcando Publicar.
8. Para crear una ruta, abre **Rutas**, agrega un nombre, selecciona cursos y publica. La certificación de ruta se genera al aprobar todos sus cursos.

Si un curso ya tiene inscripciones, no se permite cambiar lecciones, preguntas o nota mínima. Duplica el curso para publicar una nueva versión y conserva los resultados históricos. Puedes cambiar descripción, título, nivel, duración y visibilidad; los certificados ya emitidos conservan su contenido original. No se permite cambiar cursos de una ruta que ya tenga certificados: crea una ruta nueva.

## 6. Prueba real obligatoria antes de invitar al equipo

Haz este recorrido con una cuenta de estudiante autorizada distinta del administrador:

- Ingresar por código, completar perfil e inscribirse.
- Cerrar sesión y verificar que el avance reaparece al ingresar de nuevo.
- Intentar evaluar antes de completar las lecciones: debe impedirlo.
- Completar el contenido y enviar un intento fallido: debe quedar registrado sin certificado.
- Aprobar con 80% o más en el ejemplo: debe aparecer un certificado.
- Descargar el PDF desde Certificaciones y revisar nombre, curso, fecha, duración, firmante y URL.
- Ejecutar `procesarPendientes` desde Apps Script para probar inmediatamente el envío, o esperar al activador. Revisar el correo recibido y el PDF adjunto.
- Abrir el código de verificación en una ventana de incógnito: debe mostrar datos mínimos del certificado, nunca documento o correo.
- Comprobar que el alumno no tiene acceso a Administración.
- Revisar filtros, CSV y pestañas `Reporte_Formacion`, `Reporte_Intentos` y `Reporte_Certificados` en Sheets tras ejecutar el procesador.
- Probar desde un celular y otra red.

Este paquete trae pruebas de lógica y de interfaz, pero estas comprobaciones en Google y GitHub dependen de tu cuenta, sus permisos, cuotas y despliegue. No se han ejecutado desde una cuenta tuya.

## 7. Personalizar el certificado

Sin plantilla adicional, el sistema crea un PDF horizontal desde Google Docs. Para usar un diseño corporativo:

1. Diseña un **Google Docs**, preferiblemente horizontal y de una sola página.
2. Añade logo y firma autorizados. Usa estos marcadores exactos, sin dividirlos en estilos distintos:
   `{{NOMBRE}}`, `{{CURSO}}`, `{{HORAS}}`, `{{FECHA}}`, `{{CODIGO}}`, `{{EMPRESA}}`, `{{FIRMANTE}}`, `{{VERIFICACION}}`.
3. Coloca los marcadores en el cuerpo del documento, incluidos los que estén en tablas. No los ubiques en encabezados o pies.
4. Copia el ID de su URL y guárdalo en la propiedad `CERTIFICATE_TEMPLATE_ID` del proyecto Apps Script.
5. La cuenta que ejecuta el proyecto debe poder leer y copiar la plantilla.
6. Prueba con un nombre y título largos. El tamaño de la plantilla debe ajustarse antes de emitir certificados reales.

El sistema copia la plantilla, reemplaza marcadores, crea el PDF privado y elimina la copia temporal. No modifica el diseño original. No implementa plantilla de Google Slides en esta versión.

## 8. Conectar opcionalmente Looker Studio

El dashboard integrado funciona sin Looker Studio. Si lo necesitas, conecta una de las hojas tabulares `Reporte_Formacion`, `Reporte_Intentos` o `Reporte_Certificados` usando el conector de Google Sheets en tu cuenta. Se actualizan mediante el procesador periódico. No conectes directamente las hojas técnicas con JSON. Configura el acceso del informe solo para personas autorizadas.

## 9. Actualizar el código

- Cambios en el portal: reemplaza los archivos de `web` en GitHub y espera a Pages.
- Cambios en Apps Script: guarda y usa **Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**. Mantén la misma implementación para conservar `/exec`.
- No crees bases de datos nuevas ni borres propiedades durante una actualización habitual.

## Problemas comunes

| Síntoma | Revisión |
|---|---|
| Sigue apareciendo DEMOSTRACIÓN | `demo` debe ser `false`. Espera el despliegue de Pages y recarga sin caché. |
| No llega el código | Correo autorizado, spam, propiedad `ADMIN_EMAILS`, dominio permitido, cuota de correo y ejecuciones de Apps Script. Un correo no autorizado recibe una respuesta genérica pero no un correo. |
| No conecta o devuelve HTML | Usa `/exec`; implementación como Yo y acceso Cualquier persona; vuelve a implementar la versión. Revisa también bloqueadores y red corporativa. |
| Certificado pendiente | Revisa Activadores y Ejecutar `procesarPendientes`. El panel muestra errores de envío; no se marca Enviado si la operación falla. |
| No puedo abrir un recurso | Revisa permisos y vigencia del enlace en Drive o el proveedor del contenido. |
| 404 de GitHub Pages | Asegúrate de que `index.html` esté en la raíz publicada; el método Actions debe publicar `web`. |
| Faltan reportes en Sheets | Ejecuta `procesarPendientes`. Las hojas tabulares se generan desde las tablas internas. |
| Error al editar una evaluación usada | Duplica el curso y publica una versión nueva. |

Documentación oficial consultada el 28 de septiembre de 2026:
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://developers.google.com/apps-script/guides/web
- https://developers.google.com/apps-script/guides/content
- https://developers.google.com/apps-script/guides/services/quotas
- https://developers.google.com/apps-script/reference/mail/mail-app
