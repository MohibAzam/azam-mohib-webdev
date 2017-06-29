var mongoose = require('mongoose');

var userGameSchema = require('./userGame.schema.server');

var userGameModel = mongoose.model('UserGameModel', userGameSchema);
userGameModel.createUserGame = createUserGame;
userGameModel.findUserGameById = findUserGameById;
userGameModel.findSpecUserGameForUser = findSpecUserGameForUser;
userGameModel.findUserGamesForUser = findUserGamesForUser;
userGameModel.findUserGameByGameId = findUserGameByGameId;
userGameModel.findAllUserGames = findAllUserGames;
userGameModel.updateUserGame = updateUserGame;
userGameModel.deleteUserGame = deleteUserGame;
userGameModel.deleteUserGamesForUser = deleteUserGamesForUser;


module.exports = userGameModel;

function createUserGame(userId, userGame) {
    userGame.user = userId;
    return userGameModel.create(userGame);
}

function findUserGameById(userGameId) {
    return userGameModel.findById(userGameId);
}

function findSpecUserGameForUser(userId, gameId) {
    return userGameModel.findOne({user: userId, gameId: gameId});
}

function findUserGamesForUser(userId) {
    return userGameModel.find({user: userId});
}

function findUserGameByGameId (gameId) {
    return userGameModel.find({gameId: gameId});
}

function findAllUserGames() {
    return userGameModel.find();
}

function updateUserGame(userGameId, userGame) {
    return userGameModel.update({_id: userGameId}, {
        $set: {
            gameName: userGame.gameName,
            gameCover: userGame.gameCover,
            gameId: userGame.gameId,
            user: userGame.user,
            playingStatus: userGame.playingStatus,
            ownershipStatus: userGame.ownershipStatus,
            completionStatus: userGame.completionStatus,
            rating: userGame.rating,
            notes: userGame.notes
        }
    });
}

function deleteUserGame(userGameId) {
    return userGameModel.remove({_id: userGameId});
}

function deleteUserGamesForUser(userId) {
    return userGameModel.remove({user: userId});
}