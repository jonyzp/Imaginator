# Configuracion QA de Disponibilidad

## Disponibilidad del Appserver:

Según la arquitectura planteada, el .215 es el servidor por donde entran las peticiones, si este se cae, se cae **todo**. 

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
            |  .240                          |  .153
    +-------+------+                 +-------+------+
    |   Backend#1  |                 |   Backend#2  |
    |  Web Server  |                 |  Web Server  |
    +-------+------+                 +-------+------+
```

## Cómo configurar Haproxy en http y https (Load Balancer):

* Se instala HAProxy en el servidor que se utilizará como balanceador (10.131.137.215) 
* El archivo de configuración que se utilizó es el que se encuentra en esta carpeta con el siguiente nombre:
> haproxy.cfg
> ![haproxy.cfg](https://github.com/jonyzp/Imaginator/blob/master/Implementacion/QA_Disponibilidad/etc-haproxy-haproxy-http.cfg)
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

## Estrategias Utilizadas:
* Análisis, diseño, tácticas, herramientas:
* Se analizó y diseñó la arquitectura con todo el equipo:
![HA Tactics](https://image.prntscr.com/image/i_7RPcLMSXurRw6TMK74cw.jpeg)

Herramientas: Pm2 y Haproxy