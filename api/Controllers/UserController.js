'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

// to get all the Buildings information
// exports.getUsers = function (req, res) {  
//     var input = req.body;
//   MongoClient.connect(url, function(err, db){ 

//     if (err) throw err;
//   var dbo = db.db("heroku_zn69xqhf");
//   var newValues = {UserID: input.UserID};
//   dbo.collection("CLC_User").find(newValues).toArray(function(err, result) {
//     if (err) throw err;
//     //console.log(result.Email);
//     res.json({status : 'success', message : 'OK', result : result});    
//     db.close();
//   });  
// });
//   };


exports.getUsers = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {UserID: parseInt(input.UserID)};
          dbo.collection('CLC_User').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result!=null){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}

  // User Registration
  exports.signUp = function(req, res){
    var input = req.body; 
    console.log('input is:'); 
    console.log(input);
    signupValidation(input, function(errMessage){
      console.log(errMessage);
      if(errMessage != ""){
          console.log(errMessage);
          res.send(JSON.stringify({status:'error', message:errMessage, result:null}));
    }else{
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
          })
        }

      // Validate User && input.Password==result.Password 
      exports.UserValidate=function(req, res){
        var input = req.body;
        signupValidation(input, function(errMessage){
            if(errMessage != ""){
                console.log(errMessage);
                res.send(JSON.stringify({status:'error', message:errMessage, result:null}));
            }else{
        
                MongoClient.connect(url, function(err, db){ 
                    var dbo = db.db("heroku_zn69xqhf");
                    var query = { 
                        Email : input.Email , 
                        Password : input.Password,
                         UserType:input.UserType 
                        };
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
            })
            }

// Update User Details
        exports.UpdateUserDetails = function(req, res){
            var input = req.body;
            signupValidation(input, function(errMessage){
              if(errMessage != ""){
                  console.log(errMessage);
                  res.send(JSON.stringify({status:'error', message:errMessage, result:null}));
              }else{
          
            MongoClient.connect(url, function(err, db){ 
                  var dbo = db.db("heroku_zn69xqhf");
                  var userid = { UserID : parseInt(input.UserID) };
                   var newValues = { 
                       $set: {
                      Email : input.Email , 
                    Password : input.Password,
                    UserProfileImage: input.UserProfileImage }
                 };
                  dbo.collection("CLC_User").updateOne(userid, newValues, function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    // res.json({status : 'success', message : 'OK', result : result});
                    console.log("User Details Updated Successfully !!");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                          });
                      });
                  }
              })
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


function signupValidation(input, callback){
    var errorMessage = "";
    //console.log(Object.keys(input));
    if (Object.keys(input).length == 0){
        errorMessage = "Parameters missing";
    }else{
       if(input.Email == '' || input.Email == null){
             errorMessage = 'Missing Email';
        }else if(input.Password == '' || input.Password == null){
             errorMessage = 'Missing Password';
         }
         //else if(input.UserType == '' || input.UserType == null){
        //      errorMessage = 'Missing UserType';
        // }
        // }else if(input.UserProfileImage == '' || input.UserProfileImage == null){
        //      errorMessage = 'Missing UserProfileImage';
        // }
    }
    callback(errorMessage);
}