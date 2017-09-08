var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'imaginator'
    },
    port: process.env.PORT || 8088,
    db: 'mongodb://localhost/imaginator'
  },

  test: {
    baseUrl: "/Imaginator/",
    root: rootPath,
    app: {
      name: 'imaginator'
    },
    port: process.env.PORT || 8088,
    db: 'mongodb://localhost/imaginator'
  },

  production: {
    baseUrl:"/",
    root: rootPath,
    app: {
      name: 'imaginator'
    },
    port: process.env.PORT || 8088,
    db: 'mongodb://mhoyosa2:rydSEG89@ds028310.mlab.com:28310/imaginator'
  }
};

module.exports = config[env];
