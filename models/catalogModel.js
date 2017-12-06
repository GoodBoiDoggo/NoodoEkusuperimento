var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {
	    type: String,
	    unique: true,
	    required: true
	  },
	  name: {
	    type: String,
	    required: true
	  },
	  hash: String,
	  salt: String
	
},{ collection : 'catalogdata' });

var User = mongoose.model('User', userSchema);

module.exports = User;