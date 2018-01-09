var mongoose = require('mongoose');
var Catalog = require('../models/catalogModel');
var User = mongoose.model('User');

module.exports = function(app) {
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
    app.put('/item/:prodcode', (req, res) => {

        Catalog.findOne({ prodcode: req.params.prodcode }, (err, result) => {
            if (err) throw err;
            console.log(result);
            result.set(req.body);
            result.save((err) => {
                if (err) throw err;
                res.status(200);
                res.send('Item ' + req.params.prodcode + ' updated.');
            });
        });
    });
    app.post('/item/rate/:prodcode', (req, res) => {
        console.log('Updating rating');
        User.findOne({ _id: req.body._id }, (err, user) => {
            if (err) throw err;
            if (user != undefined) {
                Catalog.findOne({ prodcode: req.params.prodcode }, (err, item) => {
                    if (err) throw err;
                    if (item != undefined) {
                        if (user.ratedetails.hasRated) {
                            item.rateavg = ((item.rateavg * item.ratercount) - user.ratedetails.rating + req.body.rating) / item.ratercount;
                            user.ratedetails.rating = req.body.rating;
                            user.hasRated = true;

                            item.save((err) => {
                                if (err) throw err;

                                user.save(err => {
                                    if (err) throw err;
                                    res.status(200);
                                    res.send('Rating updated!');
                                });

                            });
                        } else {

                            item.rateavg = ((item.rateavg * item.ratercount) + req.body.rating) / (item.ratercount + 1);
                            item.ratercount++;
                            user.ratedetails.rating = req.body.rating;
                            user.ratedetails.hasRated = true;
                            item.save((err) => {
                                if (err) throw err;

                                user.save(err => {
                                    if (err) throw err;
                                    res.status(200);
                                    res.send('Rating updated!');
                                });

                            });
                        }
                    } else {
                        res.status(404);
                        console.log('Item not found!');
                        res.send('Item not found!');
                    }
                });

            } else {
                res.status(404);
                console.log('User not found!');
                res.send('User not found!');
            }
        });
    });
}