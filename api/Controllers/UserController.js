'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";
var formidable = require('formidable');
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require("nodemailer");
var path = require('path');

//sample



exports.getUsers = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){
        console.log(input); 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {UserID: parseInt(input.UserID)};
           console.log(newValues);
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

  // User Registration  /api/ProfilePic/
  exports.signUp = function(req, res){
      console.log("welcome");
    
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if(err) throw err;
            var input = fields;
           console.log(input);
           var oldpath = files.UserProfileImage.path;
           console.log(oldpath);
           filenamechange(files.UserProfileImage.name,function(newname){
               console.log(newname);
               var newpath ='./ProfilePic/' + newname;
               console.log(newpath);
               fs.rename(oldpath, newpath, function (err) {
                   console.log(newpath);
                   if (err) throw err;
                   console.log("file uploaded");
               }) 
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var collectionName="CLC_User";
                autoIncrement.getNextSequence(dbo, collectionName,"UserID", function (err, autoIndex) {
                var query = { 
                    UserID:autoIndex,
                    Email : input.Email ,
                    Password : input.Password,
                    UserType: input.UserType,
                    resetPasswordToken:input.resetPasswordToken,
                    resetPasswordExpires:input.resetPasswordExpires,
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
    var newname = 'ProfilePic_' + Date.now() + '.' + extension;
    callback(newname);
}

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
    console.log(Object.keys(input));
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
//==================Email sending=============================

exports.forgotpasswordResponse = function(req, res, next) {

    var input=req.body;
    //console.log(input);
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                console.log(input.Email);
                var query = { Email : req.body.Email };
                dbo.collection('CLC_User').find(query).toArray(function(err,result){
                    if(result.length == 0){
                        req.flash('error', 'No account with that email address exists.');
                    }
                    var myquery = { Email: result[0].Email };
                    var newvalues = { $set: {resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }};
                    dbo.collection("CLC_User").updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        console.log("1 document updated");
                    });
                    

                   // console.log(result[0].Email);
                    done(err, token, result);
                });
            });
        },
        function(token, result, done,Username,password) {
            var emailVal = result[0].Email;
            console.log(emailVal);
            var Username="";
            var password="";
            MongoClient.connect(url, function(err, db){ 
            var dbo = db.db("heroku_zn69xqhf");
            dbo.collection('Accountsettings').find().toArray(function(err,result){
                if (err) throw err;
                Username=result[0].UserName;
                password=result[0].Password;
               // console.log(Username);
               // console.log(password);
                   // res.json({status : 'success', message : 'Records found', result : result});
            

            // console.log(Username);
            var smtpTransport = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                  user: Username,
                  pass: password
                }
              });

            const mailOptions = {
                to: emailVal,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {               
                console.log("HI:"+emailVal);
                res.json({status : 'success', message : 'An e-mail has been sent to ' + emailVal + ' with further instructions.'});            
                done(err, 'done');
            });
        })
        });
        }
        
    ], function(err) {
        if (err) return next(err);
        
    });
}


