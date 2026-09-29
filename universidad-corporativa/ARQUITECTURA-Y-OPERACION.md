# Arquitectura y operación

## Componentes

- **GitHub Pages:** entrega HTML, CSS y JavaScript. No almacena datos de empleados ni ejecuta el backend.
- **Apps Script:** autentica por códigos de correo, aplica permisos, registra actividad, califica, emite certificados y ejecuta trabajos periódicos.
- **Sheets:** persistencia privada. Las tablas técnicas tienen `id` y `data_json`; se administran desde el portal. Los reportes tabulares se regeneran automáticamente para análisis.
- **Drive / Docs:** generación de PDFs privados, opcionalmente usando una plantilla de Google Docs.
- **MailApp:** envío desde la cuenta que implementa el script. No se necesita habilitar la API avanzada de Gmail.

Las evaluaciones están integradas en la aplicación; no hay dependencia de Google Forms. Los materiales externos se enlazan desde las lecciones. No se incorporó un reproductor que intente saltarse los permisos de Drive, ni subida de archivos a GitHub.

## Datos y permisos

- Los estudiantes solo consultan su avance, intentos y certificados.
- Los administradores se definen en `ADMIN_EMAILS` del backend; el rol no se acepta desde el navegador.
- Los códigos vencen a los diez minutos, permiten cinco intentos y se invalidan al usarlos. Se admite un nuevo código por minuto y hasta ocho solicitudes por correo al día UTC.
- Los códigos y tokens de sesión se almacenan con SHA-256. La sesión dura doce horas y se guarda en `sessionStorage` del navegador. Salir la invalida en el servidor.
- Los permisos se validan en cada acción privada; ocultar un botón no es el control de seguridad.
- Las notas se calculan a partir de respuestas privadas del servidor. El catálogo no devuelve la opción correcta.
- El número de identificación se conserva como texto para no perder ceros iniciales.
- La verificación pública devuelve nombre, empresa, curso o ruta, horas, fecha, código y estado. No expone correo, documento, ID del usuario ni archivo de Drive. El código usa un componente aleatorio de 16 caracteres hexadecimales.
- Los certificados no se comparten públicamente en Drive. La descarga requiere una sesión del titular.
- Los contenidos y preguntas del catálogo publicado pueden consultarse sin iniciar sesión. No publiques textos confidenciales allí. Para materiales internos, usa enlaces de Drive con permisos adecuados.
- `demo.js` contiene claves de evaluación SOLO para el ejemplo local. No contiene ni sincroniza evaluaciones creadas en el campus real. No reutilices las preguntas del ejemplo para acreditar formación real.
- HTML escapado en la interfaz, enlaces de recursos limitados a HTTPS y neutralización de fórmulas en reportes y CSV.
- No incluyas en GitHub bases de datos, certificados, listas de empleados, tokens ni propiedades privadas de Apps Script.

## Consistencia y reintentos

Cada evaluación tiene un identificador de solicitud. Repetir la misma solicitud devuelve el resultado ya registrado. Las escrituras se ejecutan bajo un bloqueo de script para reducir conflictos simultáneos. Se registra primero el intento; el procesador periódico recupera certificados pendientes si una ejecución se interrumpe después de guardar la nota.

Hay un certificado por alumno y curso, y otro por alumno y ruta. El registro tiene un identificador determinista interno y un código público aleatorio. El envío se procesa cada cinco minutos, hasta doce registros por ejecución y con un presupuesto de tiempo. Errores de PDF o correo quedan registrados y se reintentan con espera creciente, hasta un día. Una cuota agotada conserva la cola pendiente.

El envío de correo no es una transacción conjunta con Sheets: si Google confirma el correo y la ejecución se interrumpe antes de registrar `sent`, un reintento podría enviar un correo duplicado. No se emite por ello un nuevo código de certificado. Se documenta este límite para no prometer entrega exactamente una vez.

La revocación invalida la verificación y bloquea nuevas descargas desde el portal. No puede retirar PDFs que un usuario ya descargó ni correos ya enviados. Un certificado revocado no se reemite automáticamente.

## Reportes

El proceso periódico actualiza:
- `Reporte_Formacion`: una fila por inscripción con la aprobación o último intento.
- `Reporte_Intentos`: todos los intentos, aprobados y fallidos.
- `Reporte_Certificados`: certificados y estado de envío.

El tablero integrado calcula la aprobación como inscripciones aprobadas / inscripciones evaluadas dentro del filtro. Los pendientes incluyen quienes no evaluaron y quienes aún no aprobaron. Los filtros temporales usan el periodo de evaluación; las inscripciones sin evaluación usan la fecha de inscripción. Las cifras globales de cursos y certificados se identifican como globales. No representan cobertura de toda la plantilla si hay personas que todavía no se han inscrito.

Los filtros y límites diarios usan fecha UTC, indicada en la interfaz. La visualización de fechas usa la zona del navegador; el proyecto Apps Script está configurado en Bogotá. Si se exige un corte estrictamente colombiano, un desarrollador debe unificarlo en las funciones de fecha antes del uso institucional.

## Capacidad y límites reales

Esta versión está pensada como piloto interno. No se ha realizado una prueba de carga con cientos de usuarios simultáneos. Sheets consulta tablas completas y Apps Script serializa solicitudes mediante un bloqueo global; una carga elevada aumenta los tiempos de espera. El diseño no promete capacidad ilimitada ni sustituye un LMS empresarial de alta concurrencia.

Apps Script, Drive y correo tienen cuotas y tiempos máximos que dependen de la cuenta y pueden cambiar. Los inicios de sesión también consumen correo. Revisa las cuotas de la cuenta administradora y prueba con el volumen esperado antes de abrirlo a toda la empresa. La cola evita perder el registro de certificados cuando un correo falla, pero no elimina los límites de Google.

Para muchos miles de estudiantes o cargas simultáneas elevadas, migra persistencia y autenticación a un backend apropiado y conserva el portal como interfaz. Esta entrega no contrata servicios de pago ni configura facturación.

## Operación habitual

1. Revisar **Ejecuciones** y **Activadores** en Apps Script si hay pendientes prolongados.
2. Mantener la cuenta propietaria activa y con acceso a la hoja, carpeta y plantilla.
3. Revisar solicitudes de acceso y políticas de datos según los procedimientos internos de la empresa.
4. Respaldar Sheets y la carpeta de certificados conforme al procedimiento institucional. No se implementa una política automática de retención o borrado.
5. No editar ni borrar manualmente filas de las tablas técnicas. La estructura de los reportes puede regenerarse.
6. Actualizar el código conservando los IDs de recursos. No crear una nueva base en cada despliegue.
7. Validar contenido y evaluaciones internamente antes de publicarlos. El ejemplo didáctico no reemplaza políticas de la empresa.

## Personalización visual

Los colores están al inicio de `web/styles.css`: `--navy`, `--blue`, `--gold`, `--bg` y `--ink`. El diseño entregado usa azul profundo, superficies claras y acento dorado; no pretende ser una identidad corporativa oficial sin contar con sus activos. El isotipo U es tipográfico y se puede reemplazar con el logo autorizado de la empresa.

## Pruebas incluidas

Desde la carpeta del proyecto, con Node.js:

```bash
node tests/backend.cjs
```

Las pruebas del backend usan servicios simulados. Verifican reglas y autorización, pero no pueden demostrar por sí mismas el funcionamiento de Google, correo o PDFs.

Para el recorrido de navegador, instala Playwright y Chromium en tu entorno de desarrollo (no son necesarios en GitHub Pages):

```bash
npm install --no-save playwright
npx playwright install chromium
node tests/browser.cjs
```

La prueba crea su propio servidor en el puerto 8765, usa un contexto aislado de navegador y modifica solo datos ficticios locales. Puedes indicar `CHROMIUM_PATH` si ya tienes un ejecutable compatible. Revisa `PRUEBAS.md` para conocer los resultados y lo que queda por verificar en Google.
