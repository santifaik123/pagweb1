# Mapa de datos de leads

Gate objetivo: `sellable_mvp`.

| Dato | Finalidad | Almacenamiento | Acceso | Retención |
| --- | --- | --- | --- | --- |
| Nombre | Responder la solicitud | Netlify Database y bandeja Nexus | Administrador NUVIK | Revisión a 365 días |
| Email | Responder y dar seguimiento | Netlify Database y bandeja Nexus | Administrador NUVIK | Revisión a 365 días |
| Empresa (opcional) | Contexto comercial | Netlify Database y bandeja Nexus | Administrador NUVIK | Revisión a 365 días |
| Tipo y mensaje | Comprender la necesidad | Netlify Database y bandeja Nexus | Administrador NUVIK | Revisión a 365 días |
| Campaña y ruta | Medición comercial agregada | Netlify Database | Administrador NUVIK | Revisión a 365 días |
| Host referente | Atribución sin conservar la URL completa | Netlify Database | Administrador NUVIK | Revisión a 365 días |
| Hash de IP | Prevención de spam | Solo Netlify Database | Proceso del formulario | Revisión a 365 días |
| Consentimiento y versión de privacidad | Evidencia de autorización de contacto | Netlify Database y bandeja Nexus | Administrador NUVIK | Igual que el lead |

No se solicitan RUT, teléfono obligatorio, ubicación precisa, datos financieros,
salud, documentos, credenciales ni categorías sensibles. Los logs no incluyen el
mensaje, email, nombre, secretos o IP legible.

Las solicitudes de acceso, corrección o eliminación se reciben en
`contacto@nuvik.digital`.
