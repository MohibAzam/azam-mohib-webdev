var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server.js');

//mongoose.model notes the model name followed by
//the schema used by the data in the model
var pageModel = mongoose.model('PageModel', pageSchema);
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findAllPages = findAllPages;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.deleteAllPagesForWebsite = deleteAllPagesForWebsite;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;

var widgetModel = require('../widget/widget.model.server.js');
var websiteModel = require('../website/website.model.server.js');

//Anybody who requires this file will be able to access
//the pageModel and its functions
module.exports = pageModel;

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function removeWidget(pageId, widgetId) {
    return websiteModel
        .findWebsiteById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function createPage(websiteId, page) {
    //This inserts new data into the database
    //We will return a promise so that
    //whoever calls this function can handle it properly
    page._website = websiteId;
    return pageModel.create(page)
        .then(function (page) {
            return websiteModel.addPage(websiteId, page._id);
        });
}

function findAllPages() {
    //When no condition is specified, find() returns all values
    return pageModel.find();
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        //$set : website
        $set : {
            name: page.name,
            description: page.description,
            lastModified: Date.now
        }
    })
}

function findPageById(pageId) {
    //Returns a single instance whose id matches the given one
    //don't forget! All objects generated in the Mongo DB get an id
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    //find returns a specific array of websites that meet the given conditions
    return pageModel.find({_website: websiteId})
    //This will allow us to list off the user itself
        .populate('_website', 'name')
        //You can string together multiple transformations, such as .sort()
        //exec() is called to end the list of transformations and run through
        //all of the ones that have been listed
        .exec();
}

function deletePage(pageId) {
    return widgetModel.deleteAllWidgetsForPage(pageId)
        .then(function () {
            return pageModel
                .findPageById(pageId)
                .then(function (page) {
                    var websiteId = page._website._id;
                    return pageModel.remove({_id: pageId})
                        .then(function (status) {
                            return websiteModel.removePage(websiteId, pageId);
                        });
                });
        });
}

function deleteAllPagesForWebsite(websiteId) {

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            spliceWidgetsAndPages(pages);
        });

    function spliceWidgetsAndPages(pages) {
        for(var p in pages) {
            var page = pages[p];
            widgetModel.deleteAllWidgetsForPage(page._id)
                .then(function () {
                    return pageModel.remove({_id: page._id});
                });
        }
        return;
    }
}

