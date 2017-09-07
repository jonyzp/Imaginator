var express = require('express'),
  router = express.Router(),
  config = require('../../config/config'),
  mongoose = require('mongoose'),
  multer  = require('multer'),
  User = mongoose.model('User'),
  fs = require('fs'),
  direccion = "",
  dataType = "",
  imagename="",
  variante=1;
  Image = mongoose.model('Image');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (variante==1){
          cb(null, 'public/uploads/');
          direccion = 'public/uploads/';
          dataType = file.mimetype;
      }
      else {
          cb(null, 'public/uploads2/');
          direccion = 'public/uploads2/';
          dataType = file.mimetype;
      }
    },
    filename: function (req, file, cb) {
      imagename = Date.now()+ '-' + file.originalname;
      cb(null, imagename);

    }
});
var upload = multer({ storage: storage });


module.exports = function (app) {
  app.use('/Image', router);
};
router.get('/see', function (req, res, next) {
  id = mongoose.Types.ObjectId(req.query.image_id);
  Image.findById(id, function (err, doc) {
    if (err) return next(err);
      res.contentType(doc.img.contentType);
      res.send(fs.readFileSync(doc.img.location));
  });
});
router.get('/',function (req, res, next) {
  id = mongoose.Types.ObjectId(req.query.image_id);
  Image.findById(id,function (err, image) {
    if (err){ res.send(err);}
    res.render('updateimageform',{title:image.title, format:image.format, width:image.width, height:image.height, id:image._id,baseurl:config.baseUrl});
  });
});

router.post('/', upload.single('image'), function (req, res, next) {
  if(variante==1){
    variante=0;
  }
  else{
    variante=1;
  }
  console.log("location: "+direccion+"-------- contentype: "+dataType);
  var image = new Image({
    title: req.body.title,
    format: req.body.format,
    width: req.body.width,
    height: req.body.height,
    capture_date: req.body.capdate,
    quality: req.body.quality,
    img: {location:direccion + imagename, contentType:dataType},
    user_id : req.body.user_id,
    visibility: req.body.visibility

  });
  image.save(function (err) {
    if (!err) {
      //return console.log("created");
      res.redirect(config.baseUrl+'home');
    } else {
      //TODO: return page with errors
      res.end(err);
    }
  });
});

router.put('/',function (req, res, next) {
  id = mongoose.Types.ObjectId(req.query.image_id);
  Image.findById(id,function (err, image) {
    if (err){ res.send(err);}
    if (req.body.title != "" && req.body.format != "" && req.body.width != "" && req.body.height != "") {
      image.title = req.body.title;
      image.format = req.body.format;
      image.width = req.body.width;
      image.height = req.body.height;
      image.visibility = req.body.visibility;
      image.save(function (err) {
        if (!err) {
          //return console.log("created");
          res.end("1");
        } else {
          //TODO: return page with errors
          res.end("0");
        }
      });
    }
    else {res.end("0");}
  });
});

router.delete('/',function (req, res, next) {
  Image.remove({_id:req.query.image_id},function (err, image) {
    if (err){
      res.send(err);
      res.send("0")
    }
    res.end("1");
  });
});

router.post('/user_images',function (req, res, next) {
  Image.find({user_id:req.query.user_id},function (err, docs) {
    if (err){ res.send(err);}
    else{ res.send(docs);}
  });

});

router.post('/public_images',function (req, res, next) {
  Image.find({visibility:"public"},function (err, docs) {
    if (err){ res.send(err);}
    else{ res.send(docs);}
  });
});

router.post('/shared_with_me',function (req, res, next) {
  Image.find({"shared_with.username":req.query.user},function (err, docs) {
    if (err){ res.send(err);}
    else{ res.send(docs);}
  });
});

router.post('/search',function (req, res, next) {
    text = req.body.search;
  Image.find({title: new RegExp(text+'+', "i"),visibility:"public"}, function(err, docs) {
    if (err){ res.send(err);}
    else{ res.send(docs);}
  });
});

router.put('/share',function (req, res, next) {
  User.find({user:req.query.username},function (err,user) {
    if (user.length){
      id = mongoose.Types.ObjectId(req.body.image_id);
      Image.findById(id,function (err,  image) {
        console.log("user id " + user[0]._id);
        image.shared_with.push({username:user[0].user,user:user[0]._id});
        image.save(function (err) {
          if (!err) {
            //return console.log("created");
            res.end("1");
          } else {
            //TODO: return page with errors;
            res.end("0");
          }
        });
      });
    }
    else{
      res.end("0");
    }
  });

});
