export type ServiceDetailContent = {
  seoTitle: string;
  seoDescription: string;
  serviceType: string;
  heroBenefits: string[];
  problemTitle: string;
  problemBody: string;
  solutionTitle: string;
  solutionBody: string;
  aiSummaryTitle: string;
  aiSummaryBody: string;
  fitTitle: string;
  fitBody: string;
  signals: Array<[string, string]>;
  deliverablesTitle: string;
  deliverablesBody: string;
  deliverables: Array<[string, string]>;
  benefitsTitle: string;
  benefitsBody: string;
  benefits: Array<[string, string]>;
  useCases: Array<[string, string]>;
  processTitle: string;
  processBody: string;
  process: Array<[string, string]>;
  approachTitle: string;
  approachBody: string;
  approachItems: Array<[string, string]>;
  gallery: Array<{
    image: string;
    label: string;
    title: string;
    body: string;
  }>;
  faqs: Array<[string, string]>;
  relatedSlugs: string[];
  ctaTitle: string;
  ctaBody: string;
};

export const serviceContentBySlug: Record<string, ServiceDetailContent> = {
  "software-a-medida": {
    seoTitle: "Software a medida para empresas",
    seoDescription:
      "Software a medida para centralizar procesos, datos y decisiones sin adaptar tu operacion a herramientas genericas.",
    serviceType: "Desarrollo de software a medida",
    heroBenefits: ["Flujos propios", "Datos centralizados", "Base escalable"],
    problemTitle: "El negocio crece, pero la operacion queda repartida.",
    problemBody:
      "Cuando cada area resuelve con planillas, mensajes y sistemas aislados, el equipo pierde tiempo reconstruyendo informacion antes de poder actuar.",
    solutionTitle: "Un sistema propio para operar con menos friccion.",
    solutionBody:
      "Diseñamos y desarrollamos software a medida que ordena roles, estados, datos y acciones en una experiencia clara para el equipo.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "El software a medida de Nuvik Digital es una solucion web creada alrededor de procesos especificos de una empresa. Sirve para centralizar informacion, automatizar pasos internos, controlar permisos y convertir operaciones dispersas en un sistema medible y mantenible.",
    fitTitle: "Cuando la operacion ya supero las herramientas genericas.",
    fitBody:
      "Tiene sentido cuando el proceso es importante para el negocio, pero las herramientas disponibles obligan a trabajar con atajos.",
    signals: [
      ["Informacion fragmentada", "El equipo reconstruye el estado del negocio buscando datos en varios lugares."],
      ["Procesos excepcionales", "La operacion requiere reglas, permisos o recorridos que un software estandar no contempla."],
      ["Decisiones tardias", "Los datos existen, pero no llegan ordenados a quienes deben actuar."],
      ["Dependencia de personas", "El proceso funciona porque alguien recuerda pasos, valida errores o persigue pendientes."],
    ],
    deliverablesTitle: "Una herramienta operativa, no una capa visual.",
    deliverablesBody:
      "El alcance se define alrededor de procesos verificables. Cada modulo debe resolver una tarea, registrar una decision o reducir un punto de friccion.",
    deliverables: [
      ["Mapa funcional", "Procesos, roles, estados, permisos y dependencias documentados antes de desarrollar."],
      ["Arquitectura modular", "Base preparada para crecer por modulos sin rehacer el producto completo."],
      ["Interfaz responsive", "Pantallas diseñadas para los dispositivos que usa realmente el equipo."],
      ["Modelo de datos", "Estructura consistente para mantener trazabilidad y evitar informacion duplicada."],
      ["Validaciones", "Reglas que reducen errores de carga, estados incompatibles y datos incompletos."],
      ["Entrega documentada", "Criterios de uso, alcance, mantenimiento y evolucion listos para operar con claridad."],
    ],
    benefitsTitle: "Lo que cambia cuando el sistema acompaña la operacion.",
    benefitsBody:
      "El valor no esta en tener una app propia, sino en que el equipo trabaje con informacion confiable y menos pasos manuales.",
    benefits: [
      ["Menos doble carga", "La informacion se registra una vez y alimenta el proceso correcto."],
      ["Roles mas claros", "Cada usuario ve acciones, permisos y datos alineados con su responsabilidad."],
      ["Mejor trazabilidad", "Estados, cambios y decisiones quedan disponibles para revisar y mejorar."],
      ["Evolucion controlada", "El producto puede incorporar nuevas funciones sin perder orden tecnico."],
    ],
    useCases: [
      ["Gestion de operaciones", "Sistemas para solicitudes, ordenes, aprobaciones, estados y seguimiento interno."],
      ["Panel comercial", "Registro de oportunidades, clientes, tareas y reportes conectados al proceso real."],
      ["Inventario y costos", "Herramientas para controlar stock, gastos, margenes y movimientos operativos."],
      ["Portales internos", "Acceso por rol para equipos, proveedores o clientes con informacion centralizada."],
    ],
    processTitle: "De la operacion real a una primera version utilizable.",
    processBody:
      "Priorizamos el recorrido de mayor impacto y validamos temprano con las personas que lo usaran.",
    process: [
      ["Entendimiento", "Relevamos tareas, responsables, excepciones y fuentes de informacion actuales."],
      ["Definicion del nucleo", "Delimitamos la primera version, usuarios, datos y criterios de aceptacion."],
      ["Diseño operativo", "Convertimos el proceso en pantallas, estados, permisos y reglas de negocio."],
      ["Desarrollo por modulos", "Construimos flujos completos por etapas, con revisiones sobre producto funcional."],
      ["Validacion y evolucion", "Probamos con casos reales, corregimos friccion y organizamos el siguiente ciclo."],
    ],
    approachTitle: "Tecnologia pensada para mantener control.",
    approachBody:
      "La solucion se diseña para ser clara de usar y clara de mantener. Evitamos cajas negras que despues nadie puede evolucionar.",
    approachItems: [
      ["Web app responsive", "Experiencia accesible desde navegador, sin instalacion innecesaria."],
      ["Datos estructurados", "Entidades, estados y relaciones definidos antes de construir pantallas."],
      ["Integraciones posibles", "Conexiones con APIs, formularios, CRM, pagos o bases cuando el alcance lo requiere."],
      ["Mantenibilidad", "Codigo organizado, componentes reutilizables y criterios de QA desde el inicio."],
    ],
    gallery: [
      {
        image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
        label: "CONTROL OPERATIVO",
        title: "Datos y acciones en una sola vista.",
        body: "La interfaz reune contexto, estado y proximos pasos sin obligar a navegar entre sistemas.",
      },
      {
        image: "/assets/sections/automations.webp",
        label: "LOGICA DE NEGOCIO",
        title: "Procesos visibles y trazables.",
        body: "Las reglas importantes dejan de depender de memoria, mensajes o tareas manuales.",
      },
    ],
    faqs: [
      ["Como se define el alcance?", "Partimos del proceso prioritario, sus usuarios y el resultado esperado. Lo que no sea necesario para validar ese nucleo queda planificado para una etapa posterior."],
      ["Puede integrarse con herramientas existentes?", "Si. Revisamos APIs, formatos de datos, permisos y frecuencia de sincronizacion antes de confirmar cada integracion."],
      ["Cuanto demora desarrollar software a medida?", "Depende del alcance, cantidad de usuarios, integraciones y reglas de negocio. Primero definimos una version inicial realista y despues estimamos con precision."],
      ["Que pasa si el proceso cambia despues?", "La arquitectura se plantea por modulos para que nuevas reglas, vistas o integraciones puedan agregarse sin rehacer todo el sistema."],
      ["Que ocurre despues del lanzamiento?", "Se entrega una base preparada para mantenimiento y evolucion. El soporte y los siguientes ciclos se acuerdan segun criticidad y ritmo operativo."],
    ],
    relatedSlugs: ["integraciones", "dashboards", "apps-internas"],
    ctaTitle: "Conversemos sobre el proceso que hoy limita tu operacion.",
    ctaBody:
      "En una primera conversacion podemos identificar el nucleo del producto, los usuarios involucrados y las principales dependencias tecnicas.",
  },
  automatizacion: {
    seoTitle: "Automatizacion de procesos para empresas",
    seoDescription:
      "Automatizacion de procesos para reducir tareas repetitivas, conectar herramientas y dar seguimiento a operaciones comerciales.",
    serviceType: "Automatizacion de procesos",
    heroBenefits: ["Menos tareas manuales", "Flujos trazables", "Seguimiento claro"],
    problemTitle: "Las tareas repetitivas consumen foco y velocidad.",
    problemBody:
      "Cuando el seguimiento depende de recordatorios, copias manuales o mensajes sueltos, el proceso se vuelve lento y dificil de controlar.",
    solutionTitle: "Flujos automaticos con reglas visibles.",
    solutionBody:
      "Diseñamos automatizaciones que conectan eventos, condiciones, acciones y alertas para que cada solicitud avance con menos intervencion manual.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "La automatizacion de procesos en Nuvik Digital conecta formularios, CRM, correo, bases de datos y herramientas internas para reducir trabajo repetitivo. Cada flujo se diseña con disparadores, reglas, acciones, excepciones y registros para mantener control operativo.",
    fitTitle: "Cuando el equipo repite tareas que una regla puede resolver.",
    fitBody:
      "Automatizar no es sumar herramientas. Es diseñar un flujo confiable para que cada evento active la accion correcta.",
    signals: [
      ["Seguimiento irregular", "Leads, solicitudes o incidencias dependen de recordatorios personales."],
      ["Carga duplicada", "La misma informacion se copia entre formularios, correos, CRM y planillas."],
      ["Errores por volumen", "Al crecer la demanda aumentan omisiones, demoras y estados inconsistentes."],
      ["Sin registro de ejecucion", "No queda claro que paso, cuando fallo o quien debe intervenir."],
    ],
    deliverablesTitle: "Automatizaciones que se pueden entender y controlar.",
    deliverablesBody:
      "Cada flujo incluye sus disparadores, reglas, acciones, excepciones y registro de ejecucion.",
    deliverables: [
      ["Mapa del flujo", "Secuencia completa con responsables, condiciones y puntos de intervencion humana."],
      ["Disparadores", "Eventos que inician el proceso desde formularios, cambios de estado, pagos o sistemas."],
      ["Reglas condicionales", "Logica que define que ocurre segun datos, estados o respuestas."],
      ["Conexiones", "Integracion con formularios, correo, CRM, mensajeria, pagos o bases de datos."],
      ["Manejo de errores", "Rutas de contingencia y alertas para que una excepcion no quede invisible."],
      ["Monitoreo", "Registro de ejecuciones para revisar resultados y detectar mejoras."],
    ],
    benefitsTitle: "Automatizar para ganar consistencia, no solo velocidad.",
    benefitsBody:
      "Un flujo bien armado reduce trabajo repetitivo y tambien hace mas visible el estado de cada caso.",
    benefits: [
      ["Menos seguimiento manual", "El sistema avisa, registra o deriva sin depender de una persona persiguiendo tareas."],
      ["Menos errores", "Las reglas reducen omisiones y pasos olvidados cuando aumenta el volumen."],
      ["Mejor respuesta", "Leads, solicitudes y operaciones reciben una accion inicial mas rapida."],
      ["Control del proceso", "Los estados y errores quedan disponibles para diagnosticar y mejorar."],
    ],
    useCases: [
      ["Seguimiento comercial", "Notificaciones, tareas y registros automaticos cuando entra una oportunidad."],
      ["Onboarding de clientes", "Secuencias de correos, formularios y estados despues de cerrar una venta."],
      ["Operaciones internas", "Aprobaciones, derivaciones y alertas entre equipos."],
      ["Sincronizacion de datos", "Movimiento controlado de informacion entre sistemas que no conversan naturalmente."],
    ],
    processTitle: "Automatizamos despues de entender la excepcion.",
    processBody:
      "Un flujo robusto contempla tanto el recorrido esperado como los casos que requieren criterio humano.",
    process: [
      ["Inventario de tareas", "Identificamos frecuencia, tiempo invertido, dependencias y errores habituales."],
      ["Diseño de reglas", "Definimos condiciones, datos requeridos y limites de cada accion automatica."],
      ["Prototipo de flujo", "Construimos una version acotada para validar comportamiento antes de ampliar alcance."],
      ["Implementacion controlada", "Probamos el flujo con datos y escenarios representativos."],
      ["Activacion y seguimiento", "Publicamos por etapas, observamos ejecuciones y ajustamos excepciones."],
    ],
    approachTitle: "Conexiones simples, reglas explicitas.",
    approachBody:
      "Preferimos automatizaciones mantenibles y visibles antes que cadenas fragiles que nadie entiende despues de publicarlas.",
    approachItems: [
      ["APIs y webhooks", "Usamos conexiones directas cuando la herramienta lo permite."],
      ["Validacion de datos", "Controlamos formatos, campos obligatorios y duplicados antes de ejecutar acciones."],
      ["Alertas humanas", "Los casos dudosos se derivan con contexto en lugar de esconderse."],
      ["Logs de ejecucion", "Cada flujo deja evidencia para revisar errores y resultados."],
    ],
    gallery: [
      {
        image: "/assets/sections/automations.webp",
        label: "ORQUESTACION",
        title: "Cada condicion conduce a una accion concreta.",
        body: "El flujo muestra que activa el proceso, como decide y donde necesita validacion.",
      },
      {
        image: "/assets/sections/interoperability.webp",
        label: "CONEXIONES",
        title: "Herramientas distintas, un recorrido continuo.",
        body: "La informacion se mueve con reglas claras y sin perder contexto entre plataformas.",
      },
    ],
    faqs: [
      ["Que procesos conviene automatizar primero?", "Los de alta frecuencia, reglas claras y costo visible por demora o error. No priorizamos tareas inestables que todavia necesitan redefinirse."],
      ["La automatizacion reemplaza al equipo?", "No. Reduce trabajo repetitivo y deriva al equipo los casos que requieren decision, negociacion o atencion especial."],
      ["Que herramientas se pueden conectar?", "Depende de los accesos disponibles. Evaluamos formularios, CRM, correo, bases de datos, pagos, WhatsApp u otras plataformas antes de confirmar alcance."],
      ["Como se detectan fallas?", "Cada flujo se diseña con registros, estados y alertas. Asi es posible identificar donde se detuvo y que informacion necesita revision."],
      ["Puede crecer despues de la primera version?", "Si. Diseñamos el flujo con etapas para sumar reglas, canales o integraciones cuando el proceso ya esta estable."],
    ],
    relatedSlugs: ["integraciones", "agentes-ia", "software-a-medida"],
    ctaTitle: "Identifiquemos que tareas pueden dejar de depender de seguimiento manual.",
    ctaBody:
      "Cuentanos como funciona hoy el proceso, que herramientas intervienen y donde aparecen las demoras.",
  },
  integraciones: {
    seoTitle: "Integraciones de sistemas y APIs",
    seoDescription:
      "Integraciones de sistemas, APIs y datos para conectar plataformas comerciales, operativas y administrativas.",
    serviceType: "Integracion de sistemas",
    heroBenefits: ["APIs conectadas", "Datos consistentes", "Menos copiar y pegar"],
    problemTitle: "Las herramientas funcionan, pero el contexto se pierde entre ellas.",
    problemBody:
      "Cuando cada plataforma guarda una parte del proceso, el equipo termina exportando, copiando o corrigiendo informacion a mano.",
    solutionTitle: "Conexiones con reglas, trazabilidad y limites claros.",
    solutionBody:
      "Integramos plataformas para que clientes, estados, pedidos, tareas o metricas se sincronicen con control y responsabilidad definida.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "Las integraciones de Nuvik Digital conectan herramientas mediante APIs, webhooks o sincronizaciones programadas. El objetivo es mantener datos consistentes entre plataformas, reducir carga manual y dar trazabilidad a procesos comerciales, operativos o administrativos.",
    fitTitle: "Cuando las herramientas funcionan, pero no trabajan juntas.",
    fitBody:
      "Una integracion bien diseñada mantiene el contexto entre plataformas y define que sistema es responsable de cada dato.",
    signals: [
      ["Estados inconsistentes", "Clientes, pedidos o tareas muestran informacion distinta segun la plataforma."],
      ["Exportaciones frecuentes", "El equipo depende de archivos CSV o copias manuales para actualizar datos."],
      ["Contexto perdido", "Una accion comercial u operativa no activa el siguiente paso en otra herramienta."],
      ["Errores silenciosos", "Los datos se mueven sin validacion y nadie detecta el problema a tiempo."],
    ],
    deliverablesTitle: "Integraciones diseñadas para operar, no solo conectar.",
    deliverablesBody:
      "Antes de conectar sistemas definimos propiedad del dato, frecuencia, validaciones y comportamiento ante errores.",
    deliverables: [
      ["Contrato de datos", "Campos, formatos, identificadores y reglas documentados para cada intercambio."],
      ["Mapa de sistemas", "Origen, destino, dependencias y responsabilidades claras para cada informacion."],
      ["Conexion implementada", "Integracion mediante API, webhook o proceso programado segun el caso."],
      ["Validaciones", "Control de datos incompletos, duplicados, permisos y respuestas inesperadas."],
      ["Reintentos y alertas", "Manejo de errores para que una falla no detenga el proceso sin aviso."],
      ["Observabilidad", "Registros para diagnosticar fallas sin revisar cada plataforma manualmente."],
    ],
    benefitsTitle: "Un negocio conectado decide con menos ruido.",
    benefitsBody:
      "La integracion correcta reduce friccion operativa y evita que cada equipo trabaje con una version distinta de la informacion.",
    benefits: [
      ["Datos mas confiables", "Los sistemas comparten identificadores y reglas en lugar de depender de duplicados."],
      ["Menos tareas administrativas", "Exportaciones, cargas y actualizaciones manuales se reducen."],
      ["Continuidad operativa", "Una accion en un sistema puede activar el siguiente paso en otro."],
      ["Diagnostico mas rapido", "Los errores quedan registrados con contexto tecnico y operativo."],
    ],
    useCases: [
      ["CRM y formularios", "Enviar oportunidades con campos validados y fuente de origen."],
      ["E-commerce y operaciones", "Sincronizar pedidos, inventario, estados o notificaciones."],
      ["Finanzas y reportes", "Mover datos hacia dashboards o herramientas contables."],
      ["Sistemas internos", "Conectar software propio con plataformas externas o bases existentes."],
    ],
    processTitle: "Conectar sin comprometer la operacion.",
    processBody:
      "Revisamos primero la calidad de las fuentes y activamos la sincronizacion de forma controlada.",
    process: [
      ["Revision tecnica", "Analizamos documentacion, accesos, limites y calidad de los datos disponibles."],
      ["Diseño de sincronizacion", "Definimos origen, destino, frecuencia y resolucion de conflictos."],
      ["Pruebas aisladas", "Validamos casos normales, duplicados, errores y reintentos en un entorno controlado."],
      ["Puesta en marcha", "Activamos por etapas y monitoreamos el comportamiento con datos reales."],
      ["Documentacion", "Registramos dependencias, campos y cuidados para mantenimiento futuro."],
    ],
    approachTitle: "La integracion empieza por la propiedad del dato.",
    approachBody:
      "Conectar sin decidir que sistema manda suele crear mas problemas. Por eso definimos primero responsabilidad y frecuencia.",
    approachItems: [
      ["APIs", "Preferimos conexiones documentadas y estables cuando estan disponibles."],
      ["Webhooks", "Usamos eventos en tiempo real cuando el proceso necesita reaccion inmediata."],
      ["Jobs programados", "Sincronizamos por intervalo cuando es mas estable o suficiente para la operacion."],
      ["Normalizacion", "Alineamos formatos y nombres para que los datos puedan usarse despues."],
    ],
    gallery: [
      {
        image: "/assets/sections/interoperability.webp",
        label: "ARQUITECTURA",
        title: "Cada fuente ocupa un lugar definido.",
        body: "La integracion organiza como viajan los datos y que sistema conserva la autoridad.",
      },
      {
        image: "/assets/sections/automations.webp",
        label: "EJECUCION",
        title: "La conexion tambien necesita logica.",
        body: "Condiciones, reintentos y alertas evitan que una falla silenciosa afecte al proceso.",
      },
    ],
    faqs: [
      ["Pueden integrar cualquier plataforma?", "Depende de los accesos disponibles. Evaluamos API, webhooks, exportaciones y restricciones antes de confirmar la solucion."],
      ["Que pasa si un sistema cambia?", "Una integracion mantenible separa la logica de cada proveedor y registra errores. Esto permite adaptar el conector sin reconstruir todo el flujo."],
      ["Se pueden migrar datos historicos?", "Si, cuando la fuente permite exportarlos y existe una forma confiable de identificarlos, limpiarlos y relacionarlos."],
      ["Como se protege la informacion?", "Definimos permisos, credenciales, campos necesarios y alcance de cada conexion para evitar movimientos innecesarios de datos."],
      ["Una integracion necesita mantenimiento?", "Si. Las plataformas cambian APIs, permisos o limites. Por eso dejamos documentacion y registros para revisar el comportamiento."],
    ],
    relatedSlugs: ["automatizacion", "software-a-medida", "dashboards"],
    ctaTitle: "Conectemos la informacion que hoy se mueve a mano.",
    ctaBody:
      "Indicanos que plataformas intervienen, que dato debe viajar y que accion deberia ocurrir despues.",
  },
  dashboards: {
    seoTitle: "Dashboards para empresas y equipos",
    seoDescription:
      "Dashboards para transformar datos dispersos en paneles claros de gestion comercial, operativa y financiera.",
    serviceType: "Dashboards y visualizacion de datos",
    heroBenefits: ["Indicadores claros", "Datos accionables", "Lectura por rol"],
    problemTitle: "Hay datos, pero no una lectura compartida.",
    problemBody:
      "Si cada area arma sus propios reportes, las decisiones llegan tarde y las conversaciones empiezan discutiendo cual numero es correcto.",
    solutionTitle: "Paneles que responden preguntas de negocio.",
    solutionBody:
      "Diseñamos dashboards con indicadores, filtros y jerarquias pensadas para decidir, priorizar y detectar desviaciones a tiempo.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "Los dashboards de Nuvik Digital convierten datos comerciales, operativos o financieros en paneles claros para tomar decisiones. Incluyen definicion de indicadores, fuentes de datos, filtros, jerarquia visual y criterios de actualizacion segun el ritmo de cada negocio.",
    fitTitle: "Cuando hay datos, pero no una lectura compartida.",
    fitBody:
      "Un dashboard util no acumula graficos. Ordena indicadores alrededor de decisiones y permite detectar que necesita atencion.",
    signals: [
      ["Reportes tardios", "La informacion se arma manualmente cuando la decision ya deberia haberse tomado."],
      ["Metricas sin contexto", "Cada area interpreta resultados con fuentes o definiciones diferentes."],
      ["Problemas invisibles", "Las variaciones importantes aparecen cuando ya afectaron ventas u operacion."],
      ["Reuniones sin foco", "El equipo discute datos basicos antes de decidir acciones."],
    ],
    deliverablesTitle: "Un sistema de lectura para cada nivel de decision.",
    deliverablesBody:
      "Definimos indicadores, fuentes, frecuencia y responsables antes de diseñar la visualizacion.",
    deliverables: [
      ["Marco de indicadores", "Definiciones y relaciones entre metricas para evitar lecturas contradictorias."],
      ["Mapa de fuentes", "Origen, calidad, frecuencia y responsable de cada dato relevante."],
      ["Dashboard responsive", "Vistas priorizadas por rol, objetivo y frecuencia de consulta."],
      ["Filtros utiles", "Exploracion por periodo, area, cliente, producto o estado sin perder contexto."],
      ["Alertas y estados", "Señales visuales para destacar desvios y orientar la siguiente accion."],
      ["Documentacion", "Definiciones y criterios de lectura para que el tablero sea confiable."],
    ],
    benefitsTitle: "Menos reportes manuales, mas decisiones visibles.",
    benefitsBody:
      "El dashboard funciona cuando cada indicador responde una pregunta y ayuda a decidir el siguiente paso.",
    benefits: [
      ["Foco ejecutivo", "Lo critico aparece primero y el detalle queda disponible sin saturar."],
      ["Alineacion de equipos", "Todos trabajan con las mismas definiciones y fuentes."],
      ["Deteccion temprana", "Variaciones relevantes se ven antes de convertirse en problemas mayores."],
      ["Mejora continua", "El tablero revela cuellos de botella y oportunidades de ajuste."],
    ],
    useCases: [
      ["Ventas", "Pipeline, oportunidades, conversion, fuentes y seguimiento comercial."],
      ["Operaciones", "Estados, tiempos, cargas de trabajo, responsables y excepciones."],
      ["Finanzas", "Ingresos, costos, margenes, gastos y tendencias por periodo."],
      ["Soporte o atencion", "Volumen, tiempos de respuesta, clasificacion y casos pendientes."],
    ],
    processTitle: "De preguntas de negocio a indicadores accionables.",
    processBody:
      "La visualizacion se diseña despues de validar que decision debe facilitar cada metrica.",
    process: [
      ["Preguntas clave", "Acordamos que necesita saber cada usuario y que accion puede tomar."],
      ["Auditoria de fuentes", "Revisamos disponibilidad, calidad, frecuencia y consistencia de los datos."],
      ["Modelo de indicadores", "Definimos calculos, filtros, periodos y relaciones entre metricas."],
      ["Prototipo de lectura", "Validamos jerarquia, comparaciones y filtros antes de conectar todo el sistema."],
      ["Implementacion", "Construimos, probamos resultados y documentamos las definiciones utilizadas."],
    ],
    approachTitle: "El diseño visual se subordina a la decision.",
    approachBody:
      "No todos los datos merecen una tarjeta. Cada vista se organiza por prioridad, frecuencia y accion esperada.",
    approachItems: [
      ["Jerarquia", "Indicadores principales, secundarios y diagnosticos separados por nivel."],
      ["Comparacion", "Periodos, segmentos y estados pensados para detectar cambios."],
      ["Accionabilidad", "Cada vista muestra que requiere atencion y que dato explica el problema."],
      ["Escalabilidad", "La estructura puede sumar nuevas fuentes sin perder claridad."],
    ],
    gallery: [
      {
        image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
        label: "VISION GENERAL",
        title: "Lo critico aparece primero.",
        body: "La jerarquia permite comprender el estado general y profundizar sin perder orientacion.",
      },
      {
        image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
        label: "CONTEXTO",
        title: "Actividad y detalle en la misma experiencia.",
        body: "Las metricas se conectan con las entidades y acciones que explican el resultado.",
      },
    ],
    faqs: [
      ["Necesito tener los datos ordenados?", "No completamente, pero si debemos identificar fuentes y responsables. La calidad de los datos forma parte del diagnostico."],
      ["Puede actualizarse en tiempo real?", "Depende del origen, el valor de la inmediatez y los limites tecnicos. En muchos casos una actualizacion programada es mas estable y suficiente."],
      ["Quien define los indicadores?", "Los definimos junto a quienes toman decisiones. NUVIK traduce esas necesidades a estructura de datos y visualizacion."],
      ["Pueden conectarse varias fuentes?", "Si. Primero revisamos formatos, permisos y calidad para evitar que el dashboard muestre informacion inconsistente."],
      ["Que pasa si el negocio cambia?", "El tablero debe evolucionar. Por eso dejamos definiciones y estructura para ajustar indicadores sin perder trazabilidad."],
    ],
    relatedSlugs: ["software-a-medida", "integraciones", "apps-internas"],
    ctaTitle: "Convirtamos tus reportes en una herramienta de decision.",
    ctaBody:
      "Comparte las preguntas que hoy cuesta responder y las fuentes donde vive esa informacion.",
  },
  "agentes-ia": {
    seoTitle: "Agentes IA para atencion y procesos",
    seoDescription:
      "Agentes IA para responder consultas, clasificar oportunidades, activar procesos y escalar casos con control humano.",
    serviceType: "Implementacion de agentes IA",
    heroBenefits: ["Respuestas con contexto", "Clasificacion automatica", "Escalamiento humano"],
    problemTitle: "La IA sin contexto genera ruido, no eficiencia.",
    problemBody:
      "Un agente mal definido responde de forma generica, inventa o exige supervision constante. Para aportar valor necesita limites, datos y objetivo claro.",
    solutionTitle: "Agentes IA conectados con casos de uso reales.",
    solutionBody:
      "Diseñamos agentes para responder, clasificar, registrar informacion y activar procesos con fuentes controladas y criterios de derivacion.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "Los agentes IA de Nuvik Digital son asistentes conversacionales o internos diseñados para casos de uso concretos. Pueden responder preguntas, calificar leads, consultar informacion autorizada y activar procesos, siempre con limites, registros y derivacion humana cuando corresponde.",
    fitTitle: "Cuando una conversacion necesita contexto y capacidad de accion.",
    fitBody:
      "Un agente util no se limita a responder. Comprende la intencion, consulta informacion autorizada y sabe cuando derivar a una persona.",
    signals: [
      ["Consultas repetitivas", "El equipo responde las mismas preguntas y pierde tiempo para casos de mayor valor."],
      ["Leads sin clasificar", "Las oportunidades llegan sin contexto suficiente para priorizar seguimiento."],
      ["Procesos conversacionales", "Una solicitud podria recopilar datos, validar requisitos y activar el siguiente paso."],
      ["Conocimiento disperso", "La informacion para responder vive en documentos, conversaciones o herramientas distintas."],
    ],
    deliverablesTitle: "Un agente alineado con el negocio y sus limites.",
    deliverablesBody:
      "Diseñamos conocimiento, conversacion, acciones permitidas y criterios de escalamiento humano.",
    deliverables: [
      ["Caso de uso definido", "Objetivo, audiencia, canales, limites y resultado esperado del agente."],
      ["Base de conocimiento", "Fuentes seleccionadas, estructuradas y revisadas para responder con consistencia."],
      ["Diseño conversacional", "Intenciones, preguntas, tono y recorridos definidos para cada caso prioritario."],
      ["Herramientas del agente", "Consultas e integraciones limitadas a acciones necesarias y autorizadas."],
      ["Control y derivacion", "Registros, limites y transferencia de contexto cuando debe intervenir una persona."],
      ["Ciclo de mejora", "Revision de conversaciones, respuestas fallidas y nuevas necesidades."],
    ],
    benefitsTitle: "IA aplicada donde puede resolver trabajo real.",
    benefitsBody:
      "El objetivo no es tener un chatbot. Es reducir carga, mejorar respuesta y capturar informacion util para el negocio.",
    benefits: [
      ["Atencion mas consistente", "Respuestas alineadas con fuentes y criterios definidos."],
      ["Mejor calificacion", "Cada consulta puede llegar con contexto, prioridad y datos relevantes."],
      ["Menos tareas repetitivas", "El agente resuelve preguntas frecuentes y recopila informacion inicial."],
      ["Mayor control", "Los casos sensibles se derivan y las interacciones quedan registradas."],
    ],
    useCases: [
      ["Atencion web", "Responder preguntas frecuentes y orientar al usuario hacia el siguiente paso."],
      ["Calificacion comercial", "Identificar necesidad, urgencia, presupuesto o fit antes del contacto humano."],
      ["Soporte interno", "Consultar procedimientos, documentos o datos permitidos."],
      ["Activacion de flujos", "Crear tickets, enviar alertas o registrar informacion despues de una conversacion."],
    ],
    processTitle: "Empezamos por un caso acotado y medible.",
    processBody:
      "La calidad mejora cuando el agente tiene una responsabilidad clara y fuentes confiables.",
    process: [
      ["Caso de uso", "Definimos audiencia, intencion, resultado esperado y situaciones fuera de alcance."],
      ["Conocimiento y reglas", "Preparamos fuentes, permisos, tono y criterios de respuesta."],
      ["Prototipo conversacional", "Probamos preguntas reales, ambiguedades, acciones y derivaciones."],
      ["Publicacion supervisada", "Activamos, revisamos conversaciones y ajustamos con evidencia."],
      ["Mejora continua", "Incorporamos nuevos aprendizajes sin abrir el alcance de forma descontrolada."],
    ],
    approachTitle: "IA con contexto, permisos y criterio.",
    approachBody:
      "No conectamos IA a todo por defecto. Definimos que puede responder, que puede consultar y cuando debe detenerse.",
    approachItems: [
      ["Fuentes controladas", "El agente responde desde informacion aprobada y actualizable."],
      ["Acciones limitadas", "Cada herramienta del agente tiene permisos y alcance especificos."],
      ["Derivacion humana", "Los casos ambiguos o sensibles pasan a una persona con contexto."],
      ["Revision de calidad", "Las conversaciones reales alimentan mejoras sin perder control."],
    ],
    gallery: [
      {
        image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
        label: "CONVERSACION",
        title: "Respuesta y contexto en el mismo lugar.",
        body: "El agente organiza la interaccion y conserva la informacion util para el seguimiento.",
      },
      {
        image: "/assets/sections/automations.webp",
        label: "ACCION",
        title: "La conversacion puede activar procesos.",
        body: "Cuando corresponde, el agente registra, consulta o deriva sin perder trazabilidad.",
      },
    ],
    faqs: [
      ["El agente puede inventar respuestas?", "Reducimos ese riesgo limitando fuentes, acciones y casos de uso. Tambien definimos cuando debe declarar incertidumbre o derivar."],
      ["Puede conectarse con CRM o sistemas internos?", "Si, siempre que existan accesos adecuados y se definan permisos especificos para cada consulta o accion."],
      ["Que canales puede cubrir?", "Depende del alcance. Puede aplicarse a web, formularios, herramientas internas u otros canales que permitan integracion."],
      ["Como se mejora despues de publicarlo?", "Revisamos conversaciones reales, preguntas no resueltas, derivaciones y resultados para ajustar conocimiento y recorridos."],
      ["Necesito tener toda la informacion ordenada?", "No, pero si necesitamos seleccionar fuentes confiables. Parte del trabajo es estructurar conocimiento antes de activar el agente."],
    ],
    relatedSlugs: ["automatizacion", "integraciones", "apps-internas"],
    ctaTitle: "Definamos un primer caso de uso donde la IA aporte valor real.",
    ctaBody:
      "Cuentanos que conversaciones recibe tu equipo, que informacion consulta y que deberia ocurrir despues.",
  },
  "apps-internas": {
    seoTitle: "Apps internas para equipos y operaciones",
    seoDescription:
      "Apps internas para ordenar solicitudes, aprobaciones, estados, permisos y datos operativos en una herramienta simple.",
    serviceType: "Desarrollo de aplicaciones internas",
    heroBenefits: ["Flujos por rol", "Menos planillas", "Acceso responsive"],
    problemTitle: "El equipo trabaja alrededor de herramientas que no fueron hechas para su proceso.",
    problemBody:
      "Cuando una planilla o chat se vuelve el centro de la operacion, aparecen errores, duplicados y falta de trazabilidad.",
    solutionTitle: "Aplicaciones internas enfocadas en una tarea critica.",
    solutionBody:
      "Construimos herramientas simples para que cada persona vea lo que necesita, complete acciones y entienda el estado del proceso.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "Las apps internas de Nuvik Digital son herramientas web para equipos que necesitan ordenar solicitudes, aprobaciones, tareas, datos o estados. Se diseñan por rol, con permisos, validaciones y trazabilidad para reemplazar planillas o procesos coordinados por mensajes.",
    fitTitle: "Cuando el equipo necesita una herramienta simple para un flujo especifico.",
    fitBody:
      "Una app interna elimina pasos y pantallas innecesarias. Cada rol encuentra la informacion y las acciones necesarias para completar su trabajo.",
    signals: [
      ["Procesos por mensajes", "Solicitudes, aprobaciones y cambios de estado se coordinan en conversaciones dispersas."],
      ["Planillas criticas", "Un archivo concentra informacion esencial sin permisos, trazabilidad ni validaciones."],
      ["Herramientas sobredimensionadas", "El equipo usa una fraccion de una plataforma compleja y adapta su proceso a ella."],
      ["Responsables poco claros", "Nadie sabe con precision quien debe tomar la siguiente accion."],
    ],
    deliverablesTitle: "Una experiencia enfocada en el trabajo diario.",
    deliverablesBody:
      "Diseñamos alrededor de tareas, roles y estados concretos, sin sumar complejidad que el equipo no necesita.",
    deliverables: [
      ["Flujos por rol", "Recorridos y permisos especificos para quienes solicitan, revisan, aprueban o administran."],
      ["Interfaz responsive", "Acceso claro desde escritorio, tablet o movil segun el contexto de uso."],
      ["Validaciones", "Reglas que evitan registros incompletos y estados incompatibles."],
      ["Historial", "Trazabilidad de cambios, responsables y decisiones importantes."],
      ["Panel administrativo", "Control de usuarios, estados y configuraciones necesarias para operar."],
      ["Documentacion de uso", "Instrucciones y criterios para que el equipo adopte la herramienta con menos friccion."],
    ],
    benefitsTitle: "Mas orden sin imponer software innecesariamente complejo.",
    benefitsBody:
      "Una app interna funciona cuando reduce pasos y vuelve visible lo que antes dependia de conversaciones sueltas.",
    benefits: [
      ["Menos dependencia de planillas", "Los datos importantes viven en un flujo con permisos y validaciones."],
      ["Adopcion mas facil", "La interfaz se diseña alrededor de tareas reales, no de modulos genericos."],
      ["Responsabilidad visible", "Cada estado muestra quien actua, que falta y que ocurrio antes."],
      ["Base para automatizar", "Una vez ordenado el flujo, se pueden sumar alertas, reportes e integraciones."],
    ],
    useCases: [
      ["Solicitudes internas", "Pedidos, aprobaciones, estados y comentarios en un mismo recorrido."],
      ["Operaciones de terreno", "Carga de informacion desde movil con validaciones y seguimiento."],
      ["Portales por rol", "Acceso diferenciado para equipos, proveedores o clientes."],
      ["Gestion documental", "Registros, revisiones y estados de documentos o casos."],
    ],
    processTitle: "Diseñamos con las personas que ejecutan el proceso.",
    processBody:
      "La adopcion depende de resolver el flujo real con menos friccion que la herramienta anterior.",
    process: [
      ["Observacion del flujo", "Relevamos tareas, informacion, responsables y puntos de espera."],
      ["Prototipo operativo", "Validamos pantallas y recorridos antes de desarrollar la logica completa."],
      ["Construccion por modulos", "Implementamos primero el nucleo y luego los casos complementarios."],
      ["Prueba con usuarios", "Ajustamos lenguaje, permisos y pasos con escenarios cotidianos."],
      ["Publicacion y soporte", "Acompañamos la puesta en uso y priorizamos mejoras segun adopcion real."],
    ],
    approachTitle: "Menos pantallas, mas claridad operativa.",
    approachBody:
      "Cada funcionalidad debe tener una razon de uso. Si una pantalla no ayuda a completar el flujo, no entra en la primera version.",
    approachItems: [
      ["Roles", "Permisos y vistas segun responsabilidad."],
      ["Estados", "Etapas visibles para saber que falta y que sigue."],
      ["Validaciones", "Reglas que protegen la calidad de la informacion."],
      ["Responsive", "Acceso adaptado al contexto real de uso."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "EXPERIENCIA",
        title: "La interfaz se adapta al trabajo, no al reves.",
        body: "Jerarquia, estados y acciones se diseñan segun la responsabilidad de cada usuario.",
      },
      {
        image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
        label: "OPERACION",
        title: "Informacion y control sin cambiar de herramienta.",
        body: "El equipo puede completar tareas y comprender el estado general desde un mismo sistema.",
      },
    ],
    faqs: [
      ["Es lo mismo que software a medida?", "Una app interna es un tipo de software a medida, normalmente enfocado en un flujo y un grupo de usuarios definidos."],
      ["Puede usarse desde el celular?", "Si. Definimos que acciones deben funcionar en movil y diseñamos la experiencia segun ese contexto."],
      ["Como se gestiona el acceso?", "Se definen roles, permisos y reglas de autenticacion segun la sensibilidad del proceso y los datos."],
      ["Puede conectarse con otras herramientas?", "Si. Podemos integrar CRM, formularios, dashboards, correo u otras plataformas si el proceso lo necesita."],
      ["Como se evita que el equipo no la use?", "La adopcion se trabaja desde el diagnostico. Diseñamos con usuarios reales y reducimos pasos respecto del proceso anterior."],
    ],
    relatedSlugs: ["software-a-medida", "dashboards", "automatizacion"],
    ctaTitle: "Convirtamos ese flujo informal en una herramienta clara.",
    ctaBody:
      "Explicanos quien participa, que informacion necesita y donde se producen hoy las demoras.",
  },
  "web-corporativa": {
    seoTitle: "Diseño y desarrollo de web corporativa",
    seoDescription:
      "Web corporativa para empresas que necesitan explicar su oferta, transmitir confianza y convertir visitas en oportunidades.",
    serviceType: "Diseño y desarrollo de sitios web corporativos",
    heroBenefits: ["Narrativa clara", "Diseño responsive", "SEO tecnico base"],
    problemTitle: "La empresa evoluciono, pero la web sigue explicando otra version.",
    problemBody:
      "Una web desordenada obliga al cliente a deducir que haces, por que confiar y como avanzar. Esa friccion reduce oportunidades.",
    solutionTitle: "Una presencia digital que explica, posiciona y convierte.",
    solutionBody:
      "Creamos sitios corporativos con estrategia, contenido, diseño y desarrollo para presentar una oferta con claridad y accion comercial visible.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "Una web corporativa de Nuvik Digital es un sitio diseñado para explicar que hace una empresa, ordenar sus servicios, transmitir confianza y generar oportunidades comerciales. Incluye arquitectura de informacion, narrativa, diseño responsive, desarrollo optimizado y SEO tecnico esencial.",
    fitTitle: "Cuando la web no representa la capacidad real de la empresa.",
    fitBody:
      "Una web corporativa debe ayudar a una persona nueva a entender que haces, por que confiar y cual es el siguiente paso.",
    signals: [
      ["Oferta dificil de explicar", "Los servicios existen, pero la web no organiza diferencias, alcance ni valor."],
      ["Percepcion desactualizada", "La empresa evoluciono y su presencia digital quedo atras."],
      ["Oportunidades sin recorrido", "Las visitas llegan, pero no encuentran prueba, contexto o una accion clara."],
      ["Contenido disperso", "Informacion importante existe, pero no forma una narrativa comercial coherente."],
    ],
    deliverablesTitle: "Una plataforma comercial y reputacional completa.",
    deliverablesBody:
      "La entrega combina estrategia, contenido, diseño y desarrollo. No se trata de aplicar una plantilla sobre textos existentes.",
    deliverables: [
      ["Arquitectura de informacion", "Mapa de paginas y recorridos segun audiencia, oferta y objetivo comercial."],
      ["Narrativa y jerarquia", "Mensajes, titulos y estructura para explicar valor sin sobrecargar al usuario."],
      ["Sistema visual", "Tipografia, composicion, componentes y reglas responsive alineados con la marca."],
      ["Desarrollo optimizado", "Sitio veloz, responsive y preparado para mantenimiento."],
      ["SEO tecnico esencial", "Metadatos, estructura semantica, sitemap y señales base de indexacion."],
      ["Formularios y CTAs", "Puntos de conversion claros con contexto para el seguimiento comercial."],
    ],
    benefitsTitle: "Una web que trabaja antes de la primera reunion.",
    benefitsBody:
      "El visitante debe llegar a la conversacion entendiendo la oferta, el criterio y el siguiente paso.",
    benefits: [
      ["Mas claridad comercial", "Servicios, diferenciales y alcance se explican con menos ambiguedad."],
      ["Mejor percepcion", "La experiencia visual acompaña el nivel real de la empresa."],
      ["Recorridos intencionales", "Cada seccion orienta hacia una accion o una prueba de confianza."],
      ["Base indexable", "La estructura tecnica permite que buscadores y asistentes entiendan el sitio."],
    ],
    useCases: [
      ["Empresas B2B", "Sitios para explicar servicios, procesos, industria y criterios de trabajo."],
      ["Estudios profesionales", "Presencia digital para convertir experiencia en confianza."],
      ["Marcas en crecimiento", "Web preparada para sumar casos, servicios y contenido."],
      ["Reemplazo de sitio antiguo", "Nueva arquitectura sin perder lo que ya aporta valor."],
    ],
    processTitle: "Primero claridad. Despues diseño.",
    processBody:
      "El proyecto avanza desde la estrategia hacia la interfaz para evitar decisiones visuales sin fundamento.",
    process: [
      ["Conocernos", "Alineamos negocio, oferta, audiencias, percepcion deseada y objetivos del sitio."],
      ["Arquitectura y contenido", "Definimos paginas, recorridos, mensajes y evidencia necesaria."],
      ["Diseño visual", "Construimos jerarquia, identidad y componentes para sostener la narrativa."],
      ["Desarrollo", "Llevamos el diseño a una implementacion responsive y optimizada."],
      ["QA y publicacion", "Validamos contenido, enlaces, formularios, rendimiento y comportamiento en dispositivos."],
    ],
    approachTitle: "Diseño editorial con base tecnica.",
    approachBody:
      "La web debe sentirse propia, pero tambien cargar rapido, tener estructura semantica y poder crecer sin perder consistencia.",
    approachItems: [
      ["Arquitectura clara", "Cada pagina responde una intencion del visitante."],
      ["Componentes reutilizables", "Secciones coherentes para escalar contenido."],
      ["Performance", "Imagenes, estructura y codigo cuidados desde la base."],
      ["SEO y AI SEO", "Contenido extractable, headings claros y preguntas frecuentes visibles."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "SISTEMA DIGITAL",
        title: "Una identidad que se sostiene en cada pagina.",
        body: "La arquitectura visual permite crecer sin perder consistencia ni claridad.",
      },
      {
        image: "/assets/hero/nuvik-operations.webp",
        label: "EXPERIENCIA",
        title: "Informacion compleja, presentada con jerarquia.",
        body: "El recorrido orienta la lectura y mantiene visible la accion comercial relevante.",
      },
    ],
    faqs: [
      ["NUVIK tambien trabaja el contenido?", "Si. Organizamos la narrativa y redactamos o editamos los textos necesarios a partir de informacion validada contigo."],
      ["Podemos conservar contenido o paginas actuales?", "Si. Auditamos que aporta valor, que debe reescribirse y que conviene retirar o redirigir."],
      ["El sitio queda preparado para crecer?", "Diseñamos componentes y estructura para sumar casos, servicios o contenidos manteniendo coherencia."],
      ["Incluye SEO?", "Incluye SEO tecnico esencial y una estructura de contenido clara. Una estrategia SEO continua se puede trabajar como alcance posterior."],
      ["Que necesito entregar para comenzar?", "Informacion sobre oferta, clientes, objetivos, materiales existentes y referencias utiles. Si falta claridad, la trabajamos en la primera etapa."],
    ],
    relatedSlugs: ["rediseno-web", "seo-mantenimiento", "landing-pages"],
    ctaTitle: "Construyamos una web a la altura de tu empresa.",
    ctaBody:
      "Cuentanos que debe entender un cliente, que percepcion necesita transmitir la marca y que accion esperas generar.",
  },
  "landing-pages": {
    seoTitle: "Landing pages orientadas a conversion",
    seoDescription:
      "Landing pages para campañas, validacion de ofertas y captacion de leads con narrativa clara y medicion.",
    serviceType: "Diseño y desarrollo de landing pages",
    heroBenefits: ["Una oferta", "Un recorrido", "Una conversion"],
    problemTitle: "La campaña promete algo que la pagina no continua.",
    problemBody:
      "Cuando el anuncio, la oferta y la pagina no comparten foco, el visitante pierde contexto y la conversion cae.",
    solutionTitle: "Una pagina diseñada alrededor de una decision.",
    solutionBody:
      "Creamos landing pages que ordenan problema, propuesta, prueba, objeciones y accion para convertir trafico en oportunidades medibles.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "Las landing pages de Nuvik Digital son paginas enfocadas en una conversion especifica. Se usan para campañas, validacion de ofertas o captacion de leads, con mensaje central, estructura persuasiva, diseño responsive, formulario claro y medicion de eventos.",
    fitTitle: "Cuando una campaña necesita un recorrido sin distracciones.",
    fitBody:
      "Una landing page concentra la atencion en una oferta, una audiencia y una accion medible.",
    signals: [
      ["Trafico sin conversion", "La campaña deriva a una pagina general que no continua el mensaje del anuncio."],
      ["Oferta nueva", "Necesitas validar interes antes de construir una presencia o producto mas amplio."],
      ["Decision compleja", "La audiencia necesita argumentos y prueba en un orden especifico antes de actuar."],
      ["Formulario debil", "La pagina captura poco contexto o pide demasiado para el nivel de interes."],
    ],
    deliverablesTitle: "Una pagina construida alrededor de la decision.",
    deliverablesBody:
      "Cada bloque responde una objecion, aporta evidencia o facilita el siguiente paso.",
    deliverables: [
      ["Propuesta central", "Mensaje principal alineado con la intencion de la campaña y la audiencia."],
      ["Estructura de conversion", "Secuencia de problema, solucion, prueba, objeciones y accion."],
      ["Copy de secciones", "Titulares, textos y microcopy preparados para claridad y accion."],
      ["Diseño responsive", "Experiencia optimizada para la fuente de trafico y sus dispositivos principales."],
      ["Formulario o CTA", "Captura de informacion con friccion controlada."],
      ["Medicion", "Eventos esenciales para conocer interaccion, abandono y conversion."],
    ],
    benefitsTitle: "Menos distraccion, mas aprendizaje comercial.",
    benefitsBody:
      "Una landing bien definida no solo convierte; tambien muestra que mensaje, objecion o audiencia necesita ajuste.",
    benefits: [
      ["Mensaje consistente", "El recorrido continua la promesa de la fuente de trafico."],
      ["Conversion medible", "La accion principal queda clara y rastreable."],
      ["Validacion rapida", "Permite probar una oferta antes de construir un ecosistema mayor."],
      ["Mejor seguimiento", "El formulario puede capturar datos utiles para ventas."],
    ],
    useCases: [
      ["Campañas pagadas", "Pagina enfocada para trafico desde Google, Meta, LinkedIn u otros canales."],
      ["Lanzamiento de servicio", "Validar una nueva oferta con una narrativa completa."],
      ["Captacion B2B", "Recoger leads con preguntas que ayuden a priorizar contacto."],
      ["Eventos o demos", "Concentrar registro, informacion y confirmacion en una experiencia clara."],
    ],
    processTitle: "Una hipotesis clara antes de diseñar la pagina.",
    processBody:
      "Definimos que necesita creer la audiencia para avanzar y que evidencia puede sostenerlo.",
    process: [
      ["Oferta y audiencia", "Precisamos promesa, objeciones, fuente de trafico y conversion esperada."],
      ["Narrativa", "Ordenamos argumentos y prueba segun el nivel de conocimiento del visitante."],
      ["Diseño y copy", "Construimos secciones con foco en comprension, confianza y accion."],
      ["Desarrollo y medicion", "Implementamos una experiencia rapida, enfocada y rastreable."],
      ["Iteracion", "Dejamos una base preparada para mejorar con datos cuando exista trafico suficiente."],
    ],
    approachTitle: "Conversion sin exagerar la promesa.",
    approachBody:
      "La pagina debe persuadir con claridad, no con ruido. Priorizamos especificidad, orden y friccion controlada.",
    approachItems: [
      ["Match de mensaje", "La promesa de entrada se mantiene en el hero."],
      ["Objeciones", "El contenido anticipa dudas reales antes del formulario."],
      ["Microcopy", "Los CTAs explican que obtiene la persona al avanzar."],
      ["Eventos", "La medicion ayuda a entender donde se detiene el usuario."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "JERARQUIA",
        title: "Una idea central conduce toda la pagina.",
        body: "El diseño reduce alternativas y mantiene coherencia entre mensaje, prueba y accion.",
      },
      {
        image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
        label: "CAPTURA",
        title: "La conversion conserva contexto util.",
        body: "El formulario puede calificar la oportunidad y preparar un seguimiento relevante.",
      },
    ],
    faqs: [
      ["Necesito tener una campaña activa?", "No. Tambien puede utilizarse para validar una oferta, presentar un servicio especifico o concentrar una accion comercial."],
      ["Pueden conectarla con CRM o automatizaciones?", "Si. Definimos que datos se capturan y que seguimiento debe activarse despues del envio."],
      ["Incluye pruebas A/B?", "La pagina puede quedar preparada para iterar. Una prueba requiere suficiente trafico y una hipotesis concreta para producir aprendizaje util."],
      ["Cuanto contenido necesita una landing?", "El necesario para sostener la decision. Algunas ofertas requieren pocos bloques; otras necesitan prueba, FAQs y comparaciones."],
      ["Puede ser parte de una web existente?", "Si. Puede vivir como una pagina independiente o integrarse al sitio actual segun la estrategia de campaña."],
    ],
    relatedSlugs: ["web-corporativa", "seo-mantenimiento", "automatizacion"],
    ctaTitle: "Demos a tu campaña una pagina construida para convertir.",
    ctaBody:
      "Comparte la oferta, la audiencia, el origen del trafico y la accion que quieres medir.",
  },
  "e-commerce": {
    seoTitle: "Desarrollo de e-commerce para vender online",
    seoDescription:
      "E-commerce con catalogo claro, compra rapida, identidad propia e integraciones para operar mejor.",
    serviceType: "Diseño y desarrollo de e-commerce",
    heroBenefits: ["Catalogo claro", "Checkout simple", "Operacion conectada"],
    problemTitle: "La tienda vende menos cuando comprar exige demasiado esfuerzo.",
    problemBody:
      "Categorias confusas, fichas incompletas o pasos innecesarios aumentan dudas y abandono antes del pago.",
    solutionTitle: "Una experiencia de compra clara desde el catalogo hasta la postventa.",
    solutionBody:
      "Diseñamos e-commerce con estructura comercial, identidad, checkout y conexiones operativas segun el modelo del negocio.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "El servicio de e-commerce de Nuvik Digital consiste en diseñar y desarrollar tiendas online con catalogo organizado, fichas claras, compra responsive, pagos e integraciones operativas. Esta pensado para marcas que necesitan vender y administrar mejor su canal digital.",
    fitTitle: "Cuando comprar exige demasiadas decisiones o demasiada confianza.",
    fitBody:
      "Un e-commerce debe facilitar descubrimiento, comparacion, pago y seguimiento, sin separar la experiencia de la operacion.",
    signals: [
      ["Catalogo dificil de explorar", "Categorias, filtros o fichas no ayudan a encontrar el producto adecuado."],
      ["Abandono en compra", "El recorrido suma dudas, pasos o informacion tardia antes del pago."],
      ["Operacion desconectada", "Inventario, pedidos y seguimiento dependen de tareas manuales entre sistemas."],
      ["Marca generica", "La tienda se percibe igual a cualquier plantilla y no sostiene confianza."],
    ],
    deliverablesTitle: "Una tienda diseñada desde el catalogo hasta la postventa.",
    deliverablesBody:
      "La experiencia comercial y la operacion se definen juntas para evitar una tienda atractiva pero dificil de administrar.",
    deliverables: [
      ["Arquitectura de catalogo", "Categorias, atributos, filtros y relaciones definidos segun como compra la audiencia."],
      ["Fichas de producto", "Informacion, variantes, argumentos y acciones ordenados para reducir dudas."],
      ["Experiencia de compra", "Carrito, checkout y estados con informacion clara en cada decision."],
      ["Identidad aplicada", "Sistema visual propio para que la tienda no se perciba como una plantilla generica."],
      ["Integraciones esenciales", "Pagos, inventario, correo y seguimiento conectados segun el alcance."],
      ["Medicion base", "Eventos de catalogo, carrito y conversion preparados para analizar mejoras."],
    ],
    benefitsTitle: "Una tienda que tambien es operable.",
    benefitsBody:
      "Vender online no termina en el checkout. La experiencia debe cuidar tambien inventario, seguimiento y lectura comercial.",
    benefits: [
      ["Menos friccion de compra", "El usuario entiende producto, precio, envio y accion sin buscar demasiado."],
      ["Catalogo mas facil de mantener", "Atributos y categorias quedan definidos con criterio."],
      ["Mejor confianza", "La identidad y el contenido reducen percepcion de improvisacion."],
      ["Operacion mas ordenada", "Pedidos, pagos y estados pueden conectarse con herramientas internas."],
    ],
    useCases: [
      ["Tiendas de producto fisico", "Catalogo, variantes, inventario, pagos y despacho."],
      ["Venta B2B", "Catalogos con consulta, cotizacion o compra segun tipo de cliente."],
      ["Marcas boutique", "Experiencia visual propia para productos con valor de marca."],
      ["Canales mixtos", "Venta online conectada con procesos internos o atencion humana."],
    ],
    processTitle: "Diseñamos la compra y la operacion como un mismo sistema.",
    processBody:
      "El proyecto considera catalogo, contenido, reglas comerciales y responsabilidades internas.",
    process: [
      ["Modelo comercial", "Revisamos productos, variantes, precios, promociones, despacho y devoluciones."],
      ["Arquitectura y prototipo", "Validamos como se descubre, evalua y compra cada tipo de producto."],
      ["Diseño de tienda", "Aplicamos identidad, jerarquia y componentes de compra responsive."],
      ["Construccion e integracion", "Desarrollamos la experiencia y conectamos servicios definidos."],
      ["Carga, QA y lanzamiento", "Probamos catalogo, pagos, correos, estados y escenarios de error."],
    ],
    approachTitle: "Catalogo primero, tecnologia despues.",
    approachBody:
      "La plataforma se elige segun catalogo, operacion e integraciones. No al reves.",
    approachItems: [
      ["Estructura de productos", "Atributos y variantes preparados para comprar sin confusion."],
      ["Checkout claro", "Menos pasos y mensajes precisos durante la compra."],
      ["Integraciones", "Pagos, inventario y notificaciones segun necesidad real."],
      ["Rendimiento", "Imagenes y codigo optimizados para no frenar la compra."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "EXPERIENCIA DE COMPRA",
        title: "El producto mantiene el foco.",
        body: "La interfaz organiza informacion, variantes y acciones sin ruido innecesario.",
      },
      {
        image: "/assets/sections/dar-io-showcase-2026-06-23.webp",
        label: "OPERACION",
        title: "La venta continua despues del checkout.",
        body: "Pedidos, inventario y resultados necesitan una lectura operativa consistente.",
      },
    ],
    faqs: [
      ["Trabajan con plataformas existentes?", "Si. La eleccion depende del catalogo, operacion, integraciones y nivel de personalizacion requerido."],
      ["Incluye carga de productos?", "Definimos volumen, calidad de la informacion y responsabilidades dentro del alcance. Tambien podemos preparar estructuras para carga eficiente."],
      ["Que medios de pago se pueden integrar?", "Depende del pais, moneda, modelo comercial y proveedor elegido. Validamos requisitos y experiencia antes de implementar."],
      ["Se puede conectar con inventario?", "Si, cuando existe una fuente confiable y acceso tecnico. Tambien se puede planificar como una segunda etapa."],
      ["Incluye SEO para productos?", "Incluye estructura basica, metadatos y jerarquia. Una estrategia SEO de catalogo se define segun volumen y competencia."],
    ],
    relatedSlugs: ["automatizacion", "integraciones", "dashboards"],
    ctaTitle: "Diseñemos una tienda que tambien funcione para tu operacion.",
    ctaBody:
      "Cuentanos sobre el catalogo, el proceso actual de venta y las herramientas que intervienen despues del pago.",
  },
  "rediseno-web": {
    seoTitle: "Rediseño web para empresas",
    seoDescription:
      "Rediseño web para actualizar narrativa, experiencia, performance y estructura sin perder activos importantes.",
    serviceType: "Rediseño web",
    heroBenefits: ["Auditoria previa", "Migracion cuidada", "Mejor experiencia"],
    problemTitle: "El sitio sigue online, pero dejo de cumplir su funcion.",
    problemBody:
      "Una web vieja puede seguir recibiendo visitas y aun asi transmitir una version incompleta, lenta o confusa del negocio.",
    solutionTitle: "Rediseñar con criterio, no empezar de cero por impulso.",
    solutionBody:
      "Auditamos lo existente, conservamos lo que aporta valor y reconstruimos contenido, diseño y tecnologia donde hay friccion real.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "El rediseño web de Nuvik Digital actualiza sitios existentes para mejorar claridad, conversion, velocidad, estructura y consistencia visual. Incluye auditoria del sitio actual, nueva arquitectura, sistema visual, desarrollo responsive y control de migracion.",
    fitTitle: "Cuando el sitio actual sigue en linea, pero dejo de cumplir su funcion.",
    fitBody:
      "Un rediseño profesional conserva activos utiles, corrige problemas estructurales y actualiza la experiencia sin perder continuidad.",
    signals: [
      ["Mensaje desalineado", "La empresa cambio, pero la web continua explicando una version anterior del negocio."],
      ["Recorridos confusos", "Contenido importante existe, aunque resulta dificil encontrarlo o relacionarlo."],
      ["Base tecnica limitada", "El sitio es lento, fragil o dificil de actualizar sin romper consistencia."],
      ["Percepcion debil", "La experiencia visual no acompaña el nivel actual de la marca o servicio."],
    ],
    deliverablesTitle: "Una reconstruccion guiada por evidencia.",
    deliverablesBody:
      "Auditamos antes de reemplazar. Cada cambio debe mejorar comprension, confianza, conversion o mantenibilidad.",
    deliverables: [
      ["Auditoria integral", "Contenido, navegacion, identidad, rendimiento y comportamiento responsive revisados."],
      ["Plan de conservacion", "Paginas, mensajes, URLs y activos clasificados para mantener, transformar o retirar."],
      ["Nueva arquitectura", "Recorridos y jerarquias alineados con la oferta actual."],
      ["Nuevo sistema visual", "Componentes y reglas que actualizan la marca sin perder reconocimiento."],
      ["Desarrollo responsive", "Implementacion optimizada para desktop, tablet y mobile."],
      ["Migracion controlada", "Publicacion, redirecciones, formularios y validaciones organizados para reducir riesgo."],
    ],
    benefitsTitle: "Actualizar sin perder lo que ya funciona.",
    benefitsBody:
      "El rediseño debe mejorar el rendimiento comercial y tecnico sin borrar señales valiosas acumuladas.",
    benefits: [
      ["Mayor claridad", "La oferta actual se entiende con menos esfuerzo."],
      ["Mejor experiencia", "La navegacion, lectura y accion se vuelven mas directas."],
      ["Continuidad SEO", "Se cuidan URLs, contenido y redirecciones importantes."],
      ["Base mantenible", "El nuevo sistema facilita cambios futuros sin improvisar."],
    ],
    useCases: [
      ["Web desactualizada", "Sitios que ya no representan la oferta o nivel de la empresa."],
      ["Migracion tecnica", "Cambio de plataforma, performance o estructura."],
      ["Reordenamiento comercial", "Servicios, productos o audiencias que necesitan nueva jerarquia."],
      ["Mejora de conversion", "Recorridos con visitas, pero baja accion comercial."],
    ],
    processTitle: "Rediseñar sin borrar lo que ya genera valor.",
    processBody:
      "El proyecto separa problemas de contenido, experiencia, identidad y tecnologia para resolverlos con precision.",
    process: [
      ["Diagnostico", "Revisamos sitio, analitica disponible, objetivos actuales y limitaciones tecnicas."],
      ["Nueva arquitectura", "Reordenamos contenido y recorridos manteniendo los activos que sostienen confianza."],
      ["Sistema visual", "Diseñamos componentes y reglas responsive para la nueva experiencia."],
      ["Desarrollo", "Reconstruimos la web con foco en velocidad, claridad y mantenibilidad."],
      ["Migracion y control", "Validamos URLs, formularios, SEO esencial y comportamiento antes del cambio."],
    ],
    approachTitle: "Cambiar lo necesario, conservar lo valioso.",
    approachBody:
      "Un rediseño serio distingue problemas reales de preferencias visuales. La decision se toma con evidencia y objetivo comercial.",
    approachItems: [
      ["Inventario de activos", "Identificamos paginas, textos, imagenes y URLs que deben cuidarse."],
      ["Arquitectura nueva", "Reordenamos recorridos sin perder contexto."],
      ["Sistema visual", "La nueva estetica se aplica con reglas, no pieza por pieza."],
      ["Control de salida", "Validamos formularios, enlaces, metadatos y performance antes de publicar."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "NUEVO SISTEMA",
        title: "Consistencia para todas las paginas.",
        body: "El rediseño establece reglas que facilitan evolucion y mantenimiento.",
      },
      {
        image: "/assets/hero/nuvik-operations.webp",
        label: "JERARQUIA",
        title: "Mas claridad sin reducir profundidad.",
        body: "La informacion compleja se organiza para que cada audiencia encuentre su recorrido.",
      },
    ],
    faqs: [
      ["Se pierde el posicionamiento existente?", "Planificamos conservacion de URLs, redirecciones y contenido relevante. Aun asi, cualquier migracion debe monitorearse despues de publicar."],
      ["Tenemos que reemplazar todo?", "No. La auditoria identifica que funciona y merece conservarse. Rediseñar no significa descartar sin criterio."],
      ["Puede hacerse por etapas?", "Si, si la arquitectura y la tecnologia permiten separar secciones sin generar experiencias inconsistentes."],
      ["Incluye mejora de textos?", "Si. Reorganizamos y reescribimos copy cuando el contenido actual no explica bien la oferta."],
      ["Que pasa con formularios y medicion?", "Se revisan durante QA para no perder puntos de conversion ni señales importantes despues del cambio."],
    ],
    relatedSlugs: ["web-corporativa", "seo-mantenimiento", "landing-pages"],
    ctaTitle: "Revisemos que esta frenando hoy a tu sitio.",
    ctaBody:
      "Comparte la URL actual, los objetivos que cambiaron y los problemas que escucha tu equipo o tus clientes.",
  },
  "marca-personal": {
    seoTitle: "Identidad digital y branding para profesionales",
    seoDescription:
      "Identidad digital para ordenar posicionamiento, narrativa, sitio y presencia profesional con claridad.",
    serviceType: "Identidad digital",
    heroBenefits: ["Posicionamiento claro", "Narrativa propia", "Sistema visual"],
    problemTitle: "La experiencia existe, pero no se entiende con rapidez.",
    problemBody:
      "Cuando la presencia digital esta repartida en redes, documentos o referencias sueltas, cuesta explicar el criterio y la propuesta de valor.",
    solutionTitle: "Una identidad digital con posicionamiento y estructura.",
    solutionBody:
      "Ordenamos mensaje, contenido, diseño y sitio para que la audiencia correcta entienda que haces, como piensas y como contactar.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "La identidad digital de Nuvik Digital ayuda a profesionales, estudios o marcas pequeñas a ordenar posicionamiento, narrativa, diseño y presencia web. El objetivo es comunicar experiencia con claridad, crear confianza y facilitar contacto sin depender solo de redes sociales.",
    fitTitle: "Cuando la experiencia necesita una narrativa propia.",
    fitBody:
      "Una identidad digital solida convierte trayectoria, criterio y oferta en una presencia reconocible, sin depender de formulas vacias.",
    signals: [
      ["Perfil disperso", "La experiencia esta repartida entre redes, documentos y conversaciones sin un centro claro."],
      ["Oferta ambigua", "La audiencia reconoce capacidad, pero no entiende cuando o por que avanzar."],
      ["Percepcion generica", "La presencia actual se parece a la de cualquier profesional o estudio del sector."],
      ["Contacto poco claro", "Quien llega interesado no sabe que pedir, que esperar o como iniciar."],
    ],
    deliverablesTitle: "Posicionamiento, contenido e identidad trabajando juntos.",
    deliverablesBody:
      "La pagina se construye alrededor de una perspectiva diferenciada y evidencia concreta.",
    deliverables: [
      ["Posicionamiento", "Idea central, audiencia, temas y propuesta profesional definidos con precision."],
      ["Narrativa editorial", "Historia, enfoque, servicios y casos organizados para sostener credibilidad."],
      ["Sistema visual", "Tipografia, composicion y recursos visuales coherentes con la percepcion buscada."],
      ["Estructura web", "Secciones para explicar oferta, enfoque, experiencia y contacto."],
      ["Copy principal", "Titulares y textos diseñados para claridad, no para sonar genericos."],
      ["Base publicable", "Experiencia responsive preparada para contenidos, contacto y evolucion."],
    ],
    benefitsTitle: "Una presencia que ayuda a elegirte con mas contexto.",
    benefitsBody:
      "El objetivo es que la audiencia entienda tu enfoque antes de escribirte y llegue con una expectativa mas clara.",
    benefits: [
      ["Mas claridad", "La propuesta se explica en un centro propio y ordenado."],
      ["Mejor confianza", "La identidad y el contenido respaldan el criterio profesional."],
      ["Menos dependencia de redes", "El sitio funciona como base estable para busqueda, referencias y contacto."],
      ["Contacto mas calificado", "La experiencia orienta a la audiencia adecuada hacia una accion concreta."],
    ],
    useCases: [
      ["Profesionales expertos", "Presencia para explicar enfoque, servicios y criterio de trabajo."],
      ["Consultores o estudios", "Sitio y narrativa para convertir experiencia en oportunidades."],
      ["Lanzamiento de oferta", "Identidad y pagina para presentar un nuevo servicio."],
      ["Reposicionamiento", "Actualizar percepcion cuando la trayectoria o audiencia cambio."],
    ],
    processTitle: "Extraemos una idea clara de una trayectoria compleja.",
    processBody:
      "Trabajamos con experiencia real, no con frases aspiracionales que podrian pertenecer a cualquiera.",
    process: [
      ["Material y contexto", "Revisamos experiencia, proyectos, audiencias, temas y objetivos."],
      ["Territorio y mensaje", "Definimos una posicion defendible y la estructura que la demuestra."],
      ["Sistema editorial", "Diseñamos como conviven contenido, casos, ideas y llamados a la accion."],
      ["Diseño y desarrollo", "Construimos la experiencia responsive con identidad propia."],
      ["Publicacion", "Dejamos una base lista para actualizar y evolucionar."],
    ],
    approachTitle: "Criterio antes que autopromocion.",
    approachBody:
      "Evitamos el tono vacio. La presencia se construye con perspectiva, pruebas y una accion clara.",
    approachItems: [
      ["Mensaje central", "Una idea que ordena oferta, experiencia y contenido."],
      ["Prueba visible", "Casos, servicios o evidencia organizada segun el alcance disponible."],
      ["Sistema visual", "Diseño sobrio, reconocible y facil de sostener."],
      ["Contacto", "CTAs pensados para iniciar conversaciones con contexto."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "IDENTIDAD",
        title: "Una presencia que no depende de plantillas.",
        body: "El sistema visual amplifica una perspectiva propia sin competir con el contenido.",
      },
      {
        image: "/assets/sections/nexus-chatbot-showcase-2026-06-23.webp",
        label: "CONTACTO",
        title: "Cada oportunidad llega con mejor contexto.",
        body: "La experiencia puede orientar consultas y preparar una conversacion mas relevante.",
      },
    ],
    faqs: [
      ["Necesito tener una marca definida?", "No. El proyecto puede incluir la definicion de posicionamiento y lenguaje visual digital a partir de experiencia, oferta y objetivos."],
      ["Incluye estrategia de redes sociales?", "La pagina puede ordenar temas y narrativa, pero una estrategia continua de publicacion se define como un alcance independiente."],
      ["Puedo actualizar casos y contenidos?", "Si. La estructura se diseña para incorporar nuevos proyectos, ideas o apariciones manteniendo consistencia."],
      ["El slug sigue siendo marca personal?", "La ruta puede mantenerse por continuidad, pero el enfoque visible se trabaja como identidad digital y posicionamiento profesional."],
      ["Sirve para empresas pequeñas?", "Si. Tambien puede aplicarse a estudios, equipos expertos o marcas que necesitan una presencia clara y creible."],
    ],
    relatedSlugs: ["web-corporativa", "landing-pages", "seo-mantenimiento"],
    ctaTitle: "Construyamos una presencia que represente tu criterio.",
    ctaBody:
      "Cuentanos que experiencia quieres poner en valor, a quien necesitas llegar y que oportunidades buscas generar.",
  },
  "seo-mantenimiento": {
    seoTitle: "SEO tecnico y mantenimiento web",
    seoDescription:
      "SEO tecnico y mantenimiento para mejorar indexacion, rendimiento, estructura, contenido y estabilidad del sitio.",
    serviceType: "SEO tecnico y mantenimiento web",
    heroBenefits: ["Base indexable", "Performance", "Mejora continua"],
    problemTitle: "Publicar una web no garantiza que se encuentre ni que siga funcionando bien.",
    problemBody:
      "Sin revision tecnica, contenido actualizado y mantenimiento, el sitio puede perder velocidad, romper enlaces o quedar fuera de oportunidades de busqueda.",
    solutionTitle: "Una base tecnica clara y un ciclo de evolucion.",
    solutionBody:
      "Auditamos, priorizamos y corregimos problemas de estructura, indexacion, performance y contenido para que la web siga cumpliendo su funcion.",
    aiSummaryTitle: "Respuesta corta para IA",
    aiSummaryBody:
      "El servicio de SEO tecnico y mantenimiento web de Nuvik Digital revisa indexacion, metadatos, estructura, rendimiento, contenido, enlaces y estabilidad del sitio. Su objetivo es mantener una web entendible para buscadores, asistentes de IA y usuarios reales.",
    fitTitle: "Cuando publicar no es suficiente para mantener una web util.",
    fitBody:
      "El rendimiento organico y tecnico requiere una base ordenada, medicion y mejoras continuas sobre contenido y experiencia.",
    signals: [
      ["Visibilidad limitada", "Las paginas importantes no aparecen para busquedas relacionadas con la oferta."],
      ["Problemas tecnicos", "Carga lenta, errores de indexacion o estructura inconsistente afectan experiencia y rastreo."],
      ["Sitio estancado", "La web se publico, pero no existe un ciclo para actualizar, medir y mejorar."],
      ["Contenido dificil de entender", "Buscadores, asistentes y usuarios no encuentran respuestas claras en la pagina."],
    ],
    deliverablesTitle: "Una base tecnica clara y un plan de evolucion.",
    deliverablesBody:
      "Separamos problemas de rastreo, contenido, rendimiento y mantenimiento para priorizar acciones con impacto.",
    deliverables: [
      ["Auditoria priorizada", "Hallazgos tecnicos y de contenido organizados por impacto, dependencia y esfuerzo."],
      ["Correcciones esenciales", "Metadatos, estructura, indexacion, enlaces y rendimiento ajustados segun alcance."],
      ["Schema y datos estructurados", "Marcado JSON-LD cuando corresponde a la pagina y al contenido visible."],
      ["Mapa de oportunidades", "Paginas y temas vinculados con intencion de busqueda y oferta real."],
      ["Revision AI SEO", "Bloques extractables, FAQs y claridad semantica para asistentes y buscadores."],
      ["Ciclo de mantenimiento", "Revision periodica de errores, rendimiento, contenido y cambios tecnicos."],
    ],
    benefitsTitle: "Mejor base para ser encontrado, entendido y mantenido.",
    benefitsBody:
      "El SEO tecnico no reemplaza una oferta clara, pero evita que una buena pagina quede limitada por problemas evitables.",
    benefits: [
      ["Mejor rastreo", "Paginas importantes quedan mas claras para buscadores."],
      ["Mejor experiencia", "Velocidad, estructura y enlaces reducen friccion."],
      ["Contenido mas util", "Las secciones responden preguntas reales con menos ambiguedad."],
      ["Menos riesgo operativo", "El mantenimiento detecta fallas antes de que afecten conversion o indexacion."],
    ],
    useCases: [
      ["Sitios recien publicados", "Revisar que la base tecnica este lista despues del lanzamiento."],
      ["Webs con baja visibilidad", "Auditar estructura, contenido y señales esenciales."],
      ["Migraciones", "Controlar redirecciones, canonicals, sitemap y metadatos."],
      ["Sitios vivos", "Mantener performance, contenido y funcionamiento en el tiempo."],
    ],
    processTitle: "Mejorar con diagnostico, no con una lista automatica.",
    processBody:
      "Las herramientas detectan señales; la prioridad se decide segun negocio, arquitectura y experiencia.",
    process: [
      ["Relevamiento", "Revisamos objetivos, paginas criticas, plataforma, analitica y estado de indexacion."],
      ["Diagnostico tecnico", "Analizamos rastreo, estructura, rendimiento, metadatos y enlaces."],
      ["Revision de contenido", "Evaluamos claridad, headings, FAQs, intencion de busqueda y AI SEO."],
      ["Implementacion priorizada", "Corregimos primero bloqueos y oportunidades que sostienen el resto del trabajo."],
      ["Seguimiento", "Monitoreamos cambios y definimos el siguiente ciclo con evidencia."],
    ],
    approachTitle: "SEO tecnico, contenido claro y mantenimiento real.",
    approachBody:
      "No prometemos posiciones. Trabajamos sobre factores verificables que mejoran comprension, rastreo y experiencia.",
    approachItems: [
      ["Indexacion", "Canonicals, sitemap, robots y estructura revisados."],
      ["Performance", "Imagenes, carga, layout y recursos optimizados sin sacrificar calidad visual."],
      ["Schema", "Datos estructurados alineados con el contenido visible."],
      ["AI SEO", "Respuestas directas, FAQs y contexto semantico para extraccion."],
    ],
    gallery: [
      {
        image: "/assets/sections/sites.webp",
        label: "BASE TECNICA",
        title: "Estructura diseñada para personas y buscadores.",
        body: "Jerarquia, contenido y rendimiento deben funcionar como un mismo sistema.",
      },
      {
        image: "/assets/sections/interoperability.webp",
        label: "MEDICION",
        title: "Fuentes conectadas para priorizar mejoras.",
        body: "Los datos tecnicos y de comportamiento ayudan a decidir donde intervenir primero.",
      },
    ],
    faqs: [
      ["Pueden garantizar una posicion en Google?", "No. Nadie controla los resultados. Si podemos mejorar la base tecnica, relevancia y experiencia con practicas verificables."],
      ["SEO y mantenimiento son lo mismo?", "No. El mantenimiento protege funcionamiento y evolucion; SEO organiza señales tecnicas y de contenido para mejorar descubrimiento. Se complementan."],
      ["Cuando se ven resultados?", "Depende del estado inicial, competencia, frecuencia de rastreo y alcance de los cambios. Evitamos prometer plazos sin diagnostico."],
      ["Incluye AI SEO o GEO?", "Podemos revisar estructura extractable, FAQs, definiciones y schema para que la pagina sea mas comprensible para asistentes de IA."],
      ["Necesito Search Console?", "Ayuda mucho para priorizar con datos reales, pero tambien podemos comenzar con auditoria tecnica y revision de contenido visible."],
    ],
    relatedSlugs: ["web-corporativa", "rediseno-web", "landing-pages"],
    ctaTitle: "Revisemos que impide que tu web rinda mejor.",
    ctaBody:
      "Comparte la URL, tus paginas prioritarias y los problemas tecnicos o de visibilidad que ya identificaste.",
  },
};
