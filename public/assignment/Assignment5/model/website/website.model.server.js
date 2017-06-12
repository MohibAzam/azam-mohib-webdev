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

var pageModel = require('../page/page.model.server.js');

//Anybody who requires this file will be able to access
//the websiteModel and its functions
module.exports = websiteModel;

function createWebsite(userId, website) {
    //This inserts new data into the database
    //We will return a promise so that
    //whoever calls this function can handle it properly
    website._user = userId;
    return websiteModel.create(website);
}

function findAllWebsites() {
    //When no condition is specified, find() returns all values
    return websiteModel.find();
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {
        //$set : website
        $set : {
            name: website.name,
            description: website.description,
            lastModified: Date.now
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
        .populate('_user')
        //You can string together multiple transformations, such as .sort()
        //exec() is called to end the list of transformations and run through
        //all of the ones that have been listed
        .exec();
}

function deleteWebsite(websiteId) {

    return websiteModel.remove({_id: websiteId});
}

