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
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function removeWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function createPage(websiteId, page) {
    console.log('in model');
    page._website = websiteId;
    return pageModel.create(page);
        /*
        .then(function (page) {
            console.log(page);
            console.log(websiteId);
            return websiteModel.addPage(websiteId, page._id);
        });
        */
}

function findAllPages() {
    return pageModel.find();
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {
        //$set : website
        $set : {
            name: page.name,
            description: page.description,
            //lastModified: Date.now
        }
    })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function deletePage(pageId) {
    return widgetModel.deleteAllWidgetsForPage(pageId)
        .then(function () {
            return pageModel
                .findById(pageId)
                .then(function (page) {
                    var websiteId = page._website;
                    return pageModel.remove({_id: pageId});
                    /*
                        .then(function (status) {
                            console.log('in page delete callback');
                            console.log(websiteModel);
                            console.log(websiteId);
                            console.log(pageId);
                            return websiteModel.removePage(websiteId, pageId);
                        });
                    */
                });
        });
}

function deleteAllPagesForWebsite(websiteId) {

    return pageModel
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
    }
}

