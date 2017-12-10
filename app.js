
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

var mongoose = require('mongoose');
var config = require('./config');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app_client/views');
//app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/boi', express.static(path.join(__dirname,'app_client','controllers')));
app.use('/pic', express.static(path.join(__dirname,'app_client','images')));
app.use('/service',express.static(path.join(__dirname,'app_client','services')));

require('./routes')(app);


try{mongoose.connect(config.getDbConnectionString());}
catch(err){
	console.log("Mongo Connection Failed");
}

//sdsdsfsdfsd
// development only
if ('development' == app.get('env')) {
}



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
