var mongoose = require('mongoose');

var userSchema = require('./user.schema.server.js');

//mongoose.model notes the model name followed by
//the schema used by the data in the model
var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

function addWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

//Anybody who requires this file will be able to access
//the userModel and its functions
module.exports = userModel;

function createUser(user) {
    //This inserts new data into the database
    //We will return a promise so that
    //whoever calls this function can handle it properly
    console.log('test');
    return userModel.create(user);
}

function updateUser(userId, user) {
    //you can delete fields from the incoming user
    //in case you don't want them to be used for updating
    delete user.username;
    //Updating takes two arguments:
    //the characteristics present in the object(s) to be updated
    //and what will actually be updated in the object(s)
    //you can update the fields individually
    //or set it to be the new object outright
    return userModel.update({_id: userId}, {
        $set : {
            firstName: user.firstName,
            lastName: user.lastName,
            //Note, if you attempt to update any fields using
            //this functionality that aren't in the schema,
            //they will be ignored
            email: user.email,
            phone: user.phone
        }
    })
}

function findUserById(userId) {
    //Returns a single instance whose id matches the given one
    //don't forget! All objects generated in the Mongo DB get an id
    return userModel.findById(userId);
}

//The model should not know who requests are coming from
//and the services don't actually know how to manipulate data directly
function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return pageModel.deleteAllPagesForWebsite(w.websiteId)
        .then(function () {
            return userModel.remove({_id: userId});
        });
}

