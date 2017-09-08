# NodeJS Imaginator

By:

* Mauricio Hoyos Ardila - mhoyosa2@eafit.edu.co - Creador del Api RESTful

* Mayerli López - mlopez12@eafit.edu.co

* Jonathan Zapata - jzapat80@eafit.edu.co

* Pablo Quijano - pquijano@eafit.edu.co

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
	user_id: String,
	visibility: String,
	shared_with:[{
	    username:String,
	    user:String
	    }],
	img: { 
		location: String,
		contentType: String 
		}
}

user:
{
	email: {type: String, unique: true, required: true},
 	user: {type: String, unique: true, required: true},
  	id:{type: String, unique: true, required: false},
  	password: String
}

## 3.2 Servicios Web

/* Servicio Web: Realiza la búsqueda de un artículo por su Id para mostrar la interfaz de modificacion.
	Método: GET
	URI: /Image/?image_id=val
*/

/* Servicio Web: Inserta un registro de imagen en la Base de datos, envía al res "1" si fue guardada satisfactoriamente
	Método: POST (recibe una imagen adjunta)
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
	URI: /Image/shared_with_me?user=val
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
	Body: email, password, user, id
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

# Configuracion del Load Balancer con Haproxy

> https://www.upcloud.com/support/haproxy-load-balancer-centos/#installing-haproxy

Start HAProxy service using following command, also configure it to auto start on system boot.

	sudo service haproxy start
	sudo chkconfig haproxy on

# 6. Configuración de DCA público 

Hola a todos,

en el documento adjunto, encontrará cada grupo, su nombre de dominio y la dir IP.

todos tienen acceso a la maquina 200.12.180.86, user1/eafit.2016

son sudos alli.

esta maquina es para colocar un balanceador haproxy, con puerto HTTP y HTTPS.

con HTTPS, se debe solicitar a letsencrypt.

hay 2 alternativas para como involucrar este HAPROXY_PUBLICO

opcion1:

BROWSER <-> internet <-> HAPROXY_PUBLICO <-> HAPROXY_PRIVADO <-> APPSERVERS1(2, 3, ...)

opción2:

BROWSER <-> internet <-> HAPROXY_PUBLICO <-> APPSERVERS1(2, 3, ...)

Recomiendo la opción 1, porque da la independencia de que cada equipo trabaje en su HAPROXY_PRIVADO y se pegue al Público.

recuerden, los que están rabajando en seguridad, que deben solicitar un certificado válido en Let’s Encrypt para el HAPROXY_PUBLICO, y que el github les deje tips para como solicitarlo.

Otra cosa,

cuando adicione su entrada en el haproxy de su dominio, verifique que no dañe el de otro equipo, como?

$ sudo cp /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg-backup1 (2, 3. .....)

$ sudo vim /etc/haproxy/haproxy.cfg

(adicione alli su entrada, haga los cambios)

$ sudo systemctl restart haproxy

si falla, restaure la copia que hizo de backup, o arreglelo si sabe que hizo,y reinicie:

$ sudo systemctl restart haproxy

si no fallo, todo OK.

* Otra cosa
ya esta, en la ip publica: 200.12.180.86, con el dominio st0263.dis.eafit.edu.co, ya funcionando en http y https, tanto con proxy inverso, como con balanceador.

funciona con un certificado válido CA de lets encrypt. alli tengo la app de file_upload de ejemplo.

por otro lado, las instrucciones están actualizadas en el github:

https://github.com/edwinm67/st0263eafit.git


Nginx http config in /etc/nginx/conf.d/default.conf

 location /imagine/ {
	 proxy_set_header X-Real-IP $remote_addr;
	 proxy_set_header HOST $http_host;
	 proxy_set_header X-NginX-Proxy true;
	 proxy_pass http://127.0.0.1:4000;
	 proxy_redirect off;
	}

location /MusicApp/ {
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header HOST $http_host;
 proxy_set_header X-NginX-Proxy true;
 proxy_pass http://127.0.0.1:3000/;
 proxy_redirect off;
}

Nginx https:
server {
				listen 80 default_server;
				listen [::]:80 default_server ipv6only=on;
#root         /usr/share/nginx/html;

				server_name 10.131.137.153;
				return 301 https://10.131.137.153;
}

server{

				listen 443 ssl http2 default_server;
				listen [::]:443 ssl http2 default_server;
				include snippets/self-signed.conf;
				include snippets/ssl-params.conf;

		location / {
				root  /var/www/Imaginator;
				index home.ejs ;
				proxy_set_header X-Real-IP $remote_addr;
				proxy_set_header HOST $http_host;
				proxy_set_header X-NginX-Proxy true;
				proxy_pass https://127.0.0.1:8084;
				proxy_redirect off;
			}
}


Configuracion de la Bd específicamente en el servidor 10.131.137.153:

Instalar mongo 3.2: https://www.howtoforge.com/tutorial/how-to-install-and-configure-mongodb-on-centos-7/
ó también https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-centos-7
Ingresar al shell de mongo:
```
use admin
db.createUser(
  {
    user: "admin",
    pwd: "password",
    roles: [ { role: "root", db: "admin" } ]
  }
);
exit;
```
Ingresar de nuevo con `mongo --port 27017 -u "admin" -p "password" --authenticationDatabase "admin"`

Configurar la app en config/config.js con lo siguiente:
```
var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'imaginator'
    },
    port: process.env.PORT || 8084,
    db: 'mongodb://localhost/imaginator',
	//Especial atencion a estas 3 lineas: (borrar este comentario)
    user: 'admin',
    pass: 'password',
    auth: {
        authdb: 'admin'
    }

  },
```
Sacado de :
http://mongoosejs.com/docs/connections.html
https://github.com/Automattic/mongoose/issues/4717

En app.js:
cambiar la linea de mongoose connect por:
`mongoose.connect(config.db, {user:config.user, pass:config.pass, auth:config.auth});`


para mirar que un servicio si esté habilitado para iniciar junto con el sistema:

`systemctl is-enabled mongod; echo $?`
si saca 1: `sudo systemctl enable mongod`