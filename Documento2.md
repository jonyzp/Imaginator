## Atributos de calidad seleccionados:

* QA1: _Disponibilidad de servicio_ Estudiante: _Jonathan Zapata Castaño_

* QA2: _Seguridad de la Aplicaci�n_ Estudiante: __________________________

* QA3: ____________________________ Estudiante: __________________________

## QA1: Disponibilidad de servicio
    
### Marco de referencia:

*a. ¿Qué es?*

- La alta disponibilidad del servicio es la capacidad de un sistema de soportar la recepción de un gran número de peticiones al mismo tiempo sin perder su habilidad de respuesta, además de permitir ser accedido desde [cualquier lugar](https://www.igi-global.com/dictionary/service-availability/44258). La alta disponibilidad es crítica para esta capa, pues es donde se realizan las operaciones concernientes a la lógica del negocio, y es la única que tiene acceso a los datos, por lo que es crucial propiciar el más alto porcentaje posible de uptime, el cual se determina según la concurrencia de usuarios por segundo, y por lo general es del 99.xxx %, y la cantidad de 9's en la parte decimal depende principalmente de las necesidades del negocio.

*b. ¿Qué patrones se pueden emplear?*

- Teniendo en cuenta los **patrones** definidos para escalabilidad en toda la arquitectura, escogimos la siguiente lista según el impacto que tienen sobre la **capa de servicio**.
+ Distribuited computing pattern :: Debido a que distribuye la carga sobre las diferentes instancias del servidor, nos permite contar con la capacidad de tolerar una falla de uno de los servidores, lo que se traduce en disponibilidad.
+ SOA    ::   Este patrón, además de ser ampliamente utilizado, nos beneficia en gran manera al permitir ser accedidos desde gran número de dispositivos, en cualquier momento y en cualquier lugar, con la gran ventaja de permitir una interacción dinámica en donde no se tiene amarrado al usuario, sino que se le responde cada vez que haga la petición, pero no necesita estar conectado durante todo el tiempo con la aplicación, ni demandando gran cantidad de datos como templates html cada que se haga una petición.
+ Parallel computing pattern :: Este patrón puede ser tomado en cuenta por su principal función, pues nos permite procesar las instrucciones de manera paralela y en consecuencia nos lleva a terminar las operaciones en la mitad del tiempo; lo que resulta en la capacidad para cada servidor de atender  mayor número de usuarios, motivo por el cual beneficia la disponibilidad del servicio, aunque cabe aclarar que este patrón es más enfocado en beneficiar la parte del rendimiento.
+ Messaging pattern :: Debido a que provee una comunicación asíncrona, nos facilita la independencia de la conexión con el usuario, pues podemos realizar operaciones que tomen mucho tiempo en otro servidor, permitiendo al principal enfocarse en las tareas que no demoren tanto tiempo, para así minimizar la carga , y eso sin mencionar que nos ayuda a escalar en integración con otros servicios.


* Según los patrones de disponibilidad definidos por [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/category/availability), se pueden listar al menos 3: Health Endpoint Monitoring, Queue-Based Load Leveling y Throttling

| Patrón | Resumen |
|:--:|:--:|
| Health Endpoint Monitoring | |
| Queue-Based Load Leveling | |
| Throttling | | 

*c. Especificación mediante escenarios*

Estímulo
* Falla de Servidor

| Simulated scenario | Testing parameter
| :---:    | :----: |
| Bring down the primary node of the application server cluster |● Check session failover ● Check cache replication ● Check session replication |
| Bring down one of the database nodes | ● Check data replication ● Check database failover
| Bring down one of the storage servers | ● Check file retrieval and updates
| Bring down the network interface  | ● Check overall application availability
| Bring down the primary node of the web server cluster | ● Check the availability of global gateway page ● Check the availability of static assets

| - | Descripción |
| :--: | :---: |
| **Escenario 1** |  |
| • Fuente de Estimulo | La petición de un Usuario con datos corruptos |
| • Estimulo | Se cae el Servidor |
| • Artefacto | App |
| • Ambiente | En normal
| • Respuesta | Volver a lanzar la aplicación notificando al usuario que conserve la paciencia.
| • Medida de respuesta | 5 segundos para detectar el fallo, 5 para corregirlo

*d. ¿Qué tácticas se pueden emplear?*

Para la detección de la caída del sistema se pueden emplear tácticas de recuperación del servidor, mediante un monitoreo constante por medio del _heartbeat_, nos podremos dar cuenta de algún fallo y reaccionar de inmediato ante este escenario.
Manejador de cache distribuído
Tolerancia (ante una falla, continuidad)
Regreso (Failback)


*e. Qué herramientas se pueden utilizar para lograrlo*

pm2 para monitoreo
haproxy para el balanceo de cargas

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

* QA2:

a. �Qu� es?

- El atributo de seguridad se refiere a como la aplicaci�n es protegida de perder o suministrar informaci�n a equipos, personas o servicios no autorizados por la aplicaci�n, a trav�s de este atributo de calidad se busca que la aplicaci�n tenga una alta probabilidad de que sus activos (datos e informaci�n) resista a los ataques de hackers. En general dentro de este atributo se deben de tener en cuenta siempre tres simples atributos que son:
    -	Confidencialidad: el acceso a los activos del sistema est� limitado a usuarios autorizados.
    -	Integridad: los activos del sistema s�lo pueden ser borrados o modificados por usuarios autorizados.
    -	Disponibilidad: el acceso a los activos en un tiempo razonable est� garantizado para usuarios autorizados.

d. �Qu� t�cticas se pueden emplear?

-	Autenticaci�n: los clientes de nuestras aplicaciones o servicios deben ser identificados de forma �nica, sean usuarios finales,         otros servicios o computadoras externas.
-	Autorizaci�n: no solo es necesario saber qui�nes acceden a nuestros activos, tambi�n es necesario establecer que es lo que pueden       hacer con ellos. Un nivel de autorizaci�n dado determina que tipo de operaciones o transacciones puede efectuar un cliente dado         sobre un recurso dado.
-	Registro y Auditoria: luego de efectuada una operaci�n, es importante que esta sea registrada adecuadamente, en particular es           esencial si queremos evitar el repudio de transacciones efectuada por un cliente.
