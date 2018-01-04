/*
 * GET home page.
 */
var setupController = require('../controllers/setupController');
var apiController = require('../controllers/apiController');
var Todos = require('../models/todoModel');
var Catalog = require('../models/catalogModel');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authController = require('../controllers/authController');

module.exports = function(app) {
    //setupController(app); //use only when creating new sample data
    //API's
    authController(app);
    apiController(app);
    app.get('/catalog/all', function(req, res) {

        Catalog.find(function(err, results) {
            if (err) throw err;
            res.send(results);
        })
    });
    app.get('/item/:prodcode', function(req, res) {

        Catalog.find({ prodcode: req.params.prodcode }, function(err, results) {
            if (err) throw err;
            res.send(results);
            console.log("Item sent");
        })
    });
    app.get('/api2/:id', function(req, res) {
        console.log(req.params.id);
        res.json({ firstname: 'John', lastname: 'Doe', ID: req.params.id });
    });
    app.get('/api2', function(req, res) {
        console.log("BOI");
        res.send("");
    });
    app.get('/api3', function(req, res) {
        console.log("YO DAWG");
        res.json({ firstname: 'Joni', lastname: 'Depth' });
    });

    //	app.get('/catalog', function (req, res){
    //		res.render('../views/catalog.ejs');
    //	});
    app.get('/*', function(req, res) {
        console.log("Index file served.");
        //res.sendfile('app_client/app/index.html');
        var options = {
            root: './app_client/app',
            headers: {
                'Content-Type': 'text/html',
            }
        };
        res.sendFile('index.html', options, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent: index.html');
            }
        });
    });




    apiController(app);
};