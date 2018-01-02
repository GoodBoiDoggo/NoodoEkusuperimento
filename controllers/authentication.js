var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var mailer = require('./mailController')
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();
    console.log(req.body.email);
    User.find({ email: req.body.email }, function(err, results) {
        if (err) throw err;
        console.log('results:');
        console.log(results);
        if (results.length == 0) {
            user.email = req.body.email;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.address = req.body.address;
            user.postalcode = req.body.postalcode;
            user.setActivationCode(req.body.email);
            user.setPassword(req.body.password);
            console.log(user);
            user.save(function(err) {
                var token;
                mailer.sendVerification(user.email, user.activation);
                token = user.generateJwt();
                console.log('registered');
                res.status(200);
                res.json({
                    "token": token
                });

            });
        } else {
            res.status(400);
            res.json({ "errorMsg": "User already exists!" });
        }
    })


};

module.exports.login = function(req, res) {

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
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};