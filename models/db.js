var mongoose = require('mongoose');
var gracefulShutdown;
var config = require('../config');
//var dbURI = 'mongodb://localhost/meanAuth';
//if (process.env.NODE_ENV === 'production') {
//  dbURI = process.env.MONGOLAB_URI;
//}

var promise = mongoose.connect(config.getDbConnectionString(), {
	  useMongoClient: true
	});
promise.then(function(db) {
	mongoose.openUri(config.getDbConnectionString());
});

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected');
  console.log('asdasdasdasdsa');
});
console.log('hiiiiiiiiiiiiiii');
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
console.log('hello');
mongoose.connection.on('disconnected', function() {
	
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
console.log('hello world');
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./userModel');
require('./catalogModel');
console.log('db model through');