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
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        sparse: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    postalcode: {
        type: String
    },
    loginsession: String, //Date().valueOf();
    fbid: {
        type: String,
        unique: true,
        index: true,
        sparse: true
    },
    ratedetails: [{
        itemrated: String,
        rating: Number
    }],
    hash: String,
    salt: String,
    active: Boolean,
    activation: {
        type: String
    }
}, { collection: 'users' });

userSchema.statics.findByActivation = function(activation, cb) {
    return this.find({ activation: new RegExp(activation, 'i') }, cb);
};

userSchema.methods.setRateDetails = function() {
    this.ratedetails = [];
}

userSchema.methods.setActivationCode = function(data) {
    var salter = crypto.randomBytes(16).toString('hex');
    this.activation = crypto.pbkdf2Sync(data, salter, 1000, 64, 'sha512').toString('hex');
}
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        // email: this.email,
        // firstname: this.firstname,
        // lastname: this.lastname,
        // address: this.address,
        // postalcode: this.postalcode,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET");
};

mongoose.model('User', userSchema);