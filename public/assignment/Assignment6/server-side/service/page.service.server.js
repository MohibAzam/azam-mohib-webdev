/**
 * Created by mohib on 6/6/2017.
 */
/**
 * Created by mohib on 6/5/2017.
 */

var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {

    var pageModel = require('../../model/page/page.model.server.js');

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    //The API of the Page Service on the Server-side
    app.get('/api/assignment/website/:websiteId/page', findPagesByWebsiteId);

    app.get('/api/assignment/page/:pageId', findPageById);

    app.post('/api/assignment/website/:websiteId/page', createPage);

    app.put('/api/assignment/page/:pageId', updatePage);

    app.delete('/api/assignment/page/:pageId', deletePage);

    //The given pages for us to use

    //Create a new Page for the given website's Id,
    //whose material is taken from the given (incomplete) page
    function createPage(req, res) {
        console.log('in server');
        var page = req.body;
        var websiteId = req.params.websiteId;
        console.log('sending ' + page + ' and ' + websiteId);
        pageModel.createPage(websiteId, page)
            .then(function (page) {
                console.log('got model callback');
                res.json(page);
            });
    }

    //Find all of the pages in the given website's Id
    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params['websiteId'];
        pageModel.findAllPagesForWebsite(websiteId)
            .then(function (websites) {
                res.json(websites);
            });
    }

    //Update the given page with the material from the given incomplete page
    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params['pageId'];
        pageModel.updatePage(pageId, page)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    //Find a Page whose Id matches the given Id
    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(function (website) {
                res.json(website);
            });
    }

    //Delete the Page of the given Id
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel.deletePage(pageId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }
}