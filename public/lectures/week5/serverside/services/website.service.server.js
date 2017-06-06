/**
 * Created by mohib on 6/5/2017.
 */


var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    // Makes use of the parent-child relationship
    // /user: Parent class (the list of all users
    // /:userId: Specific instance of that parent
    // /website: All websites objects belonging to the spec. instance
    app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);

    //Websites
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        for(var w in websites) {
            if(websites[w].developerId === req.params.userId) {
                resultSet.push(websites[w]);
            }
        }
        res.json(resultSet);
    }
}