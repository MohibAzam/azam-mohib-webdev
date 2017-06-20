var mongoose = require('mongoose');

var userSchema = require('./user.schema.server.js');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findUserByOpenId = findUserByOpenId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addComment = addComment;
module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByOpenId(openId) {
    return userModel.findOne({'steam.openID': openId});
}

function updateUser(userId, user) {
    delete user.username;
    return userModel.update({_id: userId}, {
        $set: {
            name: user.name,
            email: user.email,
            description: user.description
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addComment(profileUserId, writerId, message) {
    var profileUser = userModel.findById(profileUserId);
    var writerUser = userModel.findById(writerId);
    var comments = profileUser.comments;
    var newComment = [{username: writerUser.username, message: message}];
    comments = newComment.concat(comments);
    return userModel.update({_id: profileUserId}, {
        $set: {
            comments: comments
        }
    });
}
