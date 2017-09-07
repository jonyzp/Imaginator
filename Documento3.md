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

b. Vista de	despliegue

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


**Rendimiento**

a. Implementación
i. Herramientas	utilizadas
ii. Cambios	en	la	implementación	de	la	aplicación
b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.

**Seguridad**

a. Implementación
i. Herramientas	utilizadas
ii. Cambios	en	la	implementación	de	la	aplicación
b. Esquemas	de	pruebas	para	comprobar	el	Atributo	de	Calidad.