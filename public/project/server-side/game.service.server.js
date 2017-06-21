/**
 * Created by mohib on 6/20/2017.
 */
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var gameModel = require('../models/game.model.server');

    app.post('/api/mioDB/game', createGame);
    app.get('/api/mioDB/game/:gameId', findGameById);
    app.put('/api/mioDB/game/:gameId', updateGame);
    app.delete('/api/mioDB/game/:gameId', deleteGame);
    app.put('/api/mioDB/game/:gameId/comment/:userId', addComment);

    function createGame() {
        var game = req.body;
        gameModel
            .createGame(game)
            .then(function (game) {
                res.json(game);
            });
    }

    function findGameById() {
        var gameId = req.params['gameId'];
        gameModel
            .findGameById(gameId)
            .then(function (game) {
                res.json(game);
            });
    }

    function updateGame() {
        var gameId = req.params['gameId'];
        var game = req.body;
        gameModel
            .updateGame(gameId, game)
            .then(function (game) {
                res.sendStatus(200);
            });
    }

    function deleteGame() {
        var gameId = req.params['gameId'];
        gameModel
            .deleteGame(gameId)
            .then(function (game) {
                res.sendStatus(200);
            });
    }

    function addComment() {
        var gameId = req.params['gameId'];
        var userId = req.params['userId'];
        var message = req.body;
        gameModel
            .addComment(gameId, userId, message)
            .then(function (game) {
                res.sendStatus(200);
            });
    }

}