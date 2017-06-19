var mongoose = require('mongoose');

var userSchema = require('./user.schema.server.js');

var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

var websiteModel = require('../website/website.model.server.js');

module.exports = userModel;

function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function removeWebsite(userId, websiteId) {
    console.log('in here');
    return userModel
        .findById(userId)
        .then(function (user) {
            console.log(user);
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function createUser(user) {
    console.log('test');
    return userModel.create(user);
}

function updateUser(userId, user) {
    delete user.username;
    return userModel.update({_id: userId}, {
        $set : {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    })
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function deleteUser(userId) {
    return websiteModel.deleteAllWebsitesForUser(userId)
        .then(function () {
            return userModel.remove({_id: userId});
        });
}

