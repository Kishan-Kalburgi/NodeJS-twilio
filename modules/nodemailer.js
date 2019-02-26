var nodemailer = require('nodemailer');
var randomstring = require('randomstring');

var code = randomstring.generate(8);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gdp2.fastrack@gmail.com',
      pass: 'gdp21234'
    }
  });

  var mailOptions = {
    from: 'uBreakiFix@breakfix.com',
    to: 'kkalburgi87@gmail.com',
    subject: 'Coupon code for code registration',
    html: '<p>Hello,</p><p>Here is the code that you need enter:</p>' + code + '<p>Thanks&Regards</p><p>Team BreakFix</p> ',
  };
  console.log("testing");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      response.redirect('/faculty');
    }
  });