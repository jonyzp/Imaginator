## Atributos de calidad seleccionados:

* QA1: _Disponibilidad de servicio_ Estudiante: _Jonathan Zapata Castaño_

* QA2: _Seguridad de la Aplicaci�n_ Estudiante: __________________________

* QA3: ____________________________ Estudiante: __________________________

## QA1: Disponibilidad de servicio
    
### Marco de referencia:

*a. ¿Qué es?*

- La alta disponibilidad del servicio es la capacidad de un sistema de soportar gran número de peticiones concurrentes sin perder su habilidad de respuesta. La alta disponibilidad es crítica para esta capa, pues es donde se realizan las operaciones concernientes a la lógica del negocio, y es la única que tiene acceso a los datos, por lo que es crucial propiciar un uptime lo más alto posible, el cual se mide en concurrencia de usuarios por segundo, y por lo general es del 99.xxx %, y la cantidad de 9's en la parte decimal depende principalmente de las necesidades del negocio.

*b. ¿Qué patrones se pueden emplear?*

- Según los patrones de disponibilidad definidos por [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/category/availability), se pueden listar al menos 3: Health Endpoint Monitoring, Queue-Based Load Leveling y Throttling

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

*d. ¿Qué tácticas se pueden emplear?*

Para la prevención de la caída del sistema se pueden emplear tácticas de recuperación del servidor, mediante un monitoreo constante por medio del heartbeat, nos podremos dar cuenta de algún fallo y reaccionar de inmediato ante este escenario.
Detección (monitoreo)
Tolerancia (ante una falla, continuidad)
Regreso (Failback)


*e. Atributos de calidad seleccionados para escalabilidad*

Se tuvo en cuenta el Teorema de CAP y seleccionamos Availability y Partition tolerance para esta capa de servicio. Se justifica empezando por el criterio de Disponibilidad, pues es de notar que esta capa es la más crítica a la hora de la conexión, ya que si se llega a presentar un fallo, se perdería la interacción con el usuario, presentándose una insatisfacción lo que desencadenaría una serie de consecuencias en el entorno real. Asumiendo que como premisa está la palabra escalabilidad, tenemos que pensar en un futuro con un incremento de peticiones por segundo, por lo que necesitamos la capacidad en el sistema de repartir su carga entre las diferentes instancias del servidor, y permitir una mejor experiencia con el usuario, razón por la cual escogimos Partitioning para permitir la escalabilidad.

*f. Qué herramientas se pueden utilizar para lograrlo*

pm2 para monitoreo

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
