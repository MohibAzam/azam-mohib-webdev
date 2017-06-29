/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

var gameSchema = require('./game.schema.server.js');

var gameModel = mongoose.model('GameModel', gameSchema);

var userModel = require('../user/user.model.server.js');

gameModel.createGame = createGame;
gameModel.findGameById = findGameById;
gameModel.findAllGames = findAllGames;
gameModel.updateGame = updateGame;
gameModel.deleteGame = deleteGame;

module.exports = gameModel;

function createGame(game) {
    console.log('in model');
    return gameModel.create(game);
}

function findGameById(gameId) {
    console.log(gameModel);
    return gameModel.findById(gameId);
}

function findAllGames() {
    return gameModel.find();
}

function updateGame(gameId, game) {
    return gameModel.update({_id: gameId}, {
        $set: {
            gameName: game.gameName,
            gameCover: game.gameCover,
            gameGenres: game.gameGenres,
            gameDescription: game.gameDescription,
            gameDevelopers: game.gameDevelopers,
            gamePublishers: game.gamePublishers,
            gameReleases: game.gameReleases,
            gameEsrb: game.gameEsrb,
            comments: game.comments
        }
    });
}

function deleteGame(gameId) {
    return gameModel.remove({_id: gameId});
}