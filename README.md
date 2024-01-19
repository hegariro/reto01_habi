## RETO TÉCNICO - FullStack DEVELOPER
Este pequeño documento describe un desafío de programación que quisiéramos que nos ayudes a desarrollar, para conocer mejor tus habilidades y entender si tu conocimiento y experiencia son adecuados para lo que estamos buscando. 

### Requerimiento general:
- La empresa ficticia “HABITASK S.A.” desea realizar una aplicación web que permita gestionar la información de sus usuarios y las tareas que tiene asignadas, cada usuario podrá crear sus tareas asignadas asi como recibir tareas de los otros usuarios, por seguridad de la información el usuario tendrá que autenticarse en la aplicación con sus credenciales, para esto el personal a cargo del proyecto ha identificado los siguientes requerimientos:

### Consideraciones Generales
- Escribir código limpio, legible, desacoplado y fácil de mantener con las mejores prácticas que conozcas.
- No olvidar realizar comentarios en el código si lo consideras necesario.
- Todas las relaciones del diseño de la base de datos deben verse reflejadas en los modelos del backend usando el ORM de su preferencia.

### Requerimientos Técnicos
- La empresa da libertad al desarrollador de elegir la arquitectura, lenguajes de programación o frameworks a usar dependiendo de los requerimientos funcionales.
- Nos encantaría conocer el avance del proyecto desde su inicio hasta la entrega, por ello nos encantaría que el código sea versionado mediante una plataforma git pública.
- Queremos ver la aplicación final desplegada en plataformas como Heroku, AWS, Azure, cloudflare, etc (tomando capas gratuitas).

### Requerimiento Funcionales
La Empresa quiere lanzar esta aplicación como colaborativa, por lo cual contará con un solo perfil de usuario. 

#### Autenticación
- El visitante del aplicativo tendrá la opción de realizar un registro básico y único usando un correo electrónico, nombre y contraseña (bonus, registro por redes sociales).
    * El email debe estar bien formado.
    * La contraseña debe tener criterios para considerarla segura (letras mayúsculas, minúsculas, números y un caracter especial).
    * El nombre debe tener máximo 30 caracteres.
- El usuario debe tener la opción de iniciar sesión en la aplicación usando su correo y contraseña.
- Una vez logueado, este puede ver sus datos y la opción de cerrar sesión.
- Por seguridad de la aplicación, se solicita que se realicen las validaciones correspondientes de que el usuario exista y sus datos sean correctos para permitirle acceso.

#### Módulo de tareas
- La estructura de la tarea debe tener al menos un título, usuario creador, usuario asignado, estado bool para indicar si está completado o no, fecha creado y fecha completado.
- El usuario logueado tendrá a su disposición el módulo de tareas con el cual puede interactuar:
    * Puede crear tareas y asignarse a si mismo o a los otros usuarios registrados.
    * Puede editar solo las tareas que han sido creadas por su usuario.
    * Puede eliminar solo las tareas que han sido creadas su usuario y que no hayan sido marcadas como completadas.
    * Solo podrá marcar como completadas las tareas que le han sido asignadas.

#### Módulo de notificaciones
- Contar con un módulo para enviar una notificación al usuario creador de la tarea, cuando ha sido marcada como completada.
- La notificación puede ser un email u otra forma de comunicación (se deja abierto al desarrollador la elección).

#### Visualización de Datos
- Para visualizar los datos de los usuarios y tareas de forma ágil, se requiere la realización de una interfaz que contenga una tabla de datos o DataTable, que debe contener una sección de filtros y paginación bajo el siguiente detalle:
    * Se solicita un filtro general (campo de texto) que busque por nombre, y email.
    * La tabla de datos para tareas y usuarios debe tener una paginación del lado del servidor (server side).

#### Opcional
- Por motivos de seguridad de la información, la empresa deja abierta la posibilidad de implementar un sistema de logs para revisar los cambios históricos de los registro de usuarios y creación de tareas.
- Si consideras que podrías implementar alguna funcionalidad adicional para demostrar tus capacidades, nos encantaría verte en acción.

#### Consideraciones Finales
- La empresa posee una estimación de tiempos acorde a los requerimientos solicitados al aspirante del proyecto, para que la entrega cumpla con los parámetros de aceptación se recomienda lo siguiente:
    * Dar prioridad a la parte funcional en lugar de la visual.
    * Nos encantaría ver tu proyecto en un repositorio en GIT público.
    * Nos encantaría que nos envíes el resultado de esta prueba entre 1 o 2 días.
    * Luego de que nos envíes tu proyecto, coordinaremos una reunión con alguien de nuestro equipo técnico para hacerte algunas preguntas y para que nos enseñes tu código tu mismo.
    * Es importante recalcar que estamos buscando conocer mejor tus habilidades, por lo que, es necesario que el proyecto sea realizado desde cero y con las mejores prácticas de desarrollo de software posibles.
