var mongoose = require('mongoose');

var websiteSchema = require('./website.schema.server.js');

//mongoose.model notes the model name followed by
//the schema used by the data in the model
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteAllWebsitesForUser = deleteAllWebsitesForUser;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;

var userModel = require('../user/user.model.server.js');
var pageModel = require('../page/page.model.server.js');

//Anybody who requires this file will be able to access
//the websiteModel and its functions
module.exports = websiteModel;

function addPage(websiteId, pageId) {
    console.log('in addPage');
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            console.log('in callback for addPage');
            website.pages.push(pageId);
            return website.save();
        });
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function createWebsite(userId, website) {
    //This inserts new data into the database
    //We will return a promise so that
    //whoever calls this function can handle it properly

    website._user = userId;
    return websiteModel.create(website)
        .then(function (website) {
            return userModel.addWebsite(userId, website._id);
        });
}

function findAllWebsites() {
    //When no condition is specified, find() returns all values
    return websiteModel.find();
}

function updateWebsite(websiteId, website) {
    //var date = Date.now;
    return websiteModel.update({_id: websiteId}, {
        //$set : website
        $set : {
            name: website.name,
            description: website.description,
            //lastModified: date
        }
    })
}

function findWebsiteById(websiteId) {
    //Returns a single instance whose id matches the given one
    //don't forget! All objects generated in the Mongo DB get an id
    return websiteModel.findById(websiteId);
}

function findAllWebsitesForUser(userId) {
    //find returns a specific array of websites that meet the given conditions
    return websiteModel.find({_user: userId})
        //This will allow us to list off the user itself
        .populate('_user', 'username')
        //You can string together multiple transformations, such as .sort()
        //exec() is called to end the list of transformations and run through
        //all of the ones that have been listed
        .exec();
}

function deleteWebsite(websiteId) {
    return pageModel.deleteAllPagesForWebsite(websiteId)
        .then(function () {
            return websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    var userId = website._user._id;
                    return websiteModel.remove({_id: websiteId})
                        .then(function (status) {
                            return userModel.removeWebsite(userId, websiteId);
                        });
                });
        });
}

function deleteAllWebsitesForUser(userId) {

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            splicePagesAndWebsites(websites);
        });

    function splicePagesAndWebsites(websites) {
        for(var w in websites) {
            var website = websites[w];
            pageModel.deleteAllPagesForWebsite(website._id)
                .then(function () {
                    return websiteModel.remove({_id: website._id});
                });
        }
        return;
    }
}
