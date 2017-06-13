/**
 * Created by mohib on 6/5/2017.
 */


var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    var websiteModel = require('../../model/website/website.model.server.js');

    // The apis for the Website service
    app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);

    app.get('/api/assignment/website/:websiteId', findWebsiteById);

    app.post('/api/assignment/user/:userId/website', createWebsite);

    app.put('/api/assignment/website/:websiteId', updateWebsite);

    app.delete('/api/assignment/website/:websiteId', deleteWebsite);

    //Create the given website
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params['userId'];
        websiteModel.createWebsite(userId, website)
            .then(function (website) {
                res.json(website);
            });
    }

    //Update the given website such that
    //its properties match those that are given
    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var website = req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    //Delete the given website
    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    //Find a website with the given id
    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
    }

    //Find all the websites for the given user
    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            });
    }
}