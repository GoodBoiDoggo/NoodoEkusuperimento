//var mongoose = require('mongoose');
//
//var Schema = mongoose.Schema;
//
//var userSchema = new Schema({
//	email: {
//	    type: String,
//	    unique: true,
//	    required: true
//	  },
//	  name: {
//	    type: String,
//	    required: true
//	  },
//	  hash: String,
//	  salt: String
//	
//},{ collection : 'userdata' });
//
//var User = mongoose.model('User', userSchema);
//
//module.exports = User;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String
},{ collection : 'userdata' });

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);