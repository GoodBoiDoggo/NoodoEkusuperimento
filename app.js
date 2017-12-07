
/**
 * Module dependencies.
 */

var express = require('express')
//  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var mongoose = require('mongoose');
var config = require('./config');

var bodyParser = require('body-parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app_client/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/boi', express.static(path.join(__dirname,'app_client','controllers')));
app.use('/pic', express.static(path.join(__dirname,'app_client','images')));
//sdsdsfsdfsd
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//testController(app);

require('./routes')(app);

app.get('/users', user.list);

//app.get('/bois', bois.good);
mongoose.connect(config.getDbConnectionString());
//setupController(app);
//apiController(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
