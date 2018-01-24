var mongoose = require('mongoose');
var Catalog = require('../models/catalogModel');
var User = mongoose.model('User');
var cors = require('cors');
module.exports = function(app) {

    app.get('/catalog/all', function(req, res) {

        Catalog.find(function(err, results) {
            if (err) throw err;
            res.send(results);
        })
    });
    app.get('/item/:prodcode', function(req, res) {

        Catalog.findOne({ prodcode: req.params.prodcode }, function(err, results) {
            if (err) throw err;
            res.send(results);
            console.log("Item sent");
        })
    });
    app.get('/items/:prodcode', function(req, res) {
        var prodcodes = req.params.prodcode.split('-');
        Catalog.find({ prodcode: { $in: prodcodes } }, function(err, results) {
            if (err) throw err;
            console.log(results);
            res.send(results);
            console.log("Item sent");
        })
    });
    app.options('/item/:prodcode', cors());
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

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return -1;
        }


        User.findOne({ _id: req.body._id }, (err, user) => {
            if (err) throw err;
            if (user != undefined) {
                Catalog.findOne({ prodcode: req.params.prodcode }, (err, item) => {
                    if (err) throw err;
                    if (item != undefined) {
                        if (user.ratedetails.length > 0) {
                            var itemPosition = arrayObjectIndexOf(user.ratedetails, req.params.prodcode, 'itemrated');
                            if (itemPosition > -1) {
                                item.rateavg = ((item.rateavg * item.ratercount) - user.ratedetails[itemPosition].rating + req.body.rating) / item.ratercount;
                                user.ratedetails[itemPosition].rating = req.body.rating;


                                item.save((err) => {
                                    if (err) throw err;

                                    user.save(err => {
                                        if (err) throw err;
                                        res.status(200);
                                        res.send('Rating updated!');
                                    });

                                });
                            } else {
                                //PUSH NEW RATING
                                item.rateavg = ((item.rateavg * item.ratercount) + req.body.rating) / (item.ratercount + 1);
                                item.ratercount++;
                                user.ratedetails.push({
                                    rating: req.body.rating,
                                    itemrated: req.params.prodcode
                                });

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
                            //PUSH NEW RATING
                            item.rateavg = ((item.rateavg * item.ratercount) + req.body.rating) / (item.ratercount + 1);
                            item.ratercount++;
                            user.ratedetails.push({
                                rating: req.body.rating,
                                itemrated: req.params.prodcode
                            });

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