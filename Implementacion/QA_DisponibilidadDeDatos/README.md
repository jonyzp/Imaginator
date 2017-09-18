# Configuracion QA de Disponibilidad

## Disponibilidad de los datos:

Para la disponibilidad de los datos se tiene tanto una replicación de la base de datos, como una sincronización de los file system para la replicación de imágenes.

#### Arquitectura base:
```

    +-------+------+ .240            +-------+------+.153
    |   Backend#1  |                 |   Backend#2  |
    |  Web Server  |                 |  Web Server  |
    +-------+------+                 +-------+------+
            |                                |
            +--------------------------------+
            | .196                           |.225
    +-------+------+                 +-------+------+
    |   Data base  | Sync(files, DB) |   Data base  |
    |--------------|<--------------->|--------------|
    | File system  |    GlusterFS    | File system  |
    +--------------+                 +--------------+

## Cómo configurar Replica Set de MongoDb:

-Se agrega la dirección de los otros servers al archivo hosts (adjunto en los documentos)
-Se habilita en el archivo de configuración del MongoDb la opción de replicación (adjunto en los documentos)
-Los primeros 2 pasos se realizan en todos los servidores.
-Se configura el replica set en el que será el servidor primario con los siguientes comandos:
    mongo
    Se inicio el replica set desde el server0.
    rs.initiate()
    Después se agregan los otros nodos al replica set.
    rs.add("server1")
    rs.add("server2")
    rs.add("server3")

## Cómo configurar GlusterFs:

-Se instala y se inicia el servicio tanto en el cliente como en el servidor
    yum install -y glusterfs-server
    systemctl start glusterd
    systemctl enable glusterd
-Se monta la carpeta como un Gluster "brick"
    mount /mnt/glustervolume 
-Configure your Gluster volume
    gluster volume create testvol replica 2 transport tcp server0:/mnt/glustervolume server1:/mnt/glustervolume


## Estrategias Utilizadas:
* Análisis, diseño, tácticas, herramientas:
* Se analizó y diseñó la arquitectura con todo el equipo:
![Architecture](https://image.prntscr.com/image/CPOsQUD1R2u7wmK9QhoI-A.jpeg)

Herramientas: MongoDb replication y GlusterFs
