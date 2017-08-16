## Atributos de calidad seleccionados:

* QA1: _Disponibilidad de servicio_ Estudiante: _Jonathan Zapata Casta√±o_

* QA2: _Seguridad de la AplicaciÛn_ Estudiante: __________________________

* QA3: ____________________________ Estudiante: __________________________

## QA1:
    
### Marco de referencia:

*a. ¬øQu√© es?*

- La alta disponibilidad del servicio es la capacidad de un sistema de soportar gran n√∫mero de peticiones concurrentes sin perder su habilidad de reacci√≥n. La alta disponibilidad es cr√≠tica para esta capa, pues es donde se realizan las operaciones concernientes a la l√≥gica del negocio, y es la √∫nica que tiene acceso a los datos, por lo que es crucial propiciar un uptime lo m√°s alto posible, el cual se mide en concurrencia de usuarios por segundo, y por lo general es del 99.xxx %, y la cantidad de 9's en la parte decimal depende principalmente de las necesidades del negocio.

*b. ¬øQu√© patrones se pueden emplear?*

- Seg√∫n los patrones de disponibilidad definidos por [Microsoft](https://docs.microsoft.com/en-us/azure/architecture/patterns/category/availability), se pueden listar al menos 3: Health Endpoint Monitoring, Queue-Based Load Leveling y Throttling

| Patr√≥n | Resumen |
|:--:|:--:|
| Health Endpoint Monitoring | |
| Queue-Based Load Leveling | |
| Throttling | | 

*c. Especificaci√≥n mediante escenarios*

| Simulated scenario | Testing parameter
| :---:    | :----: |
| Bring down the primary node of the application server cluster |‚óè Check session failover ‚óè Check cache replication ‚óè Check session replication |
| Bring down one of the database nodes | ‚óè Check data replication ‚óè Check database failover
| Bring down one of the storage servers | ‚óè Check file retrieval and updates
| Bring down the network interface  | ‚óè Check overall application availability
| Bring down the primary node of the web server cluster ‚óè Check the availability of global gateway page ‚óè Check the availability of static assets

*d. ¬øQu√© t√°cticas se pueden emplear?*

Para la prevenci√≥n de la ca√≠da del sistema se pueden emplear t√°cticas de recuperaci√≥n del servidor 

*e. Atributos de calidad seleccionados para escalabilidad*

Se tuvo en cuenta el Teorema de CAP y seleccionamos Availability y Partition tolerance para esta capa de servicio. Se justifica empezando por el criterio de Disponibilidad, pues es de notar que esta capa es la m√°s cr√≠tica a la hora de la conexi√≥n, ya que si se llega a presentar un fallo, se perder√≠a la interacci√≥n con el usuario, present√°ndose una insatisfacci√≥n lo que desencadenar√≠a una serie de consecuencias en el entorno real. Asumiendo que como premisa est√° la palabra escalabilidad, tenemos que pensar en un futuro con un incremento de peticiones por segundo, por lo que necesitamos la capacidad en el sistema de repartir su carga entre las diferentes instancias del servidor, y permitir una mejor experiencia con el usuario, raz√≥n por la cual escogimos Partitioning para permitir la escalabilidad.

*f. Qu√© herramientas se pueden utilizar para lograrlo*

pm2 para monitoreo


* QA2:

a. øQuÈ es?

- El atributo de seguridad se refiere a como la aplicaciÛn es protegida de perder o suministrar informaciÛn a equipos, personas o servicios no autorizados por la aplicaciÛn, a travÈs de este atributo de calidad se busca que la aplicaciÛn tenga una alta probabilidad de que sus activos (datos e informaciÛn) resista a los ataques de hackers. En general dentro de este atributo se deben de tener en cuenta siempre tres simples atributos que son:
    -	Confidencialidad: el acceso a los activos del sistema est· limitado a usuarios autorizados.
    -	Integridad: los activos del sistema sÛlo pueden ser borrados o modificados por usuarios autorizados.
    -	Disponibilidad: el acceso a los activos en un tiempo razonable est· garantizado para usuarios autorizados.

d. øQuÈ t·cticas se pueden emplear?

-	AutenticaciÛn: los clientes de nuestras aplicaciones o servicios deben ser identificados de forma ˙nica, sean usuarios finales,         otros servicios o computadoras externas.
-	AutorizaciÛn: no solo es necesario saber quiÈnes acceden a nuestros activos, tambiÈn es necesario establecer que es lo que pueden       hacer con ellos. Un nivel de autorizaciÛn dado determina que tipo de operaciones o transacciones puede efectuar un cliente dado         sobre un recurso dado.
-	Registro y Auditoria: luego de efectuada una operaciÛn, es importante que esta sea registrada adecuadamente, en particular es           esencial si queremos evitar el repudio de transacciones efectuada por un cliente.
