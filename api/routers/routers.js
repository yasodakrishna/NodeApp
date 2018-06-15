'use strict';
module.exports = function (app) {

  var userCtrl = require('../Controllers/UserController');  
  var propertyCtrl = require('../Controllers/PropertyController');  
  var appointmentControllerCtrl = require('../Controllers/AppointmentController'); 
  var TrackingControllerCtrl = require('../Controllers/TrackingController'); 
  
  //user Routes
  app.route('/userCtrl')
    .get(userCtrl.getUsers);

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

   //Get Favorite Property
   app.route('/getfavoriteproperty')
   .post(propertyCtrl.GetFavoriteProperty);

   //Sechdule Appointment
   app.route('/sechduleappointment')
   .post(appointmentControllerCtrl.SechduleAppointment);

   //Accept Appointment
   app.route('/acceptappointment')
   .post(appointmentControllerCtrl.AcceptAppointment);

   //Cancel Appointment
   app.route('/cancelappointment')
   .post(appointmentControllerCtrl.CancelAppointment);   
<<<<<<< HEAD
   
   //Tracking
   //app.route('/tracking')
   //.post(TrackingControllerCtrl.Tracking);
   
     //TrackEndpoints
     app.route('/trackendpoints')
     .get(TrackingControllerCtrl.TrackEndpoints);
=======

  //  //Tracking
  //  app.route('/tracking')
  //  .post(TrackingControllerCtrl.Tracking);
>>>>>>> 1fa6b473cf941837da326a10978b94e2f170d4e5
};
