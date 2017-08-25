## Atributos de calidad seleccionados:

* QA1: _Disponibilidad de Servicio_ Estudiante: _Jonathan Zapata Castaño_

* QA2: _Seguridad de la Aplicación_ Estudiante: _Mauricio Hoyos Ardila_

* QA3: ____________________________ Estudiante: __________________________

## QA1: Disponibilidad de servicio
    
### Marco de referencia:

*a. ¿Qué es?*

- La alta disponibilidad del servicio es la capacidad de un sistema de soportar la recepción de un gran número de peticiones al mismo tiempo sin perder su habilidad de respuesta, además de permitir ser accedido desde [cualquier lugar](https://www.igi-global.com/dictionary/service-availability/44258). La alta disponibilidad es crítica para esta capa, pues es donde se realizan las operaciones concernientes a la lógica del negocio, y es la única que tiene acceso a los datos, por lo que es crucial propiciar el más alto porcentaje posible de uptime, el cual se determina según la concurrencia de usuarios por segundo, y por lo general es del 99.xxx %, y la cantidad de 9's en la parte decimal depende principalmente de las necesidades del negocio.

*b. ¿Qué patrones se pueden emplear?*

Teniendo en cuenta los slides proveídas por el profesor con la información concerniente a HA, tenemos los siguientes patrones:

+ Failover
+ Failback
+ Replication
+ Redundancy
+ Virtualization
+ Continuous maintenance:
Corrective maintenance
Preventive maintenance
Perfective maintenance
+ Graceful and step-wise functionality degradation pattern
+ Asynchronous and services-based integration with external	interfaces.
+ Stateless and	lightweight	application	components:
+ Continuous incremental code and data replication
+ Availability trade-off using the CAP theorem (CAP: Consistency, Availibility,	Partition Tolerance)

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


**2.	Análisis:	Mediante	escenarios	y/o propuesta	en	marco	teorico**

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

| Bring down the primary node of the application server cluster |● Check session failover ● Check cache replication ● Check session replication |
| Bring down the network interface  | ● Check overall application availability
| Bring down the primary node of the web server cluster | ● Check the availability of global gateway page ● Check the availability of static assets



**3.	Diseño:	En	Aplicación	y	en	Sistema.**
a. Vistas	de	arquitectura.
b. Patrones	de	arquitectura.
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

c. Best	Practices.

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

Para la detección de la caída del web server se pueden emplear tácticas de monitoreo para una posterior recuperación del servidor, lo que se hace básicamente es permitir una conexión constante entre el server y el vigilante por medio del _heartbeat_, de esta manera nos podremos dar cuenta de algún fallo y reaccionar de inmediato con un Failback.
Como táctica para la escalabilidad de puede implementar un Manejador de cache distribuído.
Se puede implementar un sistema de replicación del web server como táctica para propiciar el Fault-Tolerance

*e. Herramientas.*

pm2 para monitoreo
haproxy para el balanceo de cargas
nfs para montar un directorio virtual compartido
rsync para el mirroring
cron para realizar la sicronización de datos cada minuto
protocolo -> ftp
jmeter para métricas

*f. Atributos de calidad seleccionados para escalabilidad*

Se tuvo en cuenta el Teorema de CAP y seleccionamos Availability y Partition tolerance para _esta_ capa de servicio. Se justifica empezando por el criterio de Disponibilidad, pues es de notar que esta capa es la más crítica a la hora de la conexión, ya que si se llega a presentar un fallo, se perdería la interacción con el usuario, presentándose una insatisfacción lo que desencadenaría una serie de consecuencias en el entorno real. Asumiendo que como premisa está la palabra escalabilidad, tenemos que pensar en un futuro con un incremento de peticiones por segundo, por lo que necesitamos la capacidad en el sistema de repartir su carga entre las diferentes instancias del servidor, y permitir una mejor experiencia con el usuario, razón por la cual escogimos Partitioning para permitir la escalabilidad.

*Diagrama*

![Architecture](https://image.prntscr.com/image/CPOsQUD1R2u7wmK9QhoI-A.jpeg)


# QA2:

*a. ¿Qué es?*

El atributo de seguridad se refiere a como la aplicación es protegida de perder o suministrar información a equipos, personas o servicios no autorizados por la aplicación, a través de este atributo de calidad se busca que la aplicación tenga una alta probabilidad de que sus activos (datos e información) resista a los ataques de hackers. En general dentro de este atributo se deben de tener en cuenta siempre tres simples atributos que son:
    -	Confidencialidad: el acceso a los activos del sistema esté limitado a usuarios autorizados.
    -	Integridad: los activos del sistema sólo pueden ser borrados o modificados por usuarios autorizados.
    -	Disponibilidad: el acceso a los activos en un tiempo razonable esté garantizado para usuarios autorizados.

*b. ¿Qué patrones se pueden emplear?*

-	Patrón de Identidad federada o autenticaci�n externa:
	Con este patrón se busca solucionar la gesti�n de identidad y autenticación de los diferentes usuarios que se puedan encontrar dentro de un proceso o sistema, al permitir que la autenticación de cada usuario no se realice internamente dentro de la aplicación, evitando así exponer las vulnerabilidades de seguridad y simplificando el manejo de los usuarios, permitiendo que un solo usuario ingrese a diferentes plataformas inclusive de diferentes empresas con la misma información. Todo esto se puede lograr delegando el servicio de autenticación a un proveedor de identidad de confianza externo, separando todo el proceso de autenticación del código de la aplicación, adem�s este servicio externo permite separar fácilmente la autenticación de la autorización; este patrón de seguridad es una buena implementación de Single Sing-On (�nica autenticación).
	Al incurrir en este patrón se debe de dise�ar la arquitectura para que toda la información se encuentre en un solo centro de datos para evitar incurrir en problemas con la disponibilidad de datos.

-	Patrón Gatekeeper:
	Este patrón act�a como una interface o subcapa que analiza las solicitudes que son hechas por los clientes a un servidor o base de datos, realizando así un proceso de limpieza  y detección de solicitudes que puedan realizar da�os o modificaciones no autorizadas por cada tipo de cliente en toda la aplicación, este patrón puede ser implementado como una capa de  alta seguridad protegiendo y siendo muy estricto al tratar todas las solicitudes o puede ser empleado como una capa de seguridad baja donde solo se protejan las solicitudes vitales. 
	Dicho patrón se puede dise�ar para que cada solicitud procesada no pase directamente al servidor o base de datos, sino que sea redirigida a un host o capa de confianza que realice todos los procesos requeridos disminuyendo a�n m�s el riesgo de que la seguridad sea vulnerada.

*c. Especificación mediante escenarios*


| - | Descripción |
| :--: | :---: |
| **Escenario** |  |
| • Fuente de Estimulo | Persona o sistema malicioso no autenticado desde acceso remoto |
| • Estimulo | Petición para modificar información de la base de datos |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición y no modifica los datos |
| • Medida de respuesta | devuelve la información de que datos trataron de modificar y la hora|


*d. ¿Qué tacticas se pueden emplear?*

 -	Detecci�n	de	intrusos
 -	Detecci�n	de	denegaci�n 
 -	Verificar	la	integridad	de	los	mensajes
 -	Detectar	retardo	de	mensajes
 -	Identificaci�n
 -	Autenticar 
 -	Autorizar 
 -	Limitar	el	acceso
 -	Limitar	la	exposici�n
 -	Cifrar	los	datos 


*e. Qué herramientas se pueden utilizar para lograrlo*

-	Passport: Es una libreria de NodeJS que se emplea para realizar la autenticaci�n de los usuarios a trav�s de diferentes plataformas como google, facebook, etc. Tambien permite realizar el manejo de la sesi�n iniciada durante todo el recorrido de un usuario por la aplicaci�n.
-	JSlint: Es un analizador de codigo estatico enfocado a Java Script, que busca las vulnerabilidades o malas practicas que pueda contener el codigo realizado para el servidor.
-	JSHint: Es un analizador de codigo estatico enfocado a Java Script, que busca las vulnerabilidades o malas practicas que pueda contener el codigo realizado para el servidor.
-	Sonar Scaner: Es un analizador de codigo estatico que nos facilita el analisis de las aplicaciones en cuanto a bucks, vulnerabiidades y malas practicas del codigo.


*f. Atributos de calidad seleccionados para escalabilidad*

Para esta capa de servicio se tienen en cuenta los atributos de Consistencia y Disponibilidad, ya que de esto depende todo lo que tiene que ver con el manejo y consistencia de los datos, al protegerlos de la manipulación de personas no autenticadas, no registradas o con permisos restringidos sobre los datos.
Para el escenario que vamos a manejar es importante que el servicio de seguridad se encuentre siempre activo para disminuir el riesgo de que un ataque a la plataforma sea exitoso, a su vez la capa de seguridad tiene que estar presente a lo largo de todo el comportamiento de la aplicación para poder garantizar la consistencia de los datos que se manejan internamente en la plataforma.


##2.Análisis:	Mediante	escenarios	y/o propuesta	en	marco	teorico


| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| • Fuente de Estimulo | Persona no autenticada desde acceso remoto |
| • Estimulo | Petición para ver información privada de un usuario |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición |
| • Medida de respuesta | informa que trataron de acceder a la infomación del usuario |

| :--: | :---: |
| **Escenario 2** |  |
| • Fuente de Estimulo | Persona no autenticada desde acceso remoto |
| • Estimulo | Petición para eliminar imagenes |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición |
| • Medida de respuesta | informa que trataron de eliminar información |

| :--: | :---: |
| **Escenario 3** |  |
| • Fuente de Estimulo | Persona no autenticada desde acceso remoto |
| • Estimulo | Petición para eliminar un usuario |
| • Artefacto | Datos en la aplicación |
| • Ambiente | En normal |
| • Respuesta | El sistema rechaza la petición |
| • Medida de respuesta | informa que trataron de eliminar un usuario |


##3.Diseño:	En	Aplicación	y	en	Sistema


*a. Vistas	de	arquitectura.* 

![Architecture](arquitectura_seguridad)

*b. Patrones	de	arquitectura.*

-	Patrón de Identidad federada o autenticaci�n externa

*d. Tácticas.*

-	Autenticación: los clientes de nuestras aplicaciones o servicios deben ser identificados de forma �nica, sean usuarios finales,         otros servicios o computadoras externas.
-	Autorización: no solo es necesario saber qui�nes acceden a nuestros activos, también es necesario establecer que es lo que pueden       hacer con ellos. Un nivel de autorización dado determina que tipo de operaciones o transacciones puede efectuar un cliente dado         sobre un recurso dado.
-	Encriptar los datos: es necesario que los datos de mayor importancia para la aplicaci�n y los usuarios sea encriptada para que no pueda ser capturada y leida facilmente por maliciosos.
- Asegurar el medio: en algunas aplicaciones es de vital importancia que se usen protocolos que aseguren el medio por el cual viaja la informaci�n (Internet), empleando protocolos como HTTPS.


*e. Herramientas.*

-	Sonar Scaner: Es un analizador de codigo estatico que nos facilita el analisis de las aplicaciones en cuanto a bucks, vulnerabiidades y malas practicas del codigo.
-	Passport: Es una libreria de NodeJS que se emplea para realizar la autenticaci�n de los usuarios a trav�s de diferentes plataformas como google, facebook, etc. Tambien permite realizar el manejo de la sesi�n iniciada durante todo el recorrido de un usuario por la aplicaci�n.