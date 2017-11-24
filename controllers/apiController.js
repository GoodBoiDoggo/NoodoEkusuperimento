/**
 * http://usejsdoc.org/
 */
var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

module.exports = function(app){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	app.get('/api/all', function(req,res){
		Todos.find(function(err,results){
			res.send(results);
		})
		
	})
	
	app.get('/api/:id', function(req,res){
		Todos.find({_id: req.params.id},
				function(err,results){
					res.send(results);
		
		})
	})
	
	app.get('/testboi', function (req,res){
		res.send("BOIBOIBOIBOIBOIBOIB");
		console.log("BOIIIIIIIIIIIIIIIIIIII");
	})
	
	app.post('/api/add', function (req,res){
		var newTodo = Todos({
			username: req.body.username,
			todo: req.body.todo,
			isDone: false,
			hasAttachment: false
		});
		newTodo.save(function(err){
			console.log("Success");
		})
		res.render('../views/CRUDPage.ejs');
	})
	
	
	
}