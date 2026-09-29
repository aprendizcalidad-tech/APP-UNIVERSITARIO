# Verificación de la entrega

Fecha: 28 de septiembre de 2026.

## Comprobado

- Sintaxis de JavaScript del portal, demostración y backend Apps Script.
- 17 comprobaciones de backend con los servicios de Google simulados: eliminación de claves del catálogo, acceso anónimo rechazado, código correcto de un uso, rol protegido, inscripción idempotente, prerrequisitos de lecciones, calificación del servidor, registro de fallo, emisión de certificados de curso y ruta, reenvío idempotente, verificación sin documento/correo, permisos administrativos, protección de evaluaciones usadas, revocación, aislamiento del titular, validación de preguntas/enlaces, aprobación exacta al 80%, límite diario, neutralización de fórmulas y expiración de sesión. Algunas comprobaciones agrupan más de una regla.
- Recorrido automatizado en Chromium: ingreso de demostración, inscripción, tres lecciones, evaluación fallida, nuevo intento aprobado, dos certificados (curso y ruta), consulta de código, creación de curso y ruta, autorización de correo, revocación y exportación CSV.
- Búsqueda de cursos con estado sin resultados.
- Vista de escritorio de 1440 px y móvil de 390 px; sin desbordamiento horizontal en móvil; menú móvil operativo.
- Inspección visual de capturas de escritorio y móvil. Capturas incluidas en `previews`.
- Sin excepciones JavaScript durante el recorrido automatizado.

## Pendiente en la cuenta propietaria

- Desplegar GitHub Pages y Google Apps Script.
- Validar el acceso HTTP entre ambos servicios con la configuración de la organización.
- Recibir y comprobar un código real de ingreso.
- Crear un PDF real con Google Docs/Drive y revisar su formato.
- Recibir el certificado en un correo real y probar su descarga autenticada.
- Validar reportes reales de Sheets, activador periódico, permisos de recursos y cuotas.
- Validación de contenidos y datos institucionales.
- Pruebas de carga con el volumen esperado y validación de accesibilidad completa.

No se garantiza ausencia absoluta de errores. La demostración está probada; los servicios reales necesitan la instalación y prueba de aceptación indicadas en `INSTALACION.md`.
