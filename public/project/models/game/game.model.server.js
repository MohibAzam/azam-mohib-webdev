/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

var gameSchema = require('./game.schema.server.js');

var gameModel = mongoose.model('GameModel', gameSchema);

var userModel = require('../user/user.model.server.js');

gameModel.createGame = createGame;
gameModel.findGameById = findGameById;
gameModel.updateGame = updateGame;
gameModel.deleteGame = deleteGame;
//gameModel.addComment = addComment;
//gameModel.addRating = addRating;
//gameModel.findGameByApiId = findGameByApiId;

module.exports = gameModel;

function createGame(game) {
    /*
    console.log(game.gameId);
    console.log(game.gameName);
    console.log(game.gameCover);
    console.log(game.gameDescription);
    var existingGame = gameModel.findGameByApiId(game.gameId);
    if (existingGame === undefined || existingGame === null) {
        console.log('making new game');
        console.log(game);
    }
    else {
        console.log('not making new game');
        console.log(existingGame.gameName);
        console.log(existingGame.gameId);
        console.log(existingGame.comments);
        existingGame.gameId = game.gameId;
        existingGame.gameName = game.gameName;
        existingGame.gameCover = game.gameCover;
        existingGame.gameDescription = game.gameDescription;
        console.log(existingGame.gameName);
        console.log(existingGame.gameId);
        gameModel.updateGame(existingGame._id, existingGame);
        var updatedGame = gameModel.findGameById(existingGame._id);
        console.log(updatedGame.gameId);
        console.log(updatedGame.gameName);
        console.log(updatedGame.gameCover);
        console.log(updatedGame.gameDescription);
        return gameModel.findGameById(existingGame._id);
    }
    */
    console.log('in model');
    return gameModel.create(game);
}

function findGameById(gameId) {
    return gameModel.findById(gameId);
}

/*
function findGameByApiId(gameId) {
    return gameModel.findOne({gameId: gameId});
}
*/

function updateGame(gameId, game) {
    return gameModel.update({_id: gameId}, {
        $set: {
            gameId: game.gameId,
            gameName: game.gameName,
            gameCover: game.gameCover,
            gameGenres: game.gameGenres,
            gameDescription: game.gameDescription,
            gameDevelopers: game.gameDevelopers,
            gamePublishers: game.gamePublishers,
            gameReleases: game.gameReleases,
            gameEsrb: game.gameEsrb
        }
    });
}

function deleteGame(gameId) {
    return gameModel.remove({_id: gameId});
}

/*
function addComment(gameId, writerId, message) {
    var game = gameModel.findById(gameId);
    var writerUser = userModel.findById(writerId);
    var comments = game.comments;
    var newComment = [{username: writerUser.username, message: message}];
    comments = newComment.concat(comments);
    return gameModel.update({_id: gameId}, {
        $set: {
            comments: comments
        }
    });
}
*/

/*
function addRating(gameId, userId, score) {
    var game = gameModel.findById(gameId);
    var ratings = game.gameRating;

}

function calculateOverall(userId, score) {

}
    */