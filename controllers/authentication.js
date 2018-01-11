var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var mailer = require('./mailController');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    console.log('Registering account: ' + req.body.email);
    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    User.find({ email: req.body.email }, function(err, results) {

        if (err) throw err;
        console.log('Email duplicates:');
        console.log(results);
        console.log('================================');
        if (results.length == 0) {
            console.log('No duplicates detected.');
            user._id = new mongoose.Types.ObjectId();
            user.email = req.body.email;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.address = req.body.address;
            user.postalcode = req.body.postalcode;
            user.setRateDetails();
            user.setActivationCode(req.body.email);
            user.setPassword(req.body.password);
            console.log(user);
            user.save(function(err) {
                var token;
                mailer.sendVerification(user.email, user.activation);

                token = user.generateJwt();
                console.log('REGISTER COMPLETE.');
                res.status(200);
                res.json({
                    "token": token,
                    "userid": user._id,
                    'status': 'success'
                });

            });
        } else {
            res.status(400);
            res.json({
                "msg": "User already exists!",
                "status": 'error'
            });
            console.log('Register failed: User already exists.');
        }
    })


};

module.exports.login = function(req, res) {
    console.log('Logging in: ' + req.body.email);
    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            console.log('Passport error!!!');
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            console.log('LOGIN COMPLETE.');
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            console.log('Login failed: Invalid email/password.');
            res.status(401).send('Invalid email/password.');
        }
    })(req, res);

};