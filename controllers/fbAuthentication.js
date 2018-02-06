var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var mailer = require('./mailController');
var fbLoggedIn = function(req, res) {
    console.log("Retrieving user account of: " + req.params.fbid);

    function findUser(err, results) {
        console.log('Search complete!');
        if (err) throw err;
        if (results.length != 0) {
            console.log("User found:");
            console.log(results);
            console.log('================================');
            if (results.loginsession != "") {
                res.status(200);
                res.send(true);
            } else {
                res.status(200);
                res.send(false);
            }
        } else {
            console.log('User not found.');
            res.status(404);
            res.send(false);
        }
    }
    if (req.params.fbid != undefined) {
        User.findOne({ fbid: req.params.fbid }, { hash: 0, salt: 0 }, findUser);
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
            console.log('================================');
            res.send(results);
        } else {
            res.status(404);
            res.send('User not found.');
            console.log('User not found.')
        }
    }
    User.findOne({ fbid: req.params.fbid }, { hash: 0, salt: 0 }, findProfile);
}

var registerfb = function(req, res) {


    var user = new User();
    console.log('Registering profile: ' + req.body.email);

    function register(err, results) {
        console.log('Checking for duplicate emails...');
        if (err) throw err;
        console.log('duplicate emails:');
        console.log(results);
        console.log('================================');
        if (results.length == 0) {
            console.log('No duplicates.');
            user._id = new mongoose.Types.ObjectId();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            // user.email = req.body.email;
            user.address = req.body.address;
            user.postalcode = req.body.postalcode;

            user.fbid = req.body.fbid;
            user.loginsession = Date().valueOf();
            user.setPassword(req.body.password);
            user.setActivationCode(req.body.email);
            user.save(function(err) {
                mailer.sendVerification(user.email, user.activation);
                res.status(200);
                res.json({
                    'success': 'Register complete',
                    'userid': user._id
                });
                console.log("REGISTER COMPLETE.")
            });
        } else {
            res.status(400);
            res.json({ "error": "User already exists!" });
            console.log('Registration failed: User already exists.');
        }
    }

    User.find({ $or: [{ email: req.body.email }, { fbid: req.body.fbid }] }, register);


};

var mergeregister = function(req, res) {
    console.log('Merge API.')
    console.log('Validating email and password...')
    passport.authenticate('local', function(err, user, info) {


        // If Passport throws/catches an error
        if (err) {
            console.log('Passport error!!!')
            res.status(404).send('Server validation error.');
            return;
        }

        // If a user is found
        if (user) {
            //MERGE PROCESS

            console.log('Validating FBID:' + req.body.fbid);
            if (user.fbid) {
                console.log('Account already merged!');
                res.status(400);
                res.send('Account already merged!');
            } else {
                User.findByIdAndUpdate(user._id, {
                    fbid: req.body.fbid,
                    loginsession: Date().valueOf()
                }, function(err) {
                    res.status(200);
                    res.send('Merge successful.');
                    console.log('FBID(' + req.body.fbid + ') assigned to [' + user.email + ']');
                });
            }
        } else {
            // If user is not found
            console.log('User not found!!!');
            res.status(401).send('Invalid email/password.');
        }
    })(req, res);

};

var fblogin = function(req, res) {
    console.log('Login using fbid: ' + req.body.fbid);

    User.findOne({ fbid: req.body.fbid }, function(err, result) {

        if (result != undefined) {
            console.log('fbid is registered!');
            if (result.validPassword(req.body.password)) {
                result.loginsession = Date().valueOf();
                result.save((err) => {
                    if (err) throw err;
                    res.status(200).send('Login successful')
                });
            } else {
                res.status(401.1).send('Invalid login credentials.');
            }
            // req.body.email = result.email; //SET email for passport

            // passport.authenticate('local', function(err, user, info) {
            //     console.log('Entering passport..');
            //     // If Passport throws/catches an error
            //     if (err) {
            //         console.log('Passport error!!!')
            //         res.status(404).send('Server validation error.');
            //         return;
            //     }

            //     // If a user is found
            //     if (user) {
            //         //UPDATE THE LOGIN SESSION
            //         console.log('Now logging in: ' + user.email);
            //         console.log(user);
            //         console.log('================================');
            //         User.findByIdAndUpdate(user._id, {
            //             loginsession: Date().valueOf()
            //         }, function(err) {
            //             res.status(200);
            //             console.log('Login successful.')
            //             res.send('Login successful.');
            //         });

            //     } else {
            //         // If user is not found
            //         console.log('Login failed: Invalid fbid/password');
            //         res.status(401).send('Invalid password.');
            //     }
            // })(req, res);


        } else {
            console.log('User not registered.');
            res.status(401).send('Invalid password.');
        }
    });


}

var fblogout = function(req, res) {
    console.log('USER: ' + req.params.fbid + ' Logging out...');
    User.findOne({ fbid: req.params.fbid }, (err, result) => {
        if (err) throw err;
        if (result) {
            console.log('USER: ' + req.params.fbid + ' exists.');
            result.loginsession = "";
            result.save((err) => {
                if (err) throw err;
                console.log('USER: ' + req.params.fbid + ' Logged out.');
                res.status(200).send('Logout successful');
            });
        } else {
            res.status(404).send('USER: ' + req.params.fbid + ' Does not exist.');
        }
    });
}
module.exports.fblogin = fblogin;
module.exports.isLoggedIn = fbLoggedIn;
module.exports.profileRead = getProfile;
module.exports.registerfb = registerfb;
module.exports.mergeregister = mergeregister;
module.exports.fblogout = fblogout;