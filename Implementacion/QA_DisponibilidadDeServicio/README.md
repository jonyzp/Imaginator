# Configuracion QA de Disponibilidad

## Disponibilidad del Appserver:

Según la arquitectura planteada, el .215 es el servidor por donde entran las peticiones.

#### Arquitectura base:
```
           |
-----------+-------------------------------------------
           |
           |
           |  .215
     +-----+-----+
     | Frontend  |     
     |  HAProxy  |     
     +------+----+     
            |
            +--------------------------------+
            |  .240                          |  .151
    +-------+------+                 +-------+------+
    |   Backend#1  |                 |   Backend#2  |
    |  Web Server  |                 |  Web Server  |
    +-------+------+                 +-------+------+
```

## Cómo configurar Haproxy en http y https (Load Balancer):

* Se instala HAProxy en el servidor que se utilizará como balanceador (10.131.137.215) 
* El archivo de configuración que se utilizó es el que se encuentra en esta carpeta con el siguiente nombre:
> haproxy.cf
* Este archivo se crea en la siguiente ruta:
> /etc/haproxy/haproxy.cfg

* Se instaló el haproxy según la página de digital Ocean: 
> https://www.upcloud.com/support/haproxy-load-balancer-centos/#installing-haproxy

## [Detección | Tolerancia | Recuperación | Notificación] de fallos del appserver (Pm2)

### Detección:
* Para detectar el fallo es tan fácil como instalar pm2 y ejecutar:
```
sudo pm2 startup 
sudo pm2 start ~/Imaginator/app.js
sudo pm2 save
```

* Con ingresar estos comandos permite a Pm2 detectar automáticamente los fallos y lanzar de nuevo la aplicación ante un eventual fallo

### Tolerancia:
* Para recuperarse del fallo:
* No olvidar ejecutar:
```
sudo pm2 save
```
* Ya con esto la aplicación se lanza aunque el servidor se reinicie, tener en cuenta que hay que poner a iniciar pm2 al inicio del sistema: `sudo pm2 startup` 

* Para más información: https://futurestud.io/tutorials/pm2-restart-processes-after-system-reboot

### Recuperación

* Pm2 recupera el appserver automáticamente

### Notificación
* El pm2 notifica los errores en un archivo .log, generalmente se encuentra en ~/.pm2/logs/*.err o en el caso de la .153 está en ~/.pm2/logs/app-error-0.log
* Para más practicidad: `sudo pm2 logs` notifica en tiempo real las transacciones de la aplicación

## Estrategias Utilizadas:
* Análisis, diseño, tácticas, herramientas:
* Se analizó y diseñó la arquitectura con todo el equipo:
![Architecture](https://image.prntscr.com/image/CPOsQUD1R2u7wmK9QhoI-A.jpeg)

Herramientas: Pm2 y Haproxy Nginx

El archivo de configuracion para el nginx esta en esta carpeta, prestar atención sobretodo a la parte de location / {  ...  }

