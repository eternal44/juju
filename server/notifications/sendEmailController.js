require('dotenv').config();
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PWD
    }
});

module.exports = {
  sendEmailMessage: function(req, res) {
    req=req.body || req;
    var itemNickname = req.nickname || 'oops';
    var currentPrice = req.currentprice || 'oops';
    var itemUrl = req.itemurl || 'oops';
    var userEmail = req.email;
    var message = 'Hello from Saja!\nThis is a notification that the item you were watching (' + itemNickname + ') is currently ' + currentPrice + ' which is equal to or less than the price you were interested in paying. \nYou can find the item at \n' + itemUrl + '\n Enjoy!'; // The body of the text message

    var mailOptions = {
      from: "Saja Notifications <saja.notification@gmail.com>", // sender address
      to: userEmail, // list of receivers
      subject: "Your item is at your ideal price!", // Subject line
      html: message // html body
    };
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log('email err', error);
      } else {
        console.log("EmailMessage sent: " + response.message);
      }
    });
  }
};
