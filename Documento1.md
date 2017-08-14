_Documento 2_:
===================

1. Definición del equipo, proyecto y aplicación:
    
    a. Miembros del equipo y asignación de QA a miembros del equipo:

	* Pablo Quijano Jaramillo - Disponibilidad de Datos
	* Mauricio Hoyos Ardila   - Seguridad
	* Jonathan Zapata Castaño - Disponibilidad de Servicio
	* Mayerli López Galeano   - Rendimiento

    b. Selección de la aplicación basada en Proyecto1:

    	* La aplicación que se seleccionó es Imaginator de Mauricio Hoyos, ya que vemos que cumple con todos los requisitos funcionales que se establecieron para Proyecto 1, sólo es necesario implementar la funcionalidad de carga de imágenes y enfocarnos en realizar la configuración del Load Balancer para poder empezar con las especificaciones concernientes al Proyecto 2. En adición, el grupo tiene dominio del Framework NodeJS, lo cual nos permitirá enfocarnos plenamente en los QA.

    c. Descripción de la aplicación:

	* Esta es una aplicación Web de gestión de imágenes, la cual permitirá acceder a cierto contenido que se encuentra público o si el 		  usuario lo desea puede registrarse e ingresar a la plataforma y hacer uso de la misma, esta plataforma ofrecerá al usuario un contenido adicional, pues el usuario podrá añadir nuevas imágenes, eliminarlas o editarlas, siendo estas imágenes compartidas con otros usuarios, privadas o en su defecto públicas para aquellos usuarios que no se encuentran registrados.
	Por otro lado los usuarios pueden buscar la imagen que desee por el nombre de la misma.


    d. Requisitos Funcionales:
    
	* RF1: El sistema permitirá a los usuarios ingresar mediante un usuario y contraseña.

	* RF2: El sistema permitirá a los usuarios agregar nuevas imágenes, así como también eliminarlas.

	* RF3: El sistema permitirá a los usuarios buscar la imagen que ellos deseen.

	* RF4: El sistema permitirá a los usuarios ver las imágenes que hayan compartido los demás a la aplicación.
	
	* RF5: El sistema permitirá a los usuarios cerrar su sesión.

2. Detalles técnicos del proceso para la incorporación de la Gestión de Contenidos en el proyecto 2:

	* DCA - CentOS 7.1
	    VMware
	    VMware Virtual Machine
	    Intel(R) Xeon(R) CPU     X5660  @ 2.80GHz (fam: 06, model: 25, stepping: 01)
	    CPU MHz: 2799.269
	    Cache size: 12288 KB
	    CPU cores: 1
	    MemTotal: 1884112 kB
	    MemFree: 100676 kB
	    MemAvailable: 424848 kB
		* 2 GB RAM
	    * 20 GB de disco duro
	    * 2 CPUs virtuales

3. Aplicación en el DCA:
	
	http://10.131.137.240:8084/Imaginator/
	Ejemplo de visualización de contenido: http://10.131.137.240:8084/Imaginator/Image/see?image_id=5990ee032f3d6a61701ce156

4. Directorio Github para proyecto 2:


