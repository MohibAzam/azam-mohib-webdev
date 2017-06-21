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
            description: user.description,
            comments: user.comments
        }
    });
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addComment(profileUserId, message) {
    var profileUser = userModel.findById(profileUserId);
    console.log(profileUser);
    var comments = profileUser.comments;
    console.log(comments);
    if (comments === undefined) {
        comments = new Array();
    }
    comments.reverse();
    comments.push(message);
    comments.reverse();
    return userModel.update({_id: profileUserId}, {
        $set: {
            comments: comments
        }
    });
}
