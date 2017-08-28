## Atributos de calidad seleccionados:

* QA1: _Disponibilidad de Servicio y Datos_ Estudiante: _Jonathan Zapata Castaño y Pablo Quijano Jaramillo_

* QA2: _Seguridad de la Aplicación_ Estudiante: _Mauricio Hoyos Ardila_

* QA3: _Rendimiento de la aplicación_ Estudiante: _Mayerli López_

## QA1: Disponibilidad de servicio

### Marco de referencia:

*a. ¿Qué es?*

- La alta disponibilidad del servicio es la capacidad de un sistema de soportar la recepción de un gran número de peticiones al mismo tiempo sin perder su habilidad de respuesta, además de permitir ser accedido desde [cualquier lugar](https://www.igi-global.com/dictionary/service-availability/44258). La alta disponibilidad es crítica para esta capa, pues es donde se realizan las operaciones concernientes a la lógica del negocio, y es la única que tiene acceso a los datos, por lo que es crucial propiciar el más alto porcentaje posible de uptime, el cual se determina según la concurrencia de usuarios por segundo, y por lo general es del 99.999.. %, y la cantidad de 9's en la parte decimal depende principalmente de las necesidades del negocio.

*b. ¿Qué patrones se pueden emplear?*

Teniendo en cuenta las slides y el artículo "Ensuring High Availability for
Your Enterprise Web Applications" proveídos con la información concerniente a HA, tenemos los siguientes patrones:

+ Failover: Es la capacidad del sistema de ser operativo en un evento de un fallo de un nodo o componente, cambiando de forma transparente a otro componente de copia de seguridad.
+ Failback: Usualmente sucede después del failover, en el que el nodo o sitio primario se recuperará de la falla y estará completamente operativo.
+ Replication (Active replication, Passive replication): Esto implica copiar los datos del nodo primario a todas sus copias para que sea fácil de cambiar en caso de failover.
+ Redundancy: Habrán múltiples componentes redundantes en el sistema para facilitar el failover.
+ Virtualization: Las interrupciones causadas por el hardware y el sistema operativo pueden reducirse mediante el empleo de la virtualización.
+ Continuous maintenance: Las actividades de mantenimiento regular de los componentes es clave para mantener la infraestructura en buena salud. Existen 3 tipos: mantenimiento correctivo, mantenimiento preventivo y mantenimiento de perfeccionamiento
+ Graceful and step-wise functionality degradation pattern: Este diseño minimiza el impacto durante los escenarios de disponibilidad.
+ Asynchronous and services-based integration with external	interfaces: La opresión del acoplamiento de la aplicación en sus interfaces externas puede ser reducida adoptando un patrón de integración asincrónico (Utilizando AJAX).
+ Stateless and	lightweight	application	components: Cuanto más componentes de la aplicación sean ligeros, más se pueden replicar, y por lo tanto, más posibilidades de disponibilidad que tienen.
+ Continuous incremental code and data replication: Uno de los principales principios de disponibilidad es el código y la replicación de datos.
+ Availability trade-off using the CAP theorem (CAP: Consistency, Availibility,	Partition Tolerance): El teorema consiste en los siguientes principios:
● La consistencia proporciona datos consistentes en todos los nodos del clúster.
● La Disponibilidad garantiza que el clúster esté siempre operativo.
● La tolerancia de partición garantiza que el clúster está operativo a pesar particiones en la red.

*c. Especificación mediante escenarios*


| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| Fuente de Estimulo | Origen	interno	o	externo	de	fallos (Gente, HW, SW, Infraestructura física, ambiente físico) |
| Estimulo | Falla	concreta,	que	puede	ser: Omisión, Crash, Incorrect Timing, Incorrect Response |
| Artefacto | Componente	altamente	disponible:	App,	SO,	BD,	Módulo,	etc. |
| Ambiente |	En	normal,	bajo	la	ocurrencia	de	una	fallo,	en	recuperación,	etc
| Respuesta | Posibles	reacciones	a	un	fallo	del	sistema.	Primero	el	fallo	debe	ser	 detectado,	luego	recuperarse
| Medida de respuesta | Tiempo	de	disponibilidad	en	%.	Tiempo	para	detectar	el	 fallo,	para	corregirlo



*d. ¿Qué tácticas se pueden emplear?*

Detección de Fallas:
* Ping / Echo  
* Monitor
* Heartbeat
* Timestamp
* Sanity Checking
* Condition Monitoring
* Voting
* Exception Detection
* Self-test

**Recuperación ante Fallas**
Preparación y reparación:
* Active Redundancy
* Passive Redundancy
* Spare
* Exception Handling
* Rollback
* Software Upgrade
* Retry
* Ignore Faulty Behavior
* Degradation
* Reconfiguration

![HA Tactics](https://image.prntscr.com/image/i_7RPcLMSXurRw6TMK74cw.jpeg)

*e. Qué herramientas se pueden utilizar para lograrlo*

* pm2 para monitoreo
* haproxy para el balanceo de cargas
* nsh para comunicacion con el file server, es muy manual
* nfs para montar un directorio virtual compartido, tipo dropbox que yo guardo en mi pc y lo manda * automáticamente al cloud
* rsync para el mirroring
* cron para realizar la sicronización de datos cada minuto
* glusterFS para NAS
* protocolos -> ftp, scp, http
* jmeter para métricas
* mondoDB Replication para la base de datos



**2.	Análisis:	Mediante	escenarios	y/o propuesta	en	marco	teorico**

* Disponibilidad de servicio

| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| Fuente de Estimulo | La petición de un Usuario con datos corruptos |
| Estimulo | Se cae el Servidor |
| Artefacto | App |
| Ambiente | En normal
| Respuesta | Volver a lanzar la aplicación notificando al usuario que conserve la paciencia.
| Medida de respuesta | 5 segundos para detectar el fallo, 5 para corregirlo
| **Escenario 2** |  |
| Fuente de Estimulo | Origen	interno	o externo de fallos |
| Estimulo | Server crash |
| Artefacto | App |
| Ambiente | En normal
| Respuesta | Primero	el fallo debe ser detectado,	luego	recuperarse..
| Medida de respuesta | 5 segundos para detectar el fallo, 5 para corregirlo
| **Otros Escenarios *** |
| Bring down the primary node of the application server cluster |● Check session failover ● Check cache replication ● Check session replication |
| Bring down the network interface  | ● Check overall application availability
| Bring down the primary node of the web server cluster | ● Check the availability of global gateway page ● Check the availability of static assets

* Disponibilidad de Datos

| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| Fuente de Estimulo | Problema interno o externo del servidor |
| Estimulo | Se cae el Servidor |
| Artefacto | BD |
| Ambiente | En normal
| Respuesta | Hacer uspo del servidor donde está la base de datos secundaria.
| Medida de respuesta | 5 segundos para detectar el fallo, 5 para corregirlo
| **Escenario 2** |  |
| Fuente de Estimulo | Origen	interno	o externo de fallos |
| Estimulo | Server crash |
| Artefacto | BD |
| Ambiente | En normal
| Respuesta | Primero	el fallo debe ser detectado,	luego	recuperarse..
| Medida de respuesta | 5 segundos para detectar el fallo, 5 para corregirlo





**3.	Diseño:	En	Aplicación	y	en	Sistema.**

*a. Vistas	de	arquitectura.*

* Disponibilidad de Servicio

![Architecture](https://image.prntscr.com/image/CPOsQUD1R2u7wmK9QhoI-A.jpeg)

* Disponibilidad de Datos

![Architecture](https://docs.mongodb.com/manual/_images/replica-set-read-write-operations-primary.bakedsvg.svg)

*b. Patrones	de	arquitectura.*

Disponibilidad de Servicio

- Teniendo en cuenta los **patrones** definidos para escalabilidad en toda la arquitectura y que estos patrones deben ser enfocados en permitir la disponibilidad del servicio, se pueden listar los siguientes según el impacto que tienen sobre esta **capa de servicio**.

+ Distribuited computing pattern :: Debido a que distribuye la carga sobre las diferentes instancias del servidor, nos permite contar con la capacidad de tolerar una falla de uno de los servidores, lo que se traduce en disponibilidad.
+ SOA    ::   Este patrón, además de ser ampliamente utilizado, nos beneficia en gran manera al permitir ser accedidos desde gran número de dispositivos, en cualquier momento y en cualquier lugar, con la gran ventaja de permitir una interacción dinámica en donde no se tiene amarrado al usuario, sino que se le responde cada vez que haga la petición, pero no necesita estar conectado durante todo el tiempo con la aplicación, ni demandando gran cantidad de datos como templates html cada que se haga una petición.
+ Parallel computing pattern :: Este patrón puede ser tomado en cuenta por su principal función, pues nos permite procesar las instrucciones de manera paralela y en consecuencia nos lleva a terminar las operaciones en la mitad del tiempo; lo que resulta en la capacidad para cada servidor de atender  mayor número de usuarios, motivo por el cual beneficia la disponibilidad del servicio, aunque cabe aclarar que este patrón es más enfocado en beneficiar la parte del rendimiento.
+ Messaging pattern :: Debido a que provee una comunicación asíncrona, nos facilita la independencia de la conexión con el usuario, pues podemos realizar operaciones que tomen mucho tiempo en otro servidor, permitiendo al principal enfocarse en las tareas que no demoren tanto tiempo, para así minimizar la carga , y eso sin mencionar que nos ayuda a escalar en integración con otros servicios.


* Según los patrones de disponibilidad definidos por [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/category/availability), se pueden listar al menos 3: Health Endpoint Monitoring, Queue-Based Load Leveling y Throttling

| Patrón | Resumen |
|:--:|:--:|
| Health Endpoint Monitoring | Implement functional checks in an application that external tools can access through exposed endpoints at regular intervals |
| Queue-Based Load Leveling | Use a queue that acts as a buffer between a task and a service that it invokes in order to smooth intermittent heavy loads. |
| Throttling | Control the consumption of resources used by an instance of an application, an individual tenant, or an entire service. |

Disponibilidad de Datos:
* Los servidores de bases de datos deben diseñarse en una configuración agrupada.
* La configuración del clúster de bases de datos debe admitir las siguientes funciones:
	- El clúster de bases de datos debe contener nodos de conmutación por error / standby
	- Sincronización automática de datos en todos los nodos del clúster
	- Capacidad de agregar más nodos en el servidor para aumentar la capacidad de la base de datos sin ningún impacto en las 		  operaciones de la base de datos

c. Best	Practices.

Disponibilidad de Servicio y de datos

Hardware-related best practices
• proactive	monitoring	and	alerting	infrastructure
• hardware	redundancy
• disaster recovery
Software-related best practices
• architecture simple
• Design modular	software	components
• caching strategy
• automation for maintenance activities
Network	availability
• Redundancy links
• monitoring of	network
• failover features
• network-level	fault	detection,	self-recovery,	and	graceful	restart
5R	model	for	high	availability
• Reliability
• Replicability
• Recoverability
• Reporting	and	Monitoring
• Redundancy

 Step-wise functionality degradation pattern
• Asynchronous services-based integration
• Stateless	sessions	and	lightweight	component	design
• Data	replication.

*d. Tácticas.*

Disponibilidad de Servicio
Para la detección de la caída del web server se pueden emplear tácticas de monitoreo para una posterior recuperación del servidor, lo que se hace básicamente es permitir una conexión constante entre el server y el vigilante por medio del _heartbeat_, de esta manera nos podremos dar cuenta de algún fallo y reaccionar de inmediato con un Failback.
Como táctica para la escalabilidad de puede implementar un Manejador de cache distribuído.
Se puede implementar un sistema de replicación del web server como táctica para propiciar el Fault-Tolerance

Disponibilidad de Datos

Para la base de datos usamos un conjunto de réplicas en MongoDB, que son un grupo de procesos mongod que mantienen el mismo conjunto de datos. Los conjuntos de réplicas proporcionan redundancia y alta disponibilidad y son la base de todas las implementaciones de producción.

*e. Herramientas.*

Disponibilidad de Servicio

* pm2 para monitoreo
* haproxy para el balanceo de cargas
* nsh para comunicacion con el file server, es muy manual
* nfs para montar un directorio virtual compartido
* protocolos -> ftp, scp, http

Disponibilidad de Datos

* nsh para comunicacion con el file server, es muy manual
* nfs para montar un directorio virtual compartido, tipo dropbox que yo guardo en mi pc y lo manda * automáticamente al cloud
* rsync para el mirroring
* cron para realizar la sicronización de datos cada minuto
* glusterFS para NAS
* mondoDB Replication para la base de datos

Otras

* jmeter para métricas

*f. Atributos de calidad seleccionados para escalabilidad*

* Disponibilidad de Servicio

Se tuvo en cuenta el Teorema de CAP y seleccionamos Availability y Partition tolerance para _esta_ capa de servicio. Se justifica empezando por el criterio de Disponibilidad, pues es de notar que esta capa es la más crítica a la hora de la conexión, ya que si se llega a presentar un fallo, se perdería la interacción con el usuario, presentándose una insatisfacción lo que desencadenaría una serie de consecuencias en el entorno real. Asumiendo que como premisa está la palabra escalabilidad, tenemos que pensar en un futuro con un incremento de peticiones por segundo, por lo que necesitamos la capacidad en el sistema de repartir su carga entre las diferentes instancias del servidor, y permitir una mejor experiencia con el usuario, razón por la cual escogimos Partitioning para permitir la escalabilidad.

* Disponibilidad de Datos

Mientras que en la base de datos, se contará con Availability y Consistency, ya que ambos son de vital importancia en el manejo de datos,
estos deben ser siempre consistentes independientemente de si se está usando la base de datos principal, o una secundaria en caso de failover, y en el caso de la disponibilidad, necesitamos que el usuario siempre tenga acceso a sus datos.


# QA2:

* a. ¿Qué es? *

El atributo de seguridad se refiere a como la aplicación es protegida de perder o suministrar información a equipos, personas o servicios no autorizados por la aplicación, a través de este atributo de calidad se busca que la aplicación tenga una alta probabilidad de que sus activos (datos e información) resista a los ataques de hackers. En general dentro de este atributo se deben de tener en cuenta siempre tres simples atributos que son:
    -	Confidencialidad: el acceso a los activos del sistema esté limitado a usuarios autorizados.
    -	Integridad: los activos del sistema sólo pueden ser borrados o modificados por usuarios autorizados.
    -	Disponibilidad: el acceso a los activos en un tiempo razonable esté garantizado para usuarios autorizados.

* b. ¿Qué patrones se pueden emplear? *

-	Patrón de Identidad federada o autenticación externa:
	Con este patrón se busca solucionar la gestión de identidad y autenticación de los diferentes usuarios que se puedan encontrar dentro de un proceso o sistema, al permitir que la autenticación de cada usuario no se realice internamente dentro de la aplicación, evitando así exponer las vulnerabilidades de seguridad y simplificando el manejo de los usuarios, permitiendo que un solo usuario ingrese a diferentes plataformas inclusive de diferentes empresas con la misma información. Todo esto se puede lograr delegando el servicio de autenticación a un proveedor de identidad de confianza externo, separando todo el proceso de autenticación del código de la aplicación, además este servicio externo permite separar fácilmente la autenticación de la autorización; este patrón de seguridad es una buena implementación de Single Sing-On (unica autenticación).
	Al incurrir en este patrón se debe de disenar la arquitectura para que toda la información se encuentre en un solo centro de datos para evitar incurrir en problemas con la disponibilidad de datos.

-	Patrón Gatekeeper:
	Este patrón actua como una interface o subcapa que analiza las solicitudes que son hechas por los clientes a un servidor o base de datos, realizando así un proceso de limpieza  y detección de solicitudes que puedan realizar danos o modificaciones no autorizadas por cada tipo de cliente en toda la aplicación, este patrón puede ser implementado como una capa de  alta seguridad protegiendo y siendo muy estricto al tratar todas las solicitudes o puede ser empleado como una capa de seguridad baja donde solo se protejan las solicitudes vitales.
	Dicho patrón se puede disenar para que cada solicitud procesada no pase directamente al servidor o base de datos, sino que sea redirigida a un host o capa de confianza que realice todos los procesos requeridos disminuyendo aun más el riesgo de que la seguridad sea vulnerada.

* c. Especificación mediante escenarios *


| - | Descripción |
| :--: | :---: |
| **Escenario** |  |
| • Fuente de Estimulo | Persona o sistema malicioso no autenticado desde acceso remoto |
| • Estimulo | Petición para modificar información de la base de datos |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición y no modifica los datos |
| • Medida de respuesta | devuelve la información de que datos trataron de modificar y la hora|


* d. ¿Qué tacticas se pueden emplear? *

 -	Detección	de	intrusos
 -	Detección	de	denegación
 -	Verificar	la	integridad	de	los	mensajes
 -	Detectar	retardo	de	mensajes
 -	Identificación
 -	Autenticar
 -	Autorizar
 -	Limitar	el	acceso
 -	Limitar	la	exposición
 -	Cifrar	los	datos


* e. Qué herramientas se pueden utilizar para lograrlo *

-	Passport: Es una libreria de NodeJS que se emplea para realizar la autenticación de los usuarios a través de diferentes plataformas como google, facebook, etc. Tambien permite realizar el manejo de la sesión iniciada durante todo el recorrido de un usuario por la aplicación.
-	JSlint: Es un analizador de codigo estatico enfocado a Java Script, que busca las vulnerabilidades o malas practicas que pueda contener el codigo realizado para el servidor.
-	JSHint: Es un analizador de codigo estatico enfocado a Java Script, que busca las vulnerabilidades o malas practicas que pueda contener el codigo realizado para el servidor.
-	Sonar Scaner: Es un analizador de codigo estatico que nos facilita el analisis de las aplicaciones en cuanto a bucks, vulnerabiidades y malas practicas del codigo.


* f. Atributos de calidad seleccionados para escalabilidad *

Para esta capa de servicio se tienen en cuenta los atributos de Consistencia y Disponibilidad, ya que de esto depende todo lo que tiene que ver con el manejo y consistencia de los datos, al protegerlos de la manipulación de personas no autenticadas, no registradas o con permisos restringidos sobre los datos.
Para el escenario que vamos a manejar es importante que el servicio de seguridad se encuentre siempre activo para disminuir el riesgo de que un ataque a la plataforma sea exitoso, a su vez la capa de seguridad tiene que estar presente a lo largo de todo el comportamiento de la aplicación para poder garantizar la consistencia de los datos que se manejan internamente en la plataforma.


## 2.Análisis:	Mediante	escenarios	y/o propuesta	en	marco	teorico


| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| • Fuente de Estimulo | Persona no autenticada desde acceso remoto |
| • Estimulo | Petición para ver información privada de un usuario |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición |
| • Medida de respuesta | informa que trataron de acceder a la infomación del usuario |

| - | Descripción |
| :--: | :---: |
| **Escenario 2** |  |
| • Fuente de Estimulo | Persona no autenticada desde acceso remoto |
| • Estimulo | Petición para eliminar imagenes |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición |
| • Medida de respuesta | informa que trataron de eliminar información |

| - | Descripción |
| :--: | :---: |
| **Escenario 3** |  |
| • Fuente de Estimulo | Persona no autenticada desde acceso remoto |
| • Estimulo | Petición para eliminar un usuario |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición |
| • Medida de respuesta | informa que trataron de eliminar un usuario |


## 3.Diseño:	En	Aplicación	y	en	Sistema


* a. Vistas	de	arquitectura. *

![Architecture](https://github.com/jonyzp/Imaginator/blob/master/arquitectura_seguridad.jpeg)

* b. Patrones	de	arquitectura. *

-	Patrón de Identidad federada o autenticación externa

* d. Tácticas. *

-	Autenticación: los clientes de nuestras aplicaciones o servicios deben ser identificados de forma unica, sean usuarios finales,         otros servicios o computadoras externas.
-	Autorización: no solo es necesario saber quiénes acceden a nuestros activos, también es necesario establecer que es lo que pueden       hacer con ellos. Un nivel de autorización dado determina que tipo de operaciones o transacciones puede efectuar un cliente dado         sobre un recurso dado.
-	Encriptar los datos: es necesario que los datos de mayor importancia para la aplicación y los usuarios sea encriptada para que no pueda ser capturada y leida facilmente por maliciosos.
- Asegurar el medio: en algunas aplicaciones es de vital importancia que se usen protocolos que aseguren el medio por el cual viaja la información (Internet), empleando protocolos como HTTPS.


*e. Herramientas.*

-	Sonar Scaner: Es un analizador de codigo estatico que nos facilita el analisis de las aplicaciones en cuanto a bucks, vulnerabiidades y malas practicas del codigo.
-	Passport: Es una libreria de NodeJS que se emplea para realizar la autenticación de los usuarios a través de diferentes plataformas como google, facebook, etc. Tambien permite realizar el manejo de la sesión iniciada durante todo el recorrido de un usuario por la aplicación.


## QA3: Rendimiento

*a. ¿Qué es?*
El rendimiento evalúa los componentes de la página web con la función de optimizar el tiempo de respuesta de todos sus requisitos, para esto implementa métodos y técnicas que le ayudan a optimizar su velocidad, la cual es crucial para la experiencia del usuario.
Este rendimiento es considerado un requisito crítico y no funcional impactando a varios factores, los cuales se pueden apreciar en la siguiente imagen. Entre estos factores se encuentra el de ventaja competitiva aprovechando la velocidad y aumentando los usuarios, aquellos que son leales a sistemas más rápidos.

*b. ¿Qué patrones pueden emplear?*

-Think caching: Almacenar en caché los datos con un mecanismo efectivo y elaborado.
-Desing for failure: Evaluar posibilidades de fracaso, para crear un mecanismo de manejo de fallas. Los elementos comunes de fallo pueden ser:
    *-Fallos de hardware
    *-Fallos de seguridad
    *-Desastres naturales
    *-Aumento repentino de trafico de usuarios
    *-Fallo de res
    *-Fallo de operaciones
-Distributed and parallel computing: Que el programa se pueda distribuir en múltiples nodos de computación. (Ofrece ventaja en rendimiento y escalabilidad)
-Keep it lightweight: Los componentes y páginas deben mantenerse ligeros, reduciendo tamaño general y minimizando número de viajes. (Componentes asincrónicos: JavaScript y XML)
-Nonblocking loads using asynchronous data request: Aprovechar enfoques basados en AJAX, para mejorar comunicación o agregación de datos.
-Use on-demand loading policy: Cargar datos y componente solo cuando sea requerido.
-Batching: Agrupar solicitudes para minimizar el número de idas al servidor  
-Comprehensive performance-based design and testing: Modelar y probar todos los escenarios.
-Simple, modular, and reusable design: Diseñar los componentes para que puedan reutilizarse y probarse fácilmente.
-Accessibility: La falta de esta puede causar problemas en la experiencia del usuario.
-Omni-channel option: Interfaz y tiempo de carga optimo en cualquier dispositivo.
-Loose coupling: Los components deben de estar sueltos, para mejorar el rendimiento ante cualquier fallo de algún componente.
-Continuous and iterative build and testing: Construir código e implementar las pruebas de rendimiento tan pronto como se pueda.


*c. Especificación mediante escenarios*

-Descripción Escenario

-Fuente de Estimulo: Usuarios con origen interno o externo del sistema.
-Estimulo: Inicio de la transacción con una llegada de un evento, el cual puede ser periódico, esporádico o estocástico.
-Artefacto :El sistema o algún componente, entre ellos está componentes JS y CSS, componentes de imagen y la respuesta del servidor.
-Ambiente: El modelo del funcionamiento puede ser normal, en emergencia, carga máxima y sobrecarga.
-Respuesta: Transacciones con proceso de eventos o cambios en el nivel del servicio.
-Medida de respuesta: Número de transacciones simultaneas, tiempo transcurrido en una solicitud, fecha límite, etc.

En la siguiente imagen se puede apreciar el tiempo de carga de los componentes en el momento de ingresar a la página principal.

*d. ¿Qué tácticas se pueden emplear?*
-Controlar la demanda de recursos
-Administrar la tasa de muestreo
-Limitar la respuesta de un evento
-Priorizar eventos
-Reducir gastos generales
-Tiempo de ejecución limitados
-Aumentar la eficiencia de los recursos
-Administrar los recursos
-Aumentar los recursos
-Introducir concurrencia
-Mantener múltiples copias de computación
-Mantener múltiples copias de datos
-Tamaños de cola enlazados
-Programar los recursos

*e. ¿Qué herramientas se pueden utilizar para lograrlo?*
-JProfiler: Es una herramienta que realiza perfiles de código estático y de tiempo de ejecución, mostrando la memoria total y los recursos consumidos por varios componentes de la aplicación. (IDE: entorno de desarrollo integrado)
-JMeter: Es una herramienta de prueba de carga que puede ser utilizada para analizar y medir el desempeño de los servicios con énfasis en aplicaciones web.
-NGINX: Se utiliza para equilibrar la carga entre los servidores back-end, o para proporcionar almacenamiento en caché para un servidor back-end lento.


2.Análisis: Mediante escenarios y/o propuesta en marco teorico

*Descripción Escenario 1*

-• Fuente de Estimulo: Persona
-• Estimulo: Petición para ingresar a la página principal
-• Artefacto: Componente JS y CSS
-• Ambiente: En normal
-• Respuesta: El sistema cargará los componentes de JS y CSS que tiene agrupados en el sistema
-• Medida de respuesta: Tiempo que tarda el sistema en cargar los componentes de JS y CSS

*Descripción Escenario 2*

-• Fuente de Estimulo: Persona
-• Estimulo: Petición para buscar una imagen
-• Artefacto: Respuesta del servidor
-• Ambiente: En normal
-• Respuesta: El sistema buscará en el caché la imagen que el usuario desee
-• Medida de respuesta: Tiempo transcurrido para la solicitud.

3.Diseño: En Aplicación y en Sistema
*a. Vistas de arquitectura.*

*b. Patrones de arquitectura.*
-Computación distribuida y paralela
-Diseño ligero
-Almacenamiento en caché
-Invocación de servicios asíncronos
-Carga y carga bajo demanda

*c. Best practices*
-Inicialización perezosa del objeto.
-Creación de objetos bajo demanda Aprovechamiento de agrupación de conexiones y agrupación de recursos.
-Llamadas óptimas de recursos.
-Cantidad mínima de transferencia de datos para transacciones ejecutadas frecuentemente.
-Número mínimo de llamadas de recursos.

*d. Tácticas.*
-Limitar respuesta de un evento
-Priorizar eventos
-Introducir concurrencia
-Tamaños de cola enlazados

*e. Herramientas.*
-JMeter
-NGINX
