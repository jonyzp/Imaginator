var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ImageSchema = new Schema({
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
    user:String}],
  img: { data: Buffer, contentType: String }
});
module.exports = mongoose.model('Image', ImageSchema);
