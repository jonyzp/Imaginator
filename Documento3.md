Documentación	general	de	la	aplicación	y	su	proceso:

1. Miembros	del	equipo

    * Mayerli López Galeano
	* Mauricio Hoyos Ardila   
	* Pablo Quijano Jaramillo 
    * Jonathan Zapata Castaño 
	

2. Diseño	de	arquitectura de	la	Aplicación y	Sistema

a. Vista	de	desarrollo
i. Definición	de	Tecnología	de	Desarrollo
* NodeJS

ii. URLs	de	repositorio	(github)
	https://github.com/jonyzp/Imaginator

	
b. Vista de	despliegue

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
	        |      							 |
	+-------+------+			     +-------+------+
	|   Backend#1  |			     |   Backend#2  |
	|  Web Server  |			     |  Web Server  |
	+-------+------+			     +-------+------+
			|								 |
			+--------------------------------+
			|								 |
	+-------+------+			     +-------+------+
	|   Data base  | Sync(files, DB) |   Data base  |
	|--------------|<--------------->|--------------|
	| File system  |			     | File system  |
	+--------------+			     +--------------+



i. Definición de Tecnología – Infraestructura TI:	Servidores,	Software Base,	Redes,	etc.

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

ii. URL	de	ejecución	

> https://10.131.137.215

3. Implementación	y	Pruebas	por	Atributo	de	Calidad

**Disponibilidad**

a. Implementación
i. Herramientas	utilizadas
Haproxy, pm2, nginx
ii. Cambios	en	la	implementación	de	la	aplicación
En disponibilidad de servicio ningún cambio
b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.
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
        |10.131.137.240      |10.131.137.153
+-------+------+     +-------+------+
|   Backend#1  |     |   Backend#2  |
|  Web Server  |     |  Web Server  |
+--------------+     +--------------+
```

**Rendimiento**

a. Implementación
i. Herramientas	utilizadas
ii. Cambios	en	la	implementación	de	la	aplicación
b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.

**Seguridad**

a. Implementación
i. Herramientas	utilizadas
	auth2 y cliente de autenticacion de google, openssl for centos 7
ii. Cambios	en	la	implementación	de	la	aplicación
	Dentro del atributo de calidad de seguridad no cambio ningun item de imlementacion en la aplicacion
b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.
	Todos los usuarios que quieran acceder a la aplicacion pueden hacerlo por medio de una cuenta creada internamente en la aplicacion o por medio de la cuenta que se poseea de google, ademas a esto se aseguraro la comunicacion entre el balaceador de cargas haproxy y el usuario por medio del protocolo https.Adicionalmente a esto se establecio comunicacion https entre el nginx de los servidores con el LB.
		|
   		|
-------+-----------------------------------------------  encryptacion de la comunicacion
       |
       |
       |10.131.137.215  
 +-----+-----+     
 | Frontend  |     
 |  HAProxy  |     
 +------+----+     
        |			protocolo https entre el nginx y haproxy
        +--------------------+
        |10.131.137.240      |10.131.137.153
+-------+------+     +-------+------+
|   Backend#1  |     |   Backend#2  |
|  Web Server  |     |  Web Server  |
+--------------+     +--------------+
```