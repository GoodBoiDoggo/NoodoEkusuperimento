/**
 * http://usejsdoc.org/
 */

var Catalog = require('../models/catalogModel');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var mailer = require('./mailController');
var cors = require('cors');
module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/api/activate/:code', function(req, res) {

        User.findByActivation(req.params.code, function(err, account) {
            //sds
            if (account[0] != undefined) {
                User.findByIdAndUpdate(account[0]._id, {
                    active: true,
                    $unset: { activation: 1 }
                }, function(err, data) {
                    if (err) throw err;
                    console.log('[' + account[0].email + 'Activation successful.');
                });

                if (!account[0].fbid) {
                    res.status(200);
                    res.send('<html><body><h1>Account successfully activated!</h1><br><p>Click here to go to <a href="https://kariteun-shopping.mybluemix.net">Kariteun Website</a></p></body></html>');
                } else {
                    res.status(200);
                    res.send('<html><body><h1>Account successfully activated!</h1><br><p>You may now use the full functionality of the Kariteun Messenger Chat App. You may also visit the <a href="https://kariteun-shopping.mybluemix.net">Kariteun Website</a>to access the site outside messenger.</p></body></html>');
                }
            } else {
                res.status(400);
                res.send('Account does not exist/already activated');
            }
        });

    });


    app.options('/api/updateDDA', cors());
    app.put('/api/updateDDA', function(req, res) {
        User.findByIdAndUpdate(req.body._id, {
            address: req.body.address,
            postalcode: req.body.postalcode
        }, function(err, data) {
            if (err) throw err;
            res.status(200);
            console.log('DDA Updated!')
            if (!req.body.address) {
                if (!data.address) {
                    if (data.postalcode == req.body.postalcode) {
                        res.send('No changes detected.');
                    } else if (!req.body.postalcode) {
                        res.send('Postal code has been removed.');
                    } else {
                        res.send('New postal code has been set.');
                    }
                } else {
                    res.send('DDA has been removed.');
                }

            } else if (data.address == req.body.address) {
                if (data.postalcode == req.body.postalcode) {
                    res.send('No changes detected.');
                } else if (req.body.postalcode) {
                    res.send('New postal code has been set.')
                } else {
                    res.send('Postal code has been removed.')
                }
            } else {
                res.send('New DDA has been set.');
            }

        });

    });

    app.post('/api/review', function(req, res) {
        console.log('Adding review');
        req.body.review._id = new mongoose.Types.ObjectId();
        console.log('ID created');
        Catalog.findOneAndUpdate({ prodcode: req.body.prodcode }, {
            $push: { reviews: req.body.review }
        }, function(err) {
            console.log('Review status:');
            if (err) throw err;

            res.status(200);
            res.send('Review added');
            console.log('Review added to ' + req.body.prodcode);


        });

    });
    app.options('/api/review/:prodcode/:id', cors());
    app.delete('/api/review/:prodcode/:id', function(req, res) {
        console.log('Deleting review');
        Catalog.findOneAndUpdate({ prodcode: req.params.prodcode }, {
            $pull: { reviews: { _id: { $in: [req.params.id] } } }
        }, function(err) {
            console.log('Review status:');
            if (err) throw err;

            res.status(200);
            res.send('Review deleted');
            console.log('Review deleted from ' + req.params.prodcode);


        });

    });
    app.options('/api/review/:prodcode', cors());
    app.put('/api/review/:prodcode', function(req, res) {
        console.log('Modifying review');
        Catalog.findOneAndUpdate({ prodcode: req.params.prodcode }, {
            $pull: { reviews: { _id: { $in: [req.body._id] } } }
        }, function(err) {
            console.log('Review status:');
            if (err) throw err;
            console.log('Old review deleted. Adding new review...');
            Catalog.findOneAndUpdate({ prodcode: req.params.prodcode }, {
                $push: { reviews: req.body }
            }, function(err) {
                console.log('Review status:');
                if (err) throw err;

                res.status(200);
                res.send('Review added');
                console.log('Review added to ' + req.params.prodcode);


            });



        });

    });
    app.post('/api/resend', function(req, res) {

        User.findOne({ email: req.body.email }, function(err, results) {

            if (err) throw err;

            if (results.length != 0) {
                if (!results.activation) {
                    res.status(400);
                    res.send('Your account is already activated. Please refresh the page.');
                } else {
                    mailer.sendVerification(results.email, results.activation);
                    console.log('Email sent.');
                    res.status(200);
                    res.send('Email has been sent.');
                }
            } else {
                res.status(400);
                res.send('Email sending failed. Please retry later.');
            }
        })
    });

}