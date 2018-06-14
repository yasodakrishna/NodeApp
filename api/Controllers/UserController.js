'use strict';

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

// var mongoose = require('mongoose'),
   //UsersData = MongoClient.model('CLC_User');
//   var db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("h");
//   UsersData.find(function (err, _UsersData) {
//     if (err)
//     console.log("error");
//     else {
//       console.log(_UsersData);      
//     }
//   });
// });
// to get all the Buildings information
exports.getUsers = function (req, res) {  
  MongoClient.connect(url, function(err, db){ 
    if (err) throw err;
  var dbo = db.db("heroku_zn69xqhf");
  dbo.collection("CLC_User").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.Email);
    db.close();
  });  
});
  };