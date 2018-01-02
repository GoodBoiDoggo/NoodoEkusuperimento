var nodemailer = require('nodemailer');

var verification = function(email, activation) {
    console.log(email);
    console.log(activation);
    var transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'marponsie@yahoo.com',
            pass: 'Password8732'
        }
    });
    var mailOptions = {
        from: 'marponsie@yahoo.com',
        to: email,
        subject: 'Account Verification',
        html: '<h1>Activate your accont</h1><p>Click on the link below to activate your kariteun account.</p><br><a href="http://kariteun-shopping.mybluemix.net/api/activate/' + activation + '">Activate account</a><br><p>Thank you!</p>'
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            console.log('CLOSE CONNECTION.');
            transporter.close();
        }

    });



}
module.exports.sendVerification = verification;