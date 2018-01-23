var Todos = require('../models/todoModel');
var Catalog = require('../models/catalogModel');
var mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/setup', function(req, res) {
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

        var catalogItems = [{
                prodcode: 'I00001',
                prodname: 'Adidas Running Shoes',
                prodtype: 'running',
                prodprice: 4000,
                imgname: 'product1.png',
                tags: ['white', 'shock absorb', 'Adidas', 'running', 'cotton top'],
                prodcolor: 'white',
                prodbrand: 'Adidas',
                gender: 'female',
                ratercount: 1,
                rateavg: 5,
                discountrate: 0,
                reviews: [],
                // [{
                //     userid: '5a4b86851745841fdc4b67aa',
                //     username: 'Testu Akawntu',
                //     reviewstring: 'After using this shoe I won against Usain bolt! I give 5/5!'
                // }],
                proddesc: 'Shoes with cotton surface with the Adidas mark. The shoes laces are ceramic.',
                viewcount: 0
            },
            {
                prodcode: 'I00002',
                prodname: 'Nike Walking Shoes',
                prodtype: 'walking',
                prodprice: 5999,
                imgname: 'product2.png',
                tags: ['white', 'walking', 'light', 'Nike'],
                prodcolor: 'white',
                prodbrand: 'Nike',
                gender: 'male',
                ratercount: 0,
                rateavg: 0,
                discountrate: 0,
                reviews: [],
                proddesc: 'Allows walking at 3mps with ease.',
                viewcount: 0
            }, {
                prodcode: 'I00003',
                prodname: 'Shoes of Travel',
                prodtype: 'casual',
                prodprice: 3000,
                imgname: 'product3.png',
                tags: ['orange', 'special shoes', 'teleport', 'kids', 'Moose Gear'],
                prodcolor: 'orange',
                prodbrand: 'Moose Gear',
                gender: 'male',
                ratercount: 0,
                rateavg: 0,
                discountrate: 0.1,
                reviews: [],
                proddesc: 'Traveling has never been more satisfying with this one.',
                viewcount: 0
            }, {
                prodcode: 'I00004',
                prodname: 'Adidas Magic Blue',
                prodtype: 'walking',
                prodprice: 1300,
                imgname: 'product4.png',
                tags: ['blue', 'magic', 'walking', 'Adidas'],
                prodcolor: 'blue',
                prodbrand: 'Adidas',
                gender: 'female',
                ratercount: 1,
                rateavg: 3,
                discountrate: 0,
                reviews: [],
                // [{
                //     userid: '5a4b86851745841fdc4b67aa',
                //     username: 'Testu Akawntu',
                //     reviewstring: 'It is too blue that it looks like magic.'
                // }],
                proddesc: 'Blue shoes made from naturally blue materials to maximize aesthetics and comfort as well.',
                viewcount: 0
            }, {
                prodcode: 'I00005',
                prodname: 'Adidas Spikezxc',
                prodtype: 'leather',
                prodprice: 500000,
                imgname: 'product5.png',
                tags: ['waterproof', 'Adidas', 'leather', 'porcupine'],
                prodcolor: 'brown',
                prodbrand: 'Adidas',
                gender: 'male',
                ratercount: 3,
                rateavg: 5,
                discountrate: 0,
                reviews: [],
                // [{
                //         userid: '5a4b86851745841fdc4b67aa',
                //         username: 'Testu Akawntu',
                //         reviewstring: 'It is too good it hurts! Pun intended'
                //     },
                //     {
                //         userid: '5a4b86851745841fdc4b67aa',
                //         username: 'Testu Akawntu',
                //         reviewstring: 'Now no one will dare step on my new shoes.'
                //     },
                //     {
                //         userid: '5a4b86851745841fdc4b67aa',
                //         username: 'Testu Akawntu',
                //         reviewstring: 'I rated this 5 becoz i love porcupines <3'
                //     }
                // ],
                proddesc: 'A leather shoe crafted to perfection using porcupine spikes and leather. Extremely waterproof.',
                viewcount: 0
            }
        ];
        //
        //			Todos.create(starterTodos, function(err, results){
        //				res.send(results);
        //			})
        Catalog.create(catalogItems, function(err, results) {
                res.send(results);
            })
            //			
            //		Todos.find(function(err,results){
            //			res.send(results);
            //		})

    })


}