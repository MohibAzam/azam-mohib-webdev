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
gameModel.addRating = addRating;
gameModel.findGameByApiId = findGameByApiId;

function createGame(game) {
    var existingGame = gameModel.findGameByApiId(game.gameId);
    if (existingGame === undefined) {
        return gameModel.create(game);
    }
    else {
        return existingGame;
    }
}

function findGameById(gameId) {
    return gameModel.findById(gameId);
}

function findGameByApiId(gameId) {
    return gameModel.findOne({gameId: gameId});
}

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

function addRating(gameId, userId, score) {
    var game = gameModel.findById(gameId);
    var ratings = game.gameRating;

}

function calculateOverall(userId, score) {

}