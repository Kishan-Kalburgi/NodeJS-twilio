var express = require('express');
var router = express.Router();
var User = require('../models/user.model')
var nodemailer = require('nodemailer');
var randomstring = require('randomstring');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* signup */
router.post('/signup', function (req, res, next) {
  var user = new User(req.body);
  User.findOne({ email: req.body.email }, function (err, data) {
    if (data == null) {
      user.save(function (err) {
        if (err) {
          res.status(403).json({ message: err });
        } else {
          res.status(200).json({ message: "User saved successfully" });
        }
      });
    } else {
      res.status(401).json({ message: "User with this email exists already" });
    }
  })
});

/* signin */
router.post('/signin', function (req, res, next) {
  User.findOne({ email: req.body.email, pwd: req.body.pwd }, function (err, data) {
    if (data == null) {
      res.status(403).json({ message: "User with email doesn't exists. Create one", data: err });
    } else {
      var code = randomstring.generate(8);
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gdp2.fastrack@gmail.com',
          pass: 'gdp21234'
        }
      });

      var mailOptions = {
        from: 'donotreply@ubreakifix.com',
        to: req.body.email,
        subject: 'Coupon code for code registration',
        html: '<p>Hello,</p><p>Here is the coupon code that you need enter:</p>' + code + '<p>Thanks&Regards</p><p>conference team</p> ',
      };
      console.log(req.body.email);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.res);
          res.status(200).json({ msg: "one time code generated successfully", data: code });
        }
      });
    }
  })
});

module.exports = router;