/**
 * Created by mohib on 6/5/2017.
 */


var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    var websiteModel = require('../../model/website/website.model.server.js');

    // Makes use of the parent-child relationship
    // /user: Parent class (the list of all users
    // /:userId: Specific instance of that parent
    // /website: All websites objects belonging to the spec. instance
    app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);

    app.get('/api/assignment/website/:websiteId', findWebsiteById);

    app.post('/api/assignment/user/:userId/website', createWebsite);

    app.put('/api/assignment/website/:websiteId', updateWebsite);

    app.delete('/api/assignment/website/:websiteId', deleteWebsite);

    //Websites
    /*
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
    */

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params['userId'];
        /*
        website._id = (new Date()).getTime() + "";
        website.developerId = req.params['userId'];
        website.created = new Date();
        website.updated = new Date();
        websites.push(website);
        console.log(website);
        res.send(website);
        */
        websiteModel.createWebsite(userId, website)
            .then(function () {
                res.json();
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;
        /*
        var oldSite = websites.find(function (website) {
            return website._id === websiteId;
        });
        if (oldSite !== null) {
            var index = websites.indexOf(oldSite);
            website._id = oldSite._id;
            website.created = oldSite.created;
            website.updated = new Date();
            website.developerId = oldSite.developerId;
            websites[index] = website;
            res.sendStatus(200);
            return;
        }
        else {
            res.sendStatus(404);
        }
        */
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        /*
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.sendStatus(200);
        */
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        /*
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        res.json(website);
        */
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
    }

    function findAllWebsitesForUser(req, res) {
        /*
        var resultSet = [];
        for(var w in websites) {
            if(websites[w].developerId === req.params.userId) {
                resultSet.push(websites[w]);
            }
        }
        res.json(resultSet);
        */
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });
    }
}