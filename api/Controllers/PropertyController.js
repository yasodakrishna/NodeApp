'use strict';

var autoIncrement = require("mongodb-autoincrement");

var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";

    //create PropertyList
exports.CreateProperty = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var collectionName="CLC_Property";
                autoIncrement.getNextSequence(dbo, collectionName,"PropertyId", function (err, autoIndex) {
                var query = { 
                    PropertyId : autoIndex,
                    UserID:input.UserID,
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Address : input.Address,
                    Longitude :input.Longitude,
                    Latitude :input.Latitude,
                    Zip: input.Zip,
                    Photos:input.Photos,
                    Price:input.Price,
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:input.Bathrooms,
                    Facing:input.Facing,
                    IsFavorite: input.IsFavorite,
                    Parking:input.Parking,
                    BuildUp_Area:input.BuildUp_Area,
                    Floor_Type:input.Floor_Type,
                    Balconies:input.Balconies,
                    Property_Description:input.PropertyDescription,
                    Address:input.Address};
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                });
                });
        }

        //Update PropertyList
exports.UpdateProperty = function(req, res){
    console.log('went into update')
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var Propertyidval={ UserID: input.UserID,PropertyId:parseInt(input.PropertyId) };
                console.log('userid is ' );
                console.log(Propertyidval);
                var query = { $set: { 
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Address : input.Address,
                    Longitude :input.Longitude,
                    Latitude :input.Latitude,
                    Zip: input.Zip,
                    Photos:input.Photos,
                    Price:input.Price,
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:input.Bathrooms,
                    Facing:input.Facing,
                    Parking:input.Parking,
                    BuildUp_Area:input.BuildUp_Area,
                    Floor_Type:input.Floor_Type,
                    Balconies:input.Balconies,
                    Property_Description:input.PropertyDescription,
                    Address:input.Address}};
                dbo.collection("CLC_Property").updateOne(Propertyidval,query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document Updated");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                    });
                });
            }



//GetBookingPropertyList
        // exports.GetBookingProperty = function(req, res){
        //     var input = req.body;
        //     MongoClient.connect(url, function(err, db){ 
        //           var dbo = db.db("heroku_zn69xqhf");
        //            var newValues = {UserID : input.UserID};
        //            console.log(newValues);
        //           dbo.collection("CLC_Appointments").find(newValues).toArray(function(err, result) {
        //             if (err) throw err;
        //             //console.log(result.);
        //             console.log(result.length);
        //             if(result !=null){
        //                 console.log("Got one record Successfully !!");
        //             res.json({status : 'success', message : 'Records found', result : result});
        //             } else{
        //                 res.json({status : 'error', message : 'No records found', result : null});
        //             }
        //             db.close();
        //           });
        //     });
        // }






        exports.GetBookingProperty = function(req, res){
   
            MongoClient.connect(url, function(err, db){ 
                if (err) throw err;
                  var dbo = db.db("heroku_zn69xqhf");
                  var input = req.body;
                  var userid=input.UserID;
                  var newValues = {UserID:input.UserID}
                  console.log(input);
                  dbo.collection('CLC_Appointments').aggregate([
                      {
                          $lookup: 
                          {
                              from: 'CLC_Property',
                              localField:'PropertyId',
                              foreignField:'PropertyId',
                              as:'BookingPropertyList'
                            }
                        },{ $match : { UserID:userid} }
                        ]).toArray(function(err,result){
                            if (err) throw err;
                            console.log(result)
                            console.log(JSON.stringify(result))
                            res.json({status : 'success', message : 'Records found', result : result});
                            db.close();
                        })
            });
        }



//Get PropertyList
exports.GetProperty = function(req, res){

    // var solution1;
    // var solution2;
    
    var input = req.body;
    var newValues;
    var newname;
    console.log("Join list:")
    console.log(newname)
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
          //var email = { Email : input.Email };
          //Junaid sample
        //   var userid=input.UserID;
        //   if(input.UserID!=null){
        //  console.log("Welcome");
        //  joinpoperty(userid,function(newname,err,result){
        //     // var finalresult=newname;
        //     //console.log(result.length);
        //      console.log(newname);
        //      solution1=newname
        //     // console.log(newname.length);
        //      //res.json({status:'success',message:'Join List',newname:newname})

        //  })
        //   }

          //Junaid Sample 
          if(parseInt(input.Location)) {
            
             newValues = { 
                 Zip : input.Location , 
                 Property_Type : input.Property_Type,
                // BHKType: input.BHKType,    ,{BHKType:newValues.BHKType}   {$and: [{Zip:newValues.Location},{Property_Type:newValues.Property_Type}]}
             };
             console.log(newValues.Zip);
             console.log("Loop first")
             var sort = { PropertyId: -1 };
                dbo.collection('CLC_Property').find(newValues).sort(sort).toArray(function(err,result){
                    if (err) throw err;
                    console.log(result.length);
                    if(result.length>0){
                        //solution2=result;
                        res.json({status : 'success', message : 'Property Records found', result : result});
                    }
                    else{
                        res.json({status : 'error', message : 'No records found', result : null});
                        //db.close();
                    }
                })
           }
           else {
             newValues = { 
                Location : input.Location , 
                 Property_Type : input.Property_Type,
                // BHKType: input.BHKType,   ,{BHKType:newValues.BHKType}  new RegExp(loc ,'i')
 
             };
             var loc= newValues.Location;
             
             var sort = { PropertyId: -1 }; 
      if((newValues.Location!=null &&newValues.Property_Type==null)||(newValues.Property_Type!=null&&newValues.Location==null ))
            {
                console.log(newValues.Property_Type)
                console.log("Location condition")
              dbo.collection('CLC_Property').find({$or: [{Location:newValues.Location},
              {Property_Type:newValues.Property_Type}]}).sort(sort).toArray(function(err,result){
                    if (err) throw err;
                    console.log(err);
                    console.log(result.length);
                    if(result!=null){
                        res.json({status : 'success', message : 'Property Records found', result : result});
                        //solution2=result
                       // db.close();
                    }
                    else{
                        res.json({status : 'error', message : 'No records found', result : null});
                        
                    }
                })
            }
            else{
                console.log(newValues.Property_Type)
                console.log("Location and property type condition")
              dbo.collection('CLC_Property').find({$and: [{Location: new RegExp(loc ,'i')},
              {Property_Type:newValues.Property_Type}]}).sort(sort).toArray(function(err,result){
                    if (err) throw err;
                    console.log(err);
                    console.log(result.length);
                    if(result!=null){
                        res.json({status : 'success', message : 'Property Records found', result : result});
                        //solution2=result
                       // db.close();
                    }
                    else{
                        res.json({status : 'error', message : 'No records found', result : null});
                        
                    }
                })
            }
           }
        //    var fullsolution=[];
        //    fullsolution["solution1"]=solution1;
        //   // fullsolution["solution2"]=solution2;
        //    res.json({status:'success',message:'Record found',result:fullsolution});
    });
}


//Junaid joinproperty
// function joinpoperty(userid,callback){
//     var newname;
//     MongoClient.connect(url, function(err, db){ 
//     //console.log(userid);
//     var dbo = db.db("heroku_zn69xqhf");
//     dbo.collection('CLC_Property').aggregate([
//         {
//         $lookup: 
//         {
//         from: "CLC_Isfavorite",
//     localField:"PropertyId",
//     foreignField:"PropertyId",
//     as:"propertyfavaraties"
// }
// },{ $match : { UserID : userid } }
//     ]).toArray(function(err,result){
//               if (err) throw err;
//               //console.log("Join working")
//               console.log(result)
//                newname =result;
//               //console.log(result)
//              // res.json({status : 'success', message : 'Favorite Records found', result : result});
//               //db.close();
//           })
//           callback(newname)
//         })
        
// }



//GetSelling PropertyList
exports.GetSellingProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {UserID: input.UserID};
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
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

exports.GetAllBookingProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {AppointmentStatus : input.AppointmentStatus};
           console.log(newValues);
          dbo.collection("CLC_Appointments").find(newValues).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            if(result !=null ){
                console.log("Got one record Successfully !!");
            res.json({status : 'success', message : 'Records found', result : result});
            } else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
            db.close();
          });
    });
}


exports.MakeFavoriteProperty = function(req, res){
    var input = req.body; 
    console.log('input is:'); 
    console.log(typeof(PropertyId));
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("heroku_zn69xqhf");
                var collectionName="CLC_Isfavorite";
                autoIncrement.getNextSequence(dbo, collectionName,"IsfavoriteId", function (err, autoIndex) {
                var query = { 
                    IsfavoriteId:autoIndex,
                    PropertyId :parseInt( input.PropertyId) ,
                    IsFavorite : input.IsFavorite,
                    UserID: input.UserID};
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                });
              });
        }
//Make unFaveroite property

exports.MakeUnFavoriteProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
          var userid = { UserID :input.UserID,PropertyId :parseInt(input.PropertyId) };
           var newValues = { 
               $set: {
                IsFavorite :input.IsFavorite
                }
         };
          dbo.collection("CLC_Isfavorite").updateOne(userid, newValues, function(err, result) {
            if (err) throw err;
            console.log(result);
            // res.json({status : 'success', message : 'OK', result : result});
            console.log("User Details Updated Successfully !!");
            res.json({status : 'success', message : 'OK', result : input});
            db.close();
                  });
              });
          //}
      //})
  }



//View Property
exports.GetgeneralProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("heroku_zn69xqhf");
           var newValues = {PropertyId:parseInt(input.PropertyId)};
          dbo.collection('CLC_Property').find(newValues).toArray(function(err,result){
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

exports.GetFavoriteProperty = function(req, res){
   
    MongoClient.connect(url, function(err, db){ 
        if (err) throw err;
          var dbo = db.db("heroku_zn69xqhf");
          var input = req.body;
          var userid=input.UserID;
          var newValues = {UserID:input.UserID}
          console.log(input);
          dbo.collection('CLC_Isfavorite').aggregate([
              {
                  $lookup: 
                  {
                      from: 'CLC_Property',
                      localField:'PropertyId',
                      foreignField:'PropertyId',
                      as:'propertyfavorites'
                    }
                },{ $match : { UserID:userid} }
                ]).toArray(function(err,result){
                    if (err) throw err;
                    console.log(result)
                    console.log(JSON.stringify(result))
                    res.json({status : 'success', message : 'Records found', result : result});
                    db.close();
                })
    });
}