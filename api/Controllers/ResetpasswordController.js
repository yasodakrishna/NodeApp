'use strict';

var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";
var app = express();
var flash = require('express-flash');
app.use(flash());
var fs = require('fs');

exports.resetpasswordResponse = function(req, res) {
    console.log("welcome");
    MongoClient.connect(url, function(err, db){
        var dbo = db.db("heroku_zn69xqhf");
        dbo.collection('CLC_User').findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                res.json({message: 'Password reset token is invalid or has expired.'});
            }else{
                console.log("coming");
                fs.readFile("api/Controllers/resetpassword.html", function (error, data) {
                    console.log("its working");
                    if (error) {
                        console.log(error);
                        res.writeHead(404);
                        res.write('Contents you are looking are Not Found');
                    } else {
                        //res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                    }
                    res.end();
                });
            }
        });
    });
}