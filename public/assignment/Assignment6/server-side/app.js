var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
if(process.env.MLAB_USERNAME) { // check if running remotely
    var username = process.env.MLAB_USERNAME; // get from environment
    var password = process.env.MLAB_PASSWORD;
    var connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137101.mlab.com:37101/heroku_2gx4wpp3'; // user yours
    mongoose.connect(connectionString);
}
else {
    mongoose.connect('mongodb://localhost/test/webdev_summer1_2017');
}

module.exports = function(app) {

    var userServApp = require ('./service/user.service.server');
    var websiteServApp = require ('./service/website.service.server');
    var pageApp = require ('./service/page.service.server');
    var widgetApp = require ('./service/widget.service.server');
    userServApp(app);
    websiteServApp(app);
    pageApp(app);
    widgetApp(app);

    var passport = require('passport');
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/websites', sendWebsites);
    app.get('/goodbye', sayHello);

    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if(process.env.MLAB_USERNAME) { // check if running remotely
        var username = process.env.MLAB_USERNAME; // get from environment
        var password = process.env.MLAB_PASSWORD;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds137101.mlab.com:37101/heroku_2gx4wpp3'; // user yours
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function sendWebsites(reg, res) {
        var websites = [
            {name: 'facebook'},
            {name: 'twitter'},
            {name: 'linkedin'}
        ];
        res.send(websites);
    }

    function sayHello() {
        console.log('hey');
    }
}



/*
var app = require('express');

require("../service/user.service.project-serv.js");

app.get('/websites', sendWebsites);

*/