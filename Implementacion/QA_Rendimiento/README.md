# Configuración QA de Rendimiento

# Evaluación de la App antes de implementar el QA de Rendimiento

El QA de rendimiento es el encargado de optimizar los tiempos de respuesta de los requisitos, teniendo en cuenta los diferentes métodos y técnicas, debido a esto, fue necesario una previa evaluación de lo que nos ofrecía la App.

Esta evaluación fue hecha gracias a la ayuda de la herramienta JMeter, la cual nos permitió evaluar el tiempo de respuesta de la App debido a cierta concurrencia de usuarios.

En el siguiente gráfico podemos apreciar los resultados obtenidos antes de hacer las modificaciones a la App para mejorar su rendimiento.

# Implementaciones

* _Comprimir assets_

Para la compresión de los assets fue necesario la instalación del paquete _'compression'_.

   $ npm install compression



Luego de ejecutar el comando anterior fue necesario agregar dos líneas de código al archivo _express.js_.

    var compression = require('compression')

    app.use(compression())

Esto se encargará de comprimir los cuerpos de respuesta de las solicitudes.

* _Caché_

Para implementar el caché fue necesario la instalación del paquete _'memory-cache'_, con el siguiente comando automaticamente se me modificará el archivo _'package.json'_, agregando el paquete con su respectiva version.

    npm install memory-cache --save

Después de instalar y configurar el package.json fue necesario algunos cambios en la App, especificamente en el controlador de image

Primero creamos una variables 'mcache' en la cual importamos 'memory-cache'

    var mcache = require('memory-cache');

Luego modificamso el método get de '/see', primero comprovamos si el _id_ de la imagen que queremos ver se encuentra en el cache,

    let cacheBody = mcache.get(id)
      if (cacheBody)

Si esto es cierto pasamos a mostrar la imagne que tenemos en el caché

  res.contentType(cacheBody.contentType);
  res.send(fs.readFileSync(cacheBody.location));

Si la imagen no se encuentra la buscamos en la base de datos y antes de mostrarla guardamos la imagne en el caché con una duración de '10*1000'.

  Image.findById(id, function (err, doc) {
    if (err) return next(err);
      res.contentType(doc.img.contentType);
      value = doc.img;
      mcache.put(id, value, 10*1000);
      res.send(fs.readFileSync(doc.img.location));
  });
