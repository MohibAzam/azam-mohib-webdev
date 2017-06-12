var express = require('express');
var app = express();
//var cookieParser = require('cookie-parser');
//var session = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var myApp = require('./server_side/app');

myApp = require ("./public/assignment/Assignment5/server-side/app.js");
console.log(myApp);
//myApp.sayHello();
//myApp('this is the message');

myApp(app);

var port = process.env.PORT || 3000;

app.listen(port);