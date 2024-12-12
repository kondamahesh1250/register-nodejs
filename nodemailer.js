var nodemailer = require("nodemailer");
var otp = require("./otp.js");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'konda.mahesh1280@gmail.com',
        pass: 'qlro dtmq bhcx mjhq'
    }
});

var mailOptions = {
    from: 'konda.mahesh1280@gmail.com',
    to: 'konda.mahesh1250@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `Your one time password is ${otp()}`
};

module.exports={transporter,mailOptions};