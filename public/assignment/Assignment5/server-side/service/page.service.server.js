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
    /*
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];
    */

    //Create a new Page for the given website's Id,
    //whose material is taken from the given (incomplete) page
    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        /*
        page._id = (new Date()).getTime() + "";
        page.created = new Date();
        page.updated = new Date();
        pages.push(page);
        console.log(page);
        res.send(page);
        */
        pageModel.createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            });
    }

    //Find all of the pages in the given website's Id
    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params['websiteId'];
        /*
        console.log('starting sitePages');
        var sitePages = [];
        for(var p in pages) {
            var page = pages[p];
            console.log(page);
            if (page.websiteId === websiteId) {
                sitePages.push(page);
                console.log(page + " has been added");
            }
        }
        console.log('done sitePages:' + sitePages);
        res.json(sitePages);
        */
        pageModel.findAllPagesForWebsite(websiteId)
            .then(function (websites) {
                res.json(websites);
            });
    }

    //Update the given page with the material from the given incomplete page
    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params['pageId'];
        /*
        var oldPage = pages.find(function (page) {
            return page._id === pageId;
        });
        if (oldPage !== null) {
            page._id = oldPage._id;
            page.websiteId = oldPage.websiteId;
            page.created = oldPage.created;
            page.updated = new Date();
            var index = pages.indexOf(oldPage);
            pages[index] = page;
            res.sendStatus(200);
            return;
        }
        else {
            res.sendStatus(404);
        }
        */
        pageModel.updatePage(pageId, page)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    //Find a Page whose Id matches the given Id
    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        /*
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        res.send(page);
        */
        pageModel
            .findPageById(pageId)
            .then(function (website) {
                res.json(website);
            });
    }

    //Delete the Page of the given Id
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        /*
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.sendStatus(200);
        */
        pageModel.deletePage(pageId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }
}