## implementacion del SSL

#### Dominio: proyecto23.dis.eafit.edu.co

#### Ip: 200.12.180.86

#### Para addicionar el dóminio (asignado por el profesor) al certificado ya existente:

      $ sudo systemctl stop haproxy
      
      $ sudo /root/certbot-auto certonly --cert-path /etc/letsencrypt/archive/st0263.dis.eafit.edu.co --expand -d proyecto23.dis.eafit.edu.co

      $ sudo /root/certbot-auto certonly -d st0263.dis.eafit.edu.co  --expand -d proyecto23.dis.eafit.edu.co
      
#### Crear el archivo proyecto24.pem, el cual es el certificado para el dominio asignado:

      Los siguientes archivos quedan en la ruta /etc/letsencrypt/live/st0263.dis.eafit.edu.co/
        - fullchain.pem
        - privkey.pem 
      
      Estos archivos se concatenan y se guardan en /etc/haproxy/certs/proyecto23.pem
      
        $ sudo cat /etc/letsencrypt/live/st0263.dis.eafit.edu.co/fullchain.pem /etc/letsencrypt/live/st0263.dis.eafit.edu.co/privkey.pem > /etc/haproxy/certs/proyecto23.pem

#### Por último se configura el archivo /etc/haproxy/haproxy.cfg

      frontend https
        bind proyecto23.dis.eafit.edu.co:443    ssl     crt     /etc/haproxy/certs/proyecto24.pem
        acl host_proyecto23 hdr(host) -i proyecto23.dis.eafit.edu.co
        use_backend proyecto23_cluster if host_proyecto23
        
      frontend http *:80
        acl host_proyecto23 hdr(host) -i proyecto23.dis.eafit.edu.co
        use_backend proyecto23_cluster if host_proyecto23
      
      backend proyecto23_cluster
        balance leastconn
        option httpclose
        cookie JSESSIONID prefix
        server node2 10.131.137.215:80

      frontend  main *:5000
        acl url_static       path_beg       -i /static /images /javascript /stylesheets
        acl url_static       path_end       -i .jpg .gif .png .css .js .scss
        use_backend static          if url_static
        default_backend             app
        
      backend static
        balance     roundrobin
        server      static 127.0.0.1:4331 check

      backend app
        balance     roundrobin
        server  app1 127.0.0.1:5001 check
        server  app2 127.0.0.1:5002 check
        server  app3 127.0.0.1:5003 check
        server  app4 127.0.0.1:5004 check

      
#### Se reinicia el servicio haproxy:

      $ sudo systemctl restart haproxy

#### Se prueba en:
      - http://proyecto23.dis.eafit.edu.co
      - https://proyecto23.dis.eafit.edu.co


## Implementacion del single sing on para la plataforma

#### se introduce el siguiente bloque de codigo dentro de template de html para crear el boton y guardar la sesion.
        <html>
        <head>
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
          <script src="https://apis.google.com/js/api:client.js"></script>
          <script>
          var googleUser = {};
          var startApp = function() {
            gapi.load('auth2', function(){
              // Retrieve the singleton for the GoogleAuth library and set up the client.
              auth2 = gapi.auth2.init({
                client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
              });
              attachSignin(document.getElementById('customBtn'));
            });
          };

          function attachSignin(element) {
            console.log(element.id);
            auth2.attachClickHandler(element, {},
                function(googleUser) {
                  var profile = googleUser.getBasicProfile();
                  sessionStorage.setItem("user", profile.getName());
                  sessionStorage.setItem("id",profile.getId());
                  sessionStorage.setItem("email", profile.getEmail());
                  sessionStorage.setItem("image", profile.getImageUrl());
                  window.location.href = "<%=baseurl%>home";
                }, function(error) {
                  alert(JSON.stringify(error, undefined, 2));
                });
          }
          </script>
          <style type="text/css">
            #customBtn {
              display: inline-block;
              background: white;
              color: #444;
              width: 190px;
              border-radius: 5px;
              border: thin solid #888;
              box-shadow: 1px 1px 1px grey;
              white-space: nowrap;
            }
            #customBtn:hover {
              cursor: pointer;
            }
            span.label {
              font-family: serif;
              font-weight: normal;
            }
            span.icon {
              background: url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
              display: inline-block;
              vertical-align: middle;
              width: 42px;
              height: 42px;
            }
            span.buttonText {
              display: inline-block;
              vertical-align: middle;
              padding-left: 42px;
              padding-right: 42px;
              font-size: 14px;
              font-weight: bold;
              /* Use the Roboto font that is loaded in the <head> */
              font-family: 'Roboto', sans-serif;
            }
          </style>
          </head>
          <body>
          <!-- In the callback, you would hide the gSignInWrapper element on a
          successful sign in -->
          <div id="gSignInWrapper">
            <span class="label">Sign in with:</span>
            <div id="customBtn" class="customGPlusSignIn">
              <span class="icon"></span>
              <span class="buttonText">Google</span>
            </div>
          </div>
          <div id="name"></div>
          <script>startApp();</script>
        </body>
        </html>    
