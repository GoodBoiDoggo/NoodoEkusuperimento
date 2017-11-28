var Todos = require('../models/todoModel');
var Catalog = require('../models/catalogModel');
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
		
//		
	//	For catalog
//			var catalogItems = [
//				{
//					prodname: 'Addadas Running Shoes',
//					prodtype: 'Shoes',
//					prodprice: 4000,
//					isavailable: true,
//					imgname: 'product1.png',
//					tags:['white', 'running shoes', 'slav','addadas'],
//					ratercount: 1,
//					rateavg: 5,
//					salerate: 0,
//					reviews: ['After using this shoe I won against Usain bolt! I give 5/5!'],
//					proddesc: 'Shoes with cotton surface with the addadas mark. The shoes laces are ceramic.'
//				},
//				{
//					prodname: 'Knighkee Walking Shoes',
//					prodtype: 'Shoes',
//					prodprice: 5999,
//					isavailable: true,
//					imgname: 'product2.png',
//					tags:['white', 'walking shoes', 'authentic','knighkee'],
//					ratercount: 0,
//					rateavg: 0,
//					salerate: 0,
//					reviews: [],
//					proddesc: 'Walking with this shoe gives too much pleasure that you wont be able to run again.\n'+
//								'It does this by injecting hormones that make the wearer masochistic then slowly melts the feet.'
//				},
//				{
//					prodname: 'Boots of Travel',
//					prodtype: 'Shoes',
//					prodprice: 3000,
//					isavailable: true,
//					imgname: 'product3.png',
//					tags:['orange', 'special shoes', 'teleport'],
//					ratercount: 0,
//					rateavg: 0,
//					salerate: 0.1,
//					reviews: [],
//					proddesc: 'Teleport to any friendly buildings.'
//				},
//				{
//					prodname: 'Arcane boots',
//					prodtype: 'Shoes',
//					prodprice: 1300,
//					isavailable: false,
//					imgname: 'product4.png',
//					tags:['blue', 'magic shoes', 'restore', 'mana'],
//					ratercount: 1,
//					rateavg: 3,
//					salerate: 0,
//					reviews: ['It is too Arcane that I wasnt able to understand how to wear it.'],
//					proddesc: 'Dispenses Gatorade from your feet.'
//				},
//				{
//					prodname: 'iPhone XXX Ultra Thin',
//					prodtype: 'Smartphone',
//					prodprice: 500000,
//					isavailable: true,
//					imgname: 'product5.png',
//					tags:['thin', 'iPhone', 'expensive'],
//					ratercount: 0,
//					rateavg: 0,
//					salerate: 0,
//					reviews: [],
//					proddesc: 'As thin as two stacked illustration boards yet as hard as a diamond'
//				},
//				{
//					prodname: 'Samsvng Galaxy S500',
//					prodtype: 'Smartphone',
//					prodprice: 10000,
//					isavailable: false,
//					imgname: 'product6.png',
//					tags:['vintage', 'samsvng', 'screenless','voice control'],
//					ratercount: 0,
//					rateavg: 0,
//					salerate: 0,
//					reviews: [],
//					proddesc:'Telephone that can contact phones outside Earth. Standard charges apply.\n'+
//								'Can be controlled using voice.'
//				},
//				{
//					prodname: 'Samsung Shoephone X',
//					prodtype: 'Shoephone',
//					prodprice: 17000,
//					isavailable: true,
//					imgname: 'product7.png',
//					tags:['hi-tech', 'samsvng', 'shoephone'],
//					ratercount: 0,
//					rateavg: 0,
//					salerate: 0.3,
//					reviews: [],
//					proddesc: 'Never fail in no-calculator exams ever again!'
//					
//				},
//
//				{
//					prodname: 'Kariteun Hologram Phone',
//					prodtype: 'Smartphone',
//					prodprice: 500000,
//					isavailable: true,
//					imgname: 'product8.png',
//					tags:['hologram', 'hi-tech', 'kariteun','bluescreen'],
//					ratercount: 1,
//					rateavg: 1,
//					salerate: 0,
//					reviews: ['FAKE! It just glass not hologram!!! Still cool tho. 1/5'],
//					proddesc:'Better than any phone. You will see when you buy it. No warranties.'
//				},
//			];
	//
//			Todos.create(starterTodos, function(err, results){
//				res.send(results);
//			})
//			Catalog.create(catalogItems, function(err,results){
//				res.send(results);
//			})
//			
//		Todos.find(function(err,results){
//			res.send(results);
//		})
		
	})
	
		
}
