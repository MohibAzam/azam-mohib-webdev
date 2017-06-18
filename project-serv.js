var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

//var myApp = require('../../server_side/app.js');

var myApp = require ("./public/project/server-side/app.js");
console.log(myApp);
//myApp.sayHello();
//myApp('this is the message');

myApp(app);

console.log('test');

require("./public/lectures/ejs/hello");

var port = process.env.PORT || 3000;

app.listen(port);