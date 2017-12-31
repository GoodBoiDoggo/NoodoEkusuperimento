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

    app.post('/api/updateDDA', function(req, res) {
        User.findByIdAndUpdate(req.body._id, {
            address: req.body.address,
            postalcode: req.body.postalcode
        }, function(err, data) {
            if (err) throw err;
            res.status(200);
            console.log('DDA  Updated!')

            if (data.address) {
                res.send('New DDA has been set.');
            } else {
                res.send('DDA has been removed.');
            }

        });
    });



}