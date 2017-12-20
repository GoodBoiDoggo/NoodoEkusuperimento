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
            if (results.loginsession) {
                console.log(results);
                res.status(200);
                //CHECK IF FBID EXISTS THEN CHECK IF SESSION IS NOT UNDEFINED
                res.json({
                    "name": results.name,
                    "fbid": results.fbid,
                    "email": results.email
                        //and the rest
                });
            }
        }
    }
    if (req.params.fbid != undefined) {
        User.find({ fbid: req.params.fbid }, findUser);
    } else {
        console.log('no fbid');
    }
}

var getProfile = function(req, res) {
    console.log('Fetching profile...');

    function findProfile(err, results) {
        if (err) throw err;
        if (results._id) {
            res.status(200);
            res.send(results);
        }
    }
    User.find({ fbid: req.params.fbid }, findProfile);
}


module.exports.isLoggedIn = fbLoggedIn;
module.exports.profileRead = getProfile;