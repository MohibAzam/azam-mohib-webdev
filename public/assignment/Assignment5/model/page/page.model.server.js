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

var widgetModel = require('../widget/widget.model.server.js');

//Anybody who requires this file will be able to access
//the pageModel and its functions
module.exports = pageModel;

function createPage(websiteId, page) {
    //This inserts new data into the database
    //We will return a promise so that
    //whoever calls this function can handle it properly
    page._website = websiteId;
    return pageModel.create(page);
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
        .populate('_website')
        //You can string together multiple transformations, such as .sort()
        //exec() is called to end the list of transformations and run through
        //all of the ones that have been listed
        .exec();
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

function deleteAllPagesForWebsite(websiteId) {
    widgetModel.deleteAllWidgetsForPage()
    return pageModel.remove({_website: websiteId});
}

