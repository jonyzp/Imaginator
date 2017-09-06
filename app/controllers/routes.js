var express = require('express'),
  config = require('../../config/config'),
  router = express.Router();

  module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  if(req.session.user){
    res.redirect(config.baseUrl+'home');
  }
  else {
    res.render('home',{baseurl:config.baseUrl});
  }
});

router.get('/sing_up', function (req, res, next) {
  if(req.session.user){
    res.redirect(config.baseUrl+'home');
  }
  else {
    res.render('login',{baseurl:config.baseUrl});
  }
});

router.get('/home',function (req, res) {
    res.render('homeuser',{baseurl:config.baseUrl});
  /*
  if(req.session.user){
    res.render('homeuser',{baseurl:config.baseUrl});
  }
  else {
    if(req.query.user){
        req.session.user =req.query.user;
        req.session.email = req.query.email;
        req.session.image = req.query.image;
        res.render('homeuser',{baseurl:config.baseUrl});
    }
    else{
        res.redirect(config.baseUrl);
    }
  }
*/
});

router.get('/profile',function (req, res) {
    res.render('infoUser',{baseurl:config.baseUrl});
    /*
  var u = req.session.user;
  if(u) {
    res.render('infoUser',{user: u,email:req.session.email,id:req.session.user_id,baseurl:config.baseUrl});
  }
  else {
    res.redirect(config.baseUrl);
  }
*/
});

router.get('/createform', function (req, res, next) {
    res.render('createimageform',{title:"hola",baseurl:config.baseUrl});
 /*
  if(req.session.email){
    res.render('createimageform',{title:"hola",baseurl:config.baseUrl});
  }
  else {
    res.redirect(config.baseUrl);
  }
  */
});

router.get('/my_images',function (req, res, next) {
    res.render('imagesList',{baseurl:config.baseUrl});
  /*
  if(req.session.email){
   res.render('imagesList',{id:req.session.user_id,baseurl:config.baseUrl});
  }
  else {
    res.redirect(config.baseUrl);
  }
  */
});

router.get('/edit_account',function (req, res, next) {
  if(req.session.email){
    res.render('updateuserform',{id:req.session.user_id,username:req.session.user,baseurl:config.baseUrl});
  }
  else {
    res.redirect(config.baseUrl);
  }
});

router.get('/shared_with_me',function (req, res, next) {
    res.render('shared_with_me',{baseurl:config.baseUrl});
  /*
    if(req.session.email){
    res.render('shared_with_me',{id:req.session.user_id,baseurl:config.baseUrl});
  }
  else {
    res.redirect(config.baseUrl);
  }
  */
});


