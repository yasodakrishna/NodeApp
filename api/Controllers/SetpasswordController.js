'use strict';

var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";
var async = require('async');
var crypto = require('crypto');
var nodemailer = require("nodemailer");


exports.setpasswordResponsemail = function(req, res) {
    async.waterfall([
        function(done) {
            MongoClient.connect(url, function(err, db){
                var dbo = db.db("heroku_zn69xqhf"); 
                dbo.collection('CLC_User').findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        res.json({message: 'Password reset token is invalid or has expired.'});
                    }
                    //console.log(user);
                    var myquery = { resetPasswordToken: req.params.token };
                    var newvalues = { $set: {Password: req.body.Password,resetPasswordToken: undefined, resetPasswordExpires: undefined, modifiedDate : Date(Date.now()) }};
                    dbo.collection("CLC_User").updateOne(myquery, newvalues, function(err, result) {
                        if (err) throw err;
                        //console.log("result ======" + result);
                        console.log("1 document updated");
                    });
                    done(err, user);
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: 'property@123',
                    pass: 'sagarsoft123'
                }
            });
            var mailOptions = {
                to: user.Email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.Email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                res.json({status : 'success', message : 'Success! Your password has been changed.'});
                done(err);
            });
        }
    ], function(err) {
        if (err) return err;
    });
}