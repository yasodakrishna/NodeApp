'use strict';
module.exports = function (app) {

  var userCtrl = require('../Controllers/UserController');  
  var propertyCtrl = require('../Controllers/PropertyController');  
  var appointmentControllerCtrl = require('../Controllers/AppointmentController'); 
  var TrackingControllerCtrl = require('../Controllers/TrackingController'); 
  var Resetpassword = require('../Controllers/ResetpasswordController'); 
  var setpassword = require('../Controllers/SetpasswordController'); 
  
  //user Routes
  app.route('/getusers')
    .post(userCtrl.getUsers);

 //user signup Routes
   app.route('/signup')
  .post(userCtrl.signUp);

   //user validate Routes
   app.route('/login')
  .post(userCtrl.UserValidate);

   //update user Routes
   app.route('/updateuser')
  .post(userCtrl.UpdateUserDetails);

  //Add PropertyList
  app.route('/addproperty')
  .post(propertyCtrl.CreateProperty);

  //Update PropertyList
  app.route('/updateproperty')
  .post(propertyCtrl.UpdateProperty);

  //Get Booking Property
  app.route('/getbookingproperty')
  .post(propertyCtrl.GetBookingProperty);

   //Get Property
   app.route('/getproperty')
   .post(propertyCtrl.GetProperty);

   //Get Selling Property
   app.route('/getsellingproperty')
   .post(propertyCtrl.GetSellingProperty);

   //Make Favorite Property
   app.route('/makefavoriteproperty')
   .post(propertyCtrl.MakeFavoriteProperty);   

      //Make UnFavorite Property
      app.route('/makeunfavoriteproperty')
      .post(propertyCtrl.MakeUnFavoriteProperty); 

   //Get Favorite Property
   app.route('/getfavoriteproperty')
   .post(propertyCtrl.GetFavoriteProperty);

   //Sechdule Appointment
   app.route('/sechduleappointment')
   .post(appointmentControllerCtrl.SechduleAppointment);

   //Accept Appointment
   app.route('/acceptappointment')
   .post(appointmentControllerCtrl.AcceptAppointment);

     app.route('/getallbookingproperty')
     .post(propertyCtrl.GetAllBookingProperty);    

     app.route('/getgeneralProperty')
     .post(propertyCtrl.GetgeneralProperty);  


         //forgot password Routes
    app.route('/forgotpasswordResponse')
    .post(userCtrl.forgotpasswordResponse);  


    //Resetpassword Routes

    app.route('/reset/:token')
    .get(Resetpassword.resetpasswordResponse);  

    //set password

    app.route('/reset/:token')
    .post(setpassword.setpasswordResponsemail);    
    
  //update user Routes

  //  app.route('/Uploads')
  //  .post(userCtrl.Uploads);
};



