var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var UserSchema = new Schema({
  email: {type: String, unique: true, required: true},
  user: {type: String, unique: true, required: true},
  id: String,
  password: String
});
module.exports = mongoose.model('User', UserSchema);

