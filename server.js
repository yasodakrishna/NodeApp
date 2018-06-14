var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
  
//User = require('./api/Models/UserModel'),

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set up a URL route
app.get("/", function (req, res) {
    res.send("Heroku Demo!");    
});

var routes = require('./api/routers/routers');
routes(app);

app.listen(port);

console.log('Test RESTful API server started on: ' + port); //comment