## Atributos de calidad seleccionados:

* QA1: _Disponibilidad de servicio_ Estudiante: _Jonathan Zapata Castaño_

* QA2: _Seguridad de la Aplicación_ Estudiante: _Mauricio Hoyos Ardila_

* QA3: ____________________________ Estudiante: __________________________

## QA1: Disponibilidad de servicio
    
### Marco de referencia:

*a. ¿Qué es?*

- La alta disponibilidad del servicio es la capacidad de un sistema de soportar la recepción de un gran número de peticiones al mismo tiempo sin perder su habilidad de respuesta, además de permitir ser accedido desde [cualquier lugar](https://www.igi-global.com/dictionary/service-availability/44258). La alta disponibilidad es crítica para esta capa, pues es donde se realizan las operaciones concernientes a la lógica del negocio, y es la única que tiene acceso a los datos, por lo que es crucial propiciar el más alto porcentaje posible de uptime, el cual se determina según la concurrencia de usuarios por segundo, y por lo general es del 99.xxx %, y la cantidad de 9's en la parte decimal depende principalmente de las necesidades del negocio.

*b. ¿Qué patrones se pueden emplear?*

- Teniendo en cuenta los **patrones** definidos para escalabilidad en toda la arquitectura, se escogió la siguiente lista según el impacto que tienen sobre la **capa de servicio**.
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

*c. Especificación mediante escenarios*


| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| • Fuente de Estimulo | La petición de un Usuario con datos corruptos |
| • Estimulo | Se cae el Servidor |
| • Artefacto | App |
| • Ambiente | En normal
| • Respuesta | Volver a lanzar la aplicación notificando al usuario que conserve la paciencia.
| • Medida de respuesta | 5 segundos para detectar el fallo, 5 para corregirlo

> Con este escenario basta o hay que agregar más?

| Bring down the primary node of the application server cluster |● Check session failover ● Check cache replication ● Check session replication |
| Bring down the network interface  | ● Check overall application availability
| Bring down the primary node of the web server cluster | ● Check the availability of global gateway page ● Check the availability of static assets

*d. ¿Qué tácticas se pueden emplear?*

Para la detección de la caída del web server se pueden emplear tácticas de monitoreo para una posterior recuperación del servidor, lo que se hace básicamente es permitir una conexión constante entre el server y el vigilante por medio del _heartbeat_, de esta manera nos podremos dar cuenta de algún fallo y reaccionar de inmediato con un Failback.
Como táctica para la escalabilidad de puede implementar un Manejador de cache distribuído.
Se puede implementar un sistema de replicación del web server como táctica para propiciar el Fault-Tolerance

*e. Qué herramientas se pueden utilizar para lograrlo*

pm2 para monitoreo
haproxy para el balanceo de cargas
nsh para comunicacion con el file server, es muy manual
nfs para montar un directorio virtual compartido, tipo dropbox que yo guardo en mi pc y el lo manda autom al cloud
rsync para el mirroring
cron para realizar la sicronizacion de datos cada minuto
glusterFS para NAS
protocolos -> ftp, scp, http
jmeter para métricas

*e. Atributos de calidad seleccionados para escalabilidad*

Se tuvo en cuenta el Teorema de CAP y seleccionamos Availability y Partition tolerance para _esta_ capa de servicio. Se justifica empezando por el criterio de Disponibilidad, pues es de notar que esta capa es la más crítica a la hora de la conexión, ya que si se llega a presentar un fallo, se perdería la interacción con el usuario, presentándose una insatisfacción lo que desencadenaría una serie de consecuencias en el entorno real. Asumiendo que como premisa está la palabra escalabilidad, tenemos que pensar en un futuro con un incremento de peticiones por segundo, por lo que necesitamos la capacidad en el sistema de repartir su carga entre las diferentes instancias del servidor, y permitir una mejor experiencia con el usuario, razón por la cual escogimos Partitioning para permitir la escalabilidad.

2.	Análisis:	Mediante	escenarios	y/o propuesta	en	marco	teorico

3.	Diseño:	En	Aplicación	y	en	Sistema.
a. Vistas	de	arquitectura.
b. Patrones	de	arquitectura.
c. Best	Practices.
d. Tácticas.
e. Herramientas.

*Diagrama*

![Architecture](https://image.prntscr.com/image/CPOsQUD1R2u7wmK9QhoI-A.jpeg)


## QA2:

*a. ¿Qué es?*

- El atributo de seguridad se refiere a como la aplicación es protegida de perder o suministrar información a equipos, personas o servicios no autorizados por la aplicación, a trav�és de este atributo de calidad se busca que la aplicación tenga una alta probabilidad de que sus activos (datos e información) resista a los ataques de hackers. En general dentro de este atributo se deben de tener en cuenta siempre tres simples atributos que son:
    -	Confidencialidad: el acceso a los activos del sistema esté limitado a usuarios autorizados.
    -	Integridad: los activos del sistema sólo pueden ser borrados o modificados por usuarios autorizados.
    -	Disponibilidad: el acceso a los activos en un tiempo razonable esté garantizado para usuarios autorizados.

d. ¿Qué tacticas se pueden emplear?

-	Autenticación: los clientes de nuestras aplicaciones o servicios deben ser identificados de forma �nica, sean usuarios finales,         otros servicios o computadoras externas.
-	Autorización: no solo es necesario saber qui�nes acceden a nuestros activos, también es necesario establecer que es lo que pueden       hacer con ellos. Un nivel de autorización dado determina que tipo de operaciones o transacciones puede efectuar un cliente dado         sobre un recurso dado.
-	Registro y Auditoria: luego de efectuada una operación, es importante que esta sea registrada adecuadamente, en particular es           esencial si queremos evitar el repudio de transacciones efectuada por un cliente.


*e. Atributos de calidad seleccionados para escalabilidad*

Para esta capa de servicio se tienen en cuenta los atributos de Consistencia y Disponibilidad, ya que de esto depende todo lo que tiene que ver con el manejo y consistencia de los datos, al protegerlos de la manipulación de personas no autenticadas, no registradas o con permisos restringidos sobre los datos.
Para el escenario que vamos a manejar es importante que el servicio de seguridad se encuentre siempre activo para disminuir el riesgo de que un ataque a la plataforma sea exitoso, a su vez la capa de seguridad tiene que estar presente a lo largo de todo el comportamiento de la aplicación para poder garantizar la consistencia de los datos que se manejan internamente en la plataforma.
