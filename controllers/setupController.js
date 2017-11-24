var Todos = require('../models/todoModel');

var mongoose = require('mongoose');

module.exports = function(app){ 
	app.get('/setup', function(req,res){
//		
//	
//		var starterTodos = [
//			{
//				username: 'test',
//				todo: 'Buy milk',
//				isDone: false,
//				hasAttachment: false
//			},
//			{
//				username: 'test2',
//				todo: 'Buy cow',
//				isDone: false,
//				hasAttachment: false		
//			}
//		];
//
//		Todos.create(starterTodos, function(err, results){
//			res.send(results);
//		})
		Todos.find(function(err,results){
			res.send(results);
		})
		
	})
	
		
}
