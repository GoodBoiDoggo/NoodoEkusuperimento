var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('./profile');
var ctrlAuth = require('./authentication');

	module.exports= function(app){
	// profile
	app.get('/api/profile', auth, ctrlProfile.profileRead);
	
	// authentication
	app.post('/register', ctrlAuth.register);
	app.post('/login', ctrlAuth.login);
	

};