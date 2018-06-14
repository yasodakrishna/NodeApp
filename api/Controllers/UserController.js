'use strict';

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

// to get all the Buildings information
exports.getUsers = function (req, res) {  
  MongoClient.connect(url, function(err, db){ 
    if (err) throw err;
  var dbo = db.db("heroku_zn69xqhf");
  dbo.collection("CLC_User").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.Email);
    res.json({status : 'success', message : 'OK', result : result});    
    db.close();
  });  
});
  };

  // User Registration
exports.signUp = function(req, res){
  var input = req.body; 
  console.log('input is:'); 
  console.log(input);
          MongoClient.connect(url, function(err, db){ 
              var dbo = db.db("heroku_zn69xqhf");
              var collectionName="CLC_User";
              autoIncrement.getNextSequence(dbo, collectionName,"UserID", function (err, autoIndex) {
              var query = { 
                  UserID:autoIndex,
                  Email : input.Email ,
                  Password : input.Password,
                  UserType: input.UserType,
                  UserProfileImage: input.UserProfileImage};
              dbo.collection(collectionName).insertOne(query, function(err, result) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  res.json({status : 'success', message : 'OK', result : input});
                  db.close();
                });
              });
          });
      }