module.exports = function(app) {

    var userServApp = require ('./services/user.service.server');
    var websiteServApp = require ('./services/website.service.server');
    userServApp(app);
    websiteServApp(app);

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

require("../service/user.service.server.js");

app.get('/websites', sendWebsites);

*/