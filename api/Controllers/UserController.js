'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

var formidable = require('formidable');
var fs = require('fs'); 

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
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var values = fields;
    var oldpath = files.profilepic.path;
    console.log(oldpath);
    filenamechange(files.profilepic.name,function(newname){
    var newpath = './Uploads' + newname;
    console.log(newpath);
    fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
    console.log("file uploaded");
    })
    MongoClient.connect(url, function(err, db){ 
    var dbo = db.db("heroku_zn69xqhf");
    var collectionName="CLC_User";
    autoIncrement.getNextSequence(dbo, collectionName,"UserID", function (err, autoIndex) {
    var query = { 
    UserID:autoIndex,
    Email : values.Email ,
    Password : values.Password,
    UserType: values.UserType,
    UserProfileImage: newpath};
    dbo.collection(collectionName).insertOne(query, function(err, result) {
    if (err) throw err;
    console.log("1 document inserted");
    res.json({status : 'success', message : 'OK', result : input});
    db.close();
    });
    });
    });
    })
    })
    }
    function filenamechange(oldname, callback){
    var arr = oldname.split('.');
    var extension = arr[arr.length-1];
    var newname = 'profilepic_' + Date.now() + '.' + extension;
    callback(newname);
    }

      // Validate User && input.Password==result.Password 
exports.UserValidate=function(req, res){
    var input = req.body;

            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var query = { Email : input.Email , Password : input.Password, UserType:input.UserType };
                dbo.collection('CLC_User').find(query).toArray(function(err,result){
                    console.log(result.Email);
                    if (err) throw err;
                    console.log(result.length);
                    if(result.length == 1){
                        res.json({status : 'success', message : 'OK', result : result});
                    }
                    else{
                        res.json({status : 'error', message : 'Please check the credentials', result : null});
                    }
                })
            })
        }

        // Update User Details
exports.UpdateUserDetails = function(req, res){
  var input = req.body;

  MongoClient.connect(url, function(err, db){ 
        var dbo = db.db("heroku_zn69xqhf");
        var email = { Email : input.Email };
         var newValues = { 
             $set: {Email : input.Email , 
          Password : input.Password,
          UserType: input.UserType,
          UserProfileImage: input.UserProfileImage }
       };
        dbo.collection("CLC_User").updateOne(email, newValues, function(err, res) {
          if (err) throw err;
          console.log(input.Email);
          console.log("User Details Updated Successfully !!");
          db.close();
        });
  });
}

//Get Employee Details
exports.DeleteRecord = function(req, res){
  console.log(req);
  var input = req.body;
  
  MongoClient.connect(url, function(err, db){ 
  var dbo = db.db("EmployeeDetails"); 
  var myQuery = { EmpNo: input.EmpNo};           
      dbo.collection("mycollection").deleteOne(myQuery,function(err, result) {
          if (err) throw err;
          console.log(myQuery)
          console.log("Successfully Deleted");
          res.json({status : 'Successfully Deleted', message : 'OK', result : result});
          db.close();
        });                
  });
}