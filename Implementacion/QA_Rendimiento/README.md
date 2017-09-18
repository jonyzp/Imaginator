# Configuración QA de Rendimiento

#Evaluación de la App antes de implementar el QA de Rendimiento

El QA de rendimiento es el encargado de optimizar los tiempos de respuesta de los requisitos, teniendo en cuenta los diferentes métodos y técnicas, debido a esto, fue necesario una previa evaluación de lo que nos ofrecía la App.

Esta evaluación fue hecha gracias a la ayuda de la herramienta JMeter, la cual nos permitió evaluar el tiempo de respuesta de la App debido a cierta concurrencia de usuarios.

En el siguiente gráfico podemos apreciar los resultados obtenidos antes de hacer las modificaciones a la App para mejorar su rendimiento.

#Implementaciones

* _Comprimir assets_

Para la compresión de los assets fue necesario la instalación del paquete _'compression'_.

  $ npm install compression



Luego de ejecutar el comando anterior fue necesario agregar dos líneas de código al archivo _express.js_.

    var compression = require('compression')

    app.use(compression())

Esto se encargará de comprimir los cuerpos de respuesta de las solicitudes.

* _Caché_
