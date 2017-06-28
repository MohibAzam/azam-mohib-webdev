var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "session by WAM" }));

app.use(passport.initialize());

//Tells passport to use the last made session object
app.use(passport.session());

app.get('/api/session', function (req, res){
    //This will show us the current session status
    //and simply return it. This session can show us
    //how long the session has been active and how long
    //till it expires (can be configured)
    console.log(req.session);
    res.send(req.session);
});

//This method will allow us to store a value into the session
//This way, the value will remain there every further time
//we try to retrieve the session with the previous method,
//thus allowing us to distinguish users from each other

//For example: You can submit username as the name
//and the username of the currently logged in user
//in the value
//Ideally, you should only store user identification info here,
//as it will use up the RAM of the application.
app.get('/api/session/:name/:value', function (req, res) {
    var name = req.params.name;
    var value = req.params.value;

    var obj = {
        name: value
    };

    req.session[name] = obj;

    console.log(req.session);
    res.send(req.session);
});

//Cookies and Sessions are used to identify users
//Passport is meant to authenticate users
//They are broken up into different strategies
//i.e. "local", "facebook", "google", each of which
//authenticates the user in different ways

//Provides a thin layer of callbacks to tell what point
//the user is in the process of logging in/out, for security


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var myApp = require('./server_side/app');

myApp = require ("./public/assignment/Assignment6/server-side/app.js");
console.log(myApp);
//myApp.sayHello();
//myApp('this is the message');

myApp(app);

require("./public/lectures/ejs/hello");

//require("./public/lectures/week7/ejs/crud");

var port = process.env.PORT || 3000;

app.listen(port);