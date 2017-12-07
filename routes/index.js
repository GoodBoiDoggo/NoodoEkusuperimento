
/*
 * GET home page.
 */
var setupController = require('../controllers/setupController');
var apiController = require('../controllers/apiController');



module.exports = function(app){
	app.get('/',function(req,res){
		res.render('index', { title:'Welcome to Karuteun' });
	});
	app.get('/api2/:id', function(req, res){
		console.log(req.params.id);
		res.json({firstname: 'John', lastname: 'Doe', ID: req.params.id});
	});
	app.get('/api2',function(req,res) {
		console.log("BOI");
		res.send("");
	});
	app.get('/api3', function(req,res){
		console.log("YO DAWG");
		res.json({firstname: 'Joni', lastname: 'Depth'});
	});
	app.get('/crud', function(req,res){
		res.render('../views/CRUDPage.ejs');
	});
	app.get('/catalog', function (req, res){
		res.render('../views/catalog.ejs');
	});
	
	setupController(app);
	apiController(app);
};