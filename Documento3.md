Documentación	general	de	la	aplicación	y	su	proceso:

1. Miembros	del	equipo

    * _Mayerli López Galeano_
    * _Mauricio Hoyos Ardila_
    * _Pablo Quijano Jaramillo_
    * _Jonathan Zapata Castaño_


2. Diseño	de	arquitectura de	la	Aplicación y	Sistema

    *a. Vista	de	desarrollo*
        i. Definición	de	Tecnología	de	Desarrollo
       * NodeJS

    ii. URLs	de	repositorio	(github)
   > https://github.com/jonyzp/Imaginator


    *b. Vista de	despliegue:*
        i. Definición de Tecnología – Infraestructura TI:	Servidores,	Software Base,	Redes,	etc.

    **Servidores:**
```
           |
-----------+-------------------------------------------
           |
           |
           |  
     +-----+-----+
     | Frontend  |     
     |  HAProxy  |     
     +------+----+     
            |
            +--------------------------------+
            |                                |
    +-------+------+                 +-------+------+
    |   Backend#1  |                 |   Backend#2  |
    |  Web Server  |                 |  Web Server  |
    +-------+------+                 +-------+------+
            |                                |
            +--------------------------------+
            |                                |
    +-------+------+                 +-------+------+
    |   Data base  | Sync(files, DB) |   Data base  |
    |--------------|<--------------->|--------------|
    | File system  |                 | File system  |
    +--------------+                 +--------------+
```

**Componente Hardware:**

* DCA - CentOS 7.1
* VMware
* VMware Virtual Machine
* Intel(R) Xeon(R) CPU     X5660  @ 2.80GHz (fam: 06, model: 25, stepping: 01)
* CPU MHz: 2799.269
* Cache size: 12288 KB
* CPU cores: 1
* MemTotal: 1884112 kB
* MemFree: 100676 kB
* MemAvailable: 424848 kB
* 2 GB RAM
* 20 GB de disco duro
* 2 CPUs virtuales

*ii. URL	de	ejecución*

> https://10.131.137.215

Nota: Si al entrar al servidor .215 se obtiene un error 400 Bad Request, verificar que sí esté ingresando con https

3. Implementación	y	Pruebas	por	Atributo	de	Calidad

**Disponibilidad**

*a. Implementación*

*i. Herramientas	utilizadas.*

Haproxy, pm2, nginx, gluster, cron

*ii. Cambios	en	la	implementación	de	la	aplicación.*

En disponibilidad de servicio ningún cambio

*b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.*
    Ingresar al LB por la ip dada (https://10.131.137.215) y este debe redirigir a alguno de los dos sevidores que están en la .240 y en la .153
```
       |
-------+-----------------------------------------------
       |
       |
       |10.131.137.215  
 +-----+-----+     
 | Frontend  |     
 |  HAProxy  |     
 +------+----+     
        |
        +--------------------+
        |10.131.137.240      |10.131.137.151
+-------+------+     +-------+------+
|   Backend#1  |     |   Backend#2  |
|  Web Server  |     |  Web Server  |
+--------------+     +--------------+
```



**Rendimiento**

*a. Implementación*

*i. Herramientas	utilizadas.*

    La herramienta utilizada en este QA fue JMETER

*ii. Cambios	en	la	implementación	de	la	aplicación.*

  En rendimiento fue necesario el cambio para la implementación del caché, el cual se hizo en un método que me permite visualizar la imagen que desee.
  Adicional a esto se implemento la compression de assets.

*b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.*

  Después de acceder a alguna de las máquinas nos dirige automáticamente a la página principal, en la cual se puede apreciar todas las publicaciones que en ese momento se encuentran en estado público, si refrescamos la página esta automáticamente cargará con todas las publicaciones.

  Si deseamos ingresar a la app despues de registrarnos, podemos ver las imágenes que han sido compartidas por los demás usuarios con solo darle un clic al botón "xxx" se nos abrirá una ventana emergente con la imagen de la publicación que deseamos ver, dicha imagen se guardará en caché por un lapso de tiempo el cual podemos aprovechar para agilizar dicho procesos y optimizar el tiempo, además de lo anterior también podemos buscar la publicación que deseemos por el nombre de la misma.

  ```
         |
  -------+-----------------------------------------------
         |
         |
         |10.131.137.215  
   +-----+-----+     
   | Frontend  |     
   |  HAProxy  |     
   +------+----+     
          |
          +--------------------+
          |10.131.137.240      |10.131.137.151
  +-------+------+     +-------+------+
  |   Backend#1  |     |   Backend#2  |
  |  Web Server  |     |  Web Server  |
  |--------------|     |--------------|
  | Caché        |     |  Caché       |
  +--------------+     +--------------+
  ```


**Seguridad**

*a. Implementación*

*i. Herramientas	utilizadas*

  Auth2 y cliente de autenticacion de google, openssl for centos 7.

*ii. Cambios	en	la	implementación	de	la	aplicación.*

  Dentro del atributo de calidad de seguridad no cambio ningun item de imlementacion en la aplicación.

*b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.*

  Todos los usuarios que quieran acceder a la aplicacion pueden hacerlo por medio de una cuenta creada internamente en la aplicacion o por medio de la cuenta que se poseea de google, además a esto se aseguraro la comunicación entre el balaceador de cargas haproxy y el usuario por medio del protocolo https. Adicionalmente a esto se establecio comunicación https entre el nginx de los servidores con el LB.

```
       | 
       |
-------+ <----- protocolo https---------------------------  encriptación de la comunicación
       |
       | proyecto23.dis.eafit.edu.co --> ip:200.12.180.86
 +-----+-----+     
 | Frontend  |     
 |  HAProxy  |     
 +------+----+  
       |
       |10.131.137.215  
 +-----+-----+     
 | Frontend  |     
 |  HAProxy  |     
 +------+----+     
        |			protocolo http entre el nginx y haproxy
        +--------------------+
        |10.131.137.240      |10.131.137.151
+-------+------+     +-------+------+
|   Backend#1  |     |   Backend#2  |
|  Web Server  |     |  Web Server  |
+--------------+     +--------------+
```
