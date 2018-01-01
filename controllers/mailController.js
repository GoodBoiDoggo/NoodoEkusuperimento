var nodemailer = require('nodemailer');

var verification = function(email, activation) {
    console.log(email);
    console.log(activation);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'muggywarra8732@gmail.com',
            pass: 'Password8732'
        }
    });
    var mailOptions = {
        from: 'muggywarra8732@gmail.com',
        to: email,
        subject: 'Account Verification',
        html: '<h1>Activate your accont</h1><p>Click on the link below to activate your kariteun account.</p><br><a href="http://kariteun-shopping.mybluemix.net/api/activate/' + activation + '">Activate account</a><br><p>Thank you!</p>'
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports.sendVerification = verification;