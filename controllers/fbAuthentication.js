var mongoose = require('mongoose');
var User = mongoose.model('User');


var fbLoggedIn = function(req, res) {
    console.log("fb auth running")
    console.log(req.params.fbid);

    function findUser(err, results) {
        console.log('fbid being confirmed...');
        if (err) throw err;
        if (results.length != 0) {
            console.log("Fbid detected");
            console.log(results);

            // if (results.loginsession) {
            //     console.log('logged in');
            res.status(200);
            //CHECK IF FBID EXISTS THEN CHECK IF SESSION IS NOT UNDEFINED
            res.send(results);
            // }
        } else {
            console.log('User not found.');
            res.status(404);
            res.send(false);
        }
    }
    if (req.params.fbid != undefined) {
        User.find({ fbid: req.params.fbid }, findUser);
    } else {
        console.log('no fbid');
    }
}

var getProfile = function(req, res) {


    function findProfile(err, results) {
        console.log('Fetching profile...' + req.params.fbid);
        if (err) throw err;
        if (results.length != 0) {
            res.status(200);
            console.log(results);
            res.send(results);
        } else {
            res.status(404);
            res.send('User not found.');
            console.log('User not found.')
        }
    }
    User.find({ fbid: req.params.fbid }, findProfile);
}

var registerfb = function(req, res) {


    var user = new User();
    console.log(req.body.email);

    function register(err, results) {
        if (err) throw err;
        console.log('results:');
        console.log(results);
        if (results.length == 0) {
            console.log('registered');
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.address = req.body.address;
            user.postalcode = req.body.postalcode;

            user.fbid = req.body.fbid;
            user.loginsession = Date().valueOf();

            user.setPassword(req.body.password);

            user.save(function(err) {
                res.status(200);
                res.json({ 'success': 'Register complete' });
                console.log("REGISTER COMPLETE")
            });
        } else {
            res.status(400);
            res.json({ "error": "User already exists!" });
        }
    }

    User.find({ $or: [{ email: req.body.email }, { fbid: req.body.fbid }] }, register);


};

module.exports.isLoggedIn = fbLoggedIn;
module.exports.profileRead = getProfile;
module.exports.registerfb = registerfb;