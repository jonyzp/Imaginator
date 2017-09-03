# NodeJS Imaginator

By:

* Mauricio Hoyos Ardila - mhoyosa2@eafit.edu.co - Creador del Api RESTful

* Mayerli López - mlopez12@eafit.edu.co

* Jonathan Zapata - jzapat80@eafit.edu.co

* Pablo Quijano - @eafit.edu.co

# Descripción de aplicación

Aplicación web que permite gestionar contenido de imágenes, esta aplicación realiza un CRUD básico (título, formato y demás metadatos de la imagen) por imagen.
Además realiza un CRUD básico (email, nombre de usuario y contraseña) de usuarios. Esta a su vez cuenta con un sistema de navegación y búsqueda de artículos
que cuentan con categorías de visibilidad (público, privado o compartido) para cada imagen.

Ejercicio de clase, que cubre:

* Aplicación del patron MVC a una aplicación Web
* Uso de un framework backend moderno -> NodeJS
* Configuración de ambientes: Desarrollo, Pruebas y Producción.
* Aplica principios de escalabilidad de una aplicación.

# 1. Análisis

## 1.1 Requisitos funcionales:

1. La aplicación permite crear, modificar y eliminar un usuario.
2. Buscar imágenes por su título o parte del mismo.
3. Borrar imágenes por el Id de la imagen.
4. Listar todos los artículos públicos de la base de datos en la página home e índex, ordenándolos desde los más recientes hasta los menos recientes.
5. Todos los usuarios pueden crear, editar y eliminar imágenes.
6. Asignar una visibilidad a cada imagen que sube un usuario.
7. Compartir una imagen con un usuario determinado.

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: JavaScript / NodeJS
* Framework web backend: NodeJS - Express
* Framework web frontend: no se usa - se utilizará Templates HTML para Vista (V)
* Base de datos: MongoDB
* Web App Server: NodeJS
* Web Server: NGINX

# 2. Desarrollo

Se generó la base, con Yeoman:

$ yo express

(este generador, crea una app base ejemplo MVC para gestión de imágenes)

# 3. Diseño:

## 3.1 Modelo de datos:

image:
{
      title: String,
      format: String,
      width: Number,
      height: Number,
      capture_date: Date,
      quality: Number,
      user_id: Schema.ObjectId,
      visibility: String,
      shared_with:[{
        username:String,
        user:String
        }]
}

user:
{
       email: {type: String, unique: true, required: true},
       user: {type: String, unique: true, required: true},
       password:{type: String, unique: true, required: true}
}

## 3.2 Servicios Web

/* Servicio Web: Realiza la búsqueda de un artículo por su Id.
  Método: GET
  URI: /Image/?image_id=val
*/

/* Servicio Web: Inserta un registro de imagen en la Base de datos, envía al res "1" si fue guardada satisfactoriamente
  Método: POST
  URI: /Image/
  Body: title, format, width, height, capdate (capture data), quality, user_id, visibility ("public" o "private").
*/

/* Servicio Web: Actualiza los datos de una imagen en la Base de datos, envía al res "1" si fue actualizada satisfactoriamente
  Método: PUT
  URI: /Image/?image_id=val
  Body: title, format, width, height, visibility.
*/

/* Servicio Web: Elimina una imagen en la Base de datos, envía al res "1" si fue eliminada satisfactoriamente
  Método: DELETE
  URI: /Image/?image_id=val
*/

/* Servicio Web: Busca y envía todas las imágenes ingresadas por un usuario en la Base de datos
  Método: POST
  URI: /Image/user_images?user_id=val
*/

/* Servicio Web: Busca y envía todas las imágenes con visibilidad "public" en la Base de datos
  Método: POST
  URI: /Image/public_images
*/

/* Servicio Web: Busca y envía todas las imágenes que se han compartido a un usuario
  Método: POST
  URI: /Image/shared_with_me?user_id=val
*/

/* Servicio Web:  Realiza la búsqueda en la base de datos, por campo título y de visibilidad publica
  Método: POST
  URI: /Image/search
  Body: search
*/

/* Servicio Web: Agrega un usuario a la lista de compartidos de una imagen, envía al res "1" si fue eliminada satisfactoriamente
  Método: POST
  URI: /Image/share?username=val
  Body: image_id
*/

/* Servicio Web: Realiza el log in de cada usuario y almacena sus datos en la sesión del solicitante
  Método: POST
  URI: /User/login
  Body: email, password
*/

/* Servicio Web: Agrega un usuario a la base de datos, envía al res "1" si fue guardado satisfactoriamente
  Método: POST
  URI: /User/
  Body: email, password, user
*/

/* Servicio Web: Realiza el log out de cada usuario y destruye la sesión del solicitante
  Método: POST
  URI: /User/logout
*/

/* Servicio Web: Actualiza los datos de un usuario en la Base de datos, envía al res "1" si fue actualizada, "2" si la contraseña actual no coincide y "3" si la nueva contraseña y la de confirmación no coinciden
  Método: PUT
  URI: /User/?user_id=val
  Body: current, password, password_confirm, user_name
*/

/* Servicio Web: Elimina un usuario en la Base de datos, envía al res "1" si fue eliminada satisfactoriamente
  Método: DELETE
  URI: /User/?user_id=val
  Body: password
*/


# 4. Despligue en un Servidor Centos 7.x en el DCA


## se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

      user1$ nvm install v7.7.1

## se instala el servidor mongodb

como root:

      user1$ sudo yum install mongodb-server -y

ponerlo a correr:

      user1$ sudo systemctl enable mongod
      user1$ sudo systemctl start mongod


lo instala de los repositorios propios de Centos.

tambien lo puede instalar de un repo de mongodb:

ver pág: https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/

## se instala NGINX

      user1$ sudo yum install nginx
      user1$ sudo systemctl enable nginx
      user1$ sudo systemctl start nginx

Abrir el puerto 80

      user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
      user1$ sudo firewall-cmd --reload


## se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

      user1$ npm install -g pm2

ponerlo como un servicio, para cuando baje y suba el sistema:

      user1$ sudo pm2 startup systemd
      user1$ cd ~/Imaginator

Ingresar como root

      user1$ sudo pm2 start app.js
      user1$ sudo pm2 list
      user1$ sudo pm2 save

Para mirar el status:

      user1$ pm2 list

I encountered a problem.
Our servers have two root account(root and user1), we use user1 account for everyday use, when we do "pm2 save", the USER is root, but PM2_HOME is /home/user1/.pm2, after reboot, processes not run automaticly, we receive a error message: [PM2] No processes saved; DUMP file doesn't exist.
For fix the problem, you must login exactly with "root" user, start you app with pm2, do pm2 save and make pm2-init.sh as service

## MUY MUY IMPORTANTE: Deshabilitar SELINUX

          user1$ sudo vim /etc/sysconfig/selinux

                SELINUX=disabled

          user1$ sudo reboot

# 5. Despliege en Heroku:

La aplicación fue desplegada en la siguiente url: https://quiet-bayou-17563.herokuapp.com/

Para su despliegue se siguieron los pasos para NodeJS que se indican en su pagina oficial: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

Se debe de tener en cuenta que al trabajar con la base de datos MongoDB (la cual Heroku no soporta), se debe de crear una nueva base de datos virtual, esto se puede hacer en la siguiente pagina: https://mlab.com/.
