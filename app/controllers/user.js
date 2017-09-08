
var express = require('express'),
  config = require('../../config/config'),
  bcrypt = require('bcryptjs'),
  salt = bcrypt.genSaltSync(10);
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  mongoose.Promise = global.Promise;

  User = require('./../models/user');
module.exports = function (app) {
  app.use('/User', router);
};


router.post('/login', function (req, res, next) {
    if(req.body.email=='' || req.body.email==null || req.body.password=='' || req.body.password==null){
        res.end("0")
    }else {

        User.find({email: req.body.email}, function (err, doc) {
            if (err) {
                return next(err);
            }
            if (doc != null) {

                if (bcrypt.compareSync(req.body.password, doc[0].password)) {

                    res.send({user: doc.user, email: doc.email, id: doc._id});
                }
                else {
                    res.end("0");
                }
            }
            else {
                res.end("0")
            }
        });
    }

});

router.post('/',function(req,res){
    var user = new User({});
  if (req.body.id != null){
      User.find({id:req.body.id},function (err, doc) {
          if (doc == null){
              user = new User({
                  email:req.body.email,
                  user:req.body.user,
                  id:req.body.id
              });
              user.save(function (err) {
                  if (!err) {
                      //return console.log("created");
                      res.end("1");
                  }
                  else{
                      console.log("entre 1"+err);

                      res.end("0");
                  }
              });
          }
      });

  }
  else{
    if (req.body.email != null){
        var hash = bcrypt.hashSync(req.body.password, salt);
        user = new User({
            email:req.body.email,
            user:req.body.user,
            password:hash
        });
        user.save(function (err) {
            if (!err) {
                //return console.log("created");
                res.end("1");
            }
            else{
                console.log("entre 2"+err);
                res.end("0");
            }
        });
    }
  }




});

router.post('/logout',function (req, res) {
  req.session.destroy();
  res.redirect(config.baseUrl);
});

router.put('/',function (req, res, next) {
  id = mongoose.Types.ObjectId(req.query.user_id);
  if(req.body.password == req.body.password_confirm){
    User.findById(id,function (err, user) {
      if (err){ res.send(err);}
      if( bcrypt.compareSync(req.body.current,user.password)){
        user.user = req.body.user_name;
        user.password = bcrypt.hashSync(req.body.password, salt);

        user.save(function (err) {
          if (!err) {
            req.session.user = user.user;
            res.end("1");
          } else {
            res.end("0");
          }
        });
    }
      else {
        res.end("2");
      }
    });
  }
  else{
    res.end("3");
  }
});

router.delete('/',function (req, res, next) {

  User.find({id:req.body.id},function (err, user) {
    if (req.body.password == undefined){res.end("0");    }
    else{
      if (bcrypt.compareSync(req.body.password,user.password)){
        User.remove({_id:req.query.user_id},function (err, user) {
          if (err){
            res.send(err);
            res.end("0");
          }
          req.session.destroy();
          res.end("1");
        });
      }
    }
  });

});
