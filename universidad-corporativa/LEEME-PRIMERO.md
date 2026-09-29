# Universidad Corporativa · Versión 1.0

Aplicativo para GitHub Pages con un backend de Google Apps Script, base de datos en Google Sheets, archivos privados en Drive y envío de certificados PDF por correo. Diseño adaptable a computador y celular, sin instalación de dependencias para publicarlo.

## Lo que incluye

- Inicio, oferta académica y seis escuelas: Liderazgo, Calidad, SST, Servicio, Procesos y Cultura organizacional.
- Acceso mediante código de un solo uso al correo autorizado; perfil con nombre, documento, empresa, área, cargo y ciudad.
- Inscripción, avance por lecciones, biblioteca de recursos y evaluaciones calificadas en el servidor.
- Nota mínima por curso, historial de aprobaciones y fallos, máximo de intentos diarios y envío idempotente de evaluaciones.
- Certificados por curso y ruta, PDF, entrega por correo, verificación pública y revocación administrativa.
- Editor visual de cursos, lecciones, enlaces y preguntas. Editor de rutas.
- Gestión de personas autorizadas y suspensión de usuarios.
- Tablero con filtros por empresa, área, cargo, ciudad, curso, estado y periodo; descarga CSV compatible con Excel.
- Reportes tabulares en Sheets para consulta y conexión opcional a Looker Studio.
- Una demostración local con un curso de Gestión Documental de 3 lecciones y 10 preguntas, y una ruta de ejemplo. Las demás escuelas están listas para incorporar cursos, sin inventar contenidos oficiales de la empresa.

## Primero: probar la demostración

Abre `web/index.html` en Chrome o Edge, o sirve la carpeta `web` con un servidor estático. Pulsa **Ingresar al campus** y elige **Soy estudiante** o **Soy administrador**. Usa datos ficticios.

La demostración guarda los datos en el navegador. No envía correos, no sincroniza dispositivos y sus certificados están marcados SIN VALIDEZ INSTITUCIONAL. El botón del certificado abre una vista de impresión para guardar un PDF de muestra. Si tu navegador restringe almacenamiento al abrir archivos locales, publica `web` en Pages o usa `python -m http.server 8000 --directory web`.

## Después: activar el campus real

Sigue **INSTALACION.md**. Necesitarás una cuenta de Google con permisos para desplegar Apps Script y un repositorio de GitHub. No es necesario Firebase, una API de IA, Cloud Run, Google Forms ni contratar un servidor adicional. Los límites de Google y las condiciones de tu cuenta siguen aplicando.

El sistema NO está conectado a tu cuenta ni publicado automáticamente. Faltan la autorización de Google, la URL de Apps Script y el repositorio de destino. No se han enviado mensajes a empleados ni creado recursos dentro de tu cuenta.

## Archivos

| Carpeta o archivo | Uso |
|---|---|
| `web/` | Portal que se publica en GitHub Pages. |
| `web/config.js` | Nombre, empresa, URL de Apps Script y modo demo. |
| `google-apps-script/Code.gs` | Backend privado, autenticación, cursos, notas, certificados y reportes. |
| `google-apps-script/Seed.gs` | Un curso de ejemplo para instalar inicialmente. |
| `google-apps-script/appsscript.json` | Zona horaria y permisos de Google. |
| `INSTALACION.md` | Pasos de configuración y comprobación real. |
| `ARQUITECTURA-Y-OPERACION.md` | Seguridad, datos, límites, operación y recuperación. |
| `tests/` | Pruebas de lógica y recorrido de interfaz. |
| `.github/workflows/pages.yml` | Publicación alternativa por GitHub Actions. |

**No uses las preguntas del curso de ejemplo como examen real:** su contenido forma parte del paquete público de demostración. Crea cursos y evaluaciones propias desde Administración para que las respuestas correctas existan únicamente en el backend privado.

## Sobre Google Forms

La evaluación está integrada en el portal. Apps Script recibe las respuestas, consulta la clave privada, calcula el porcentaje y guarda el resultado. Esto evita que un usuario envíe por sí mismo una calificación aprobatoria. No se incluye sincronización de resultados desde Forms: si ya tienes formularios, sus preguntas se deben cargar en el editor. Drive, Docs, Sheets y el correo de Google sí forman parte del flujo implementado.
