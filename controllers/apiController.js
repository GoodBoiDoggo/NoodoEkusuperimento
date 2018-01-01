/**
 * http://usejsdoc.org/
 */

var Catalog = require('../models/catalogModel');
//var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));



    // app.post('/api/add', function(req, res) {
    //     var newTodo = Todos({
    //         username: req.body.username,
    //         todo: req.body.todo,
    //         isDone: false,
    //         hasAttachment: false
    //     });
    //     newTodo.save(function(err) {
    //         console.log("Success");
    //     })
    //     res.render('../views/CRUDPage.ejs');
    // })


    app.get('/api/activate/:code', function(req, res) {

        User.findByActivation(req.params.code, function(err, account) {
            //sds
            if (account[0] != undefined) {
                User.findByIdAndUpdate(account[0]._id, {
                    active: true,
                    $unset: { activation: 1 }
                }, function(err, data) {
                    if (err) throw err;
                });
                res.status(200);
                if (!account[0].fbid) {
                    res.send('<html><body><h1>Account successfully activated!</h1><br><p>Click here to go to <a href="kariteun-shopping.mybluemix.net">Kariteun Website</a></p></body></html>');
                } else {
                    res.send('<html><body><h1>Account successfully activated!</h1><br><p>You may now use the full functionality of the Kariteun Messenger Chat App. You can log in to the <a href="kariteun-shopping.mybluemix.net">Kariteun Website</a> using the email address and password for this account</p></body></html>');
                }
            } else {
                res.status(400);
                res.send('Account does not exist/already activated');
            }
        });

    });



    app.post('/api/updateDDA', function(req, res) {
        User.findByIdAndUpdate(req.body._id, {
            address: req.body.address,
            postalcode: req.body.postalcode
        }, function(err, data) {
            if (err) throw err;
            res.status(200);
            console.log('DDA  Updated!')
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
            // res.end();
        });

    });



}