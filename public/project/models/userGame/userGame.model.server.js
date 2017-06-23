var mongoose = require('mongoose');

var userGameSchema = require('./userGame.schema.server');

var userGameModel = mongoose.model('UserGameModel', userGameSchema);
userGameModel.createUserGame = createUserGame;
userGameModel.findUserGameById = findUserGameById;
userGameModel.findUserGamesForUser = findUserGamesForUser;
userGameModel.findUserGameByGameId = findUserGameByGameId;
userGameModel.updateUserGame = updateUserGame;
userGameModel.deleteUserGame = deleteUserGame;
userGameModel.deleteUserGamesForUser = deleteUserGamesForUser;

module.exports = userGameModel;

function createUserGame(userId, userGame) {
    userGame._user = userId;
    return userGameModel.create(userGame);
}

function findUserGameById(userGameId) {
    return userGameModel.findById(userGameId);
}

function findUserGamesForUser(userId) {
    return userGameModel.find({_user: userId});
}

function findUserGameByGameId (gameId) {
    //return userGameModel.find({game._id: userId});
}

function updateUserGame(userGameId, userGame) {
    return userGameModel.update({_id: userGameId}, {
        $set: {
            playingStatus: userGame.playingStatus,
            ownershipStatus: userGame.ownershipStatus,
            completionStatus: userGame.completionStatus,
            notes: userGame.notes
        }
    });
}

function deleteUserGame(userGameId) {
    return userGameModel.remove({_id: userGameId});
}

function deleteUserGamesForUser(userId) {
    return userGameModel.remove({_user: userId});
}