var mongoose = require('mongoose');

var websiteSchema = require('./website.schema.server.js');

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

module.exports = websiteModel;

function addPage(websiteId, pageId) {
    console.log('in addPage');
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            console.log('in callback for addPage');
            website.pages.push(pageId);
            return website.save();
        });
}

function removePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel.create(website);
        /*
        .then(function (website) {
            return userModel.addWebsite(userId, website._id);
        });
        */
}

function findAllWebsites() {
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
    return websiteModel.findById(websiteId);
}

function findAllWebsitesForUser(userId) {
    return websiteModel.find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function deleteWebsite(websiteId) {
    console.log('stage 0');
    return pageModel.deleteAllPagesForWebsite(websiteId)
        .then(function (response) {
            console.log('stage 1');
            return websiteModel
                .findById(websiteId)
                .then(function (website) {
                    console.log('stage 2');
                    var userId = website._user;
                    return websiteModel.remove({_id: websiteId});
                        /*
                        .then(function (status) {
                            console.log('stage 3');
                            return userModel.removeWebsite(userId, websiteId);
                        });
                        */
                });
        });
}

function deleteAllWebsitesForUser(userId) {

    return websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            splicePagesAndWebsites(websites);
        });

    function splicePagesAndWebsites(websites) {
        for(var w in websites) {
            var website = websites[w];
            pageModel.deleteAllPagesForWebsite(website._id);
                /*
                .then(function () {
                    return websiteModel.remove({_id: website._id});
                });
                */
        }
    }
}
