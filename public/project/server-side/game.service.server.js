/**
 * Created by mohib on 6/20/2017.
 */
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var gameModel = require('../models/game/game.model.server');

    app.post('/api/mioDB/game', createGame);
    app.get('/api/mioDB/game/:gameId', findGameById);
    app.get('/api/mioDB/admin/game', isAdmin, findAllGames);
    app.put('/api/mioDB/game/:gameId', updateGame);
    app.delete('/api/mioDB/game/:gameId', isAdmin, deleteGame);

    function createGame(req, res) {
        var game = req.body;
        gameModel
            .createGame(game)
            .then(function (game) {
                console.log('returning game');
                res.json(game);
            });
    }

    function findGameById(req, res) {
        var gameId = req.params['gameId'];
        gameModel
            .findGameById(gameId)
            .then(function (game) {
                res.json(game);
            });
    }

    function findAllGames(req, res) {
        gameModel
            .findAllGames()
            .then(function (games) {
                res.json(games);
            });
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.role === 'ADMIN') {
            next();
        }
        else {
            res.sendStatus(401);
        }
    }

    function updateGame(req, res) {
        var apiId = req.params['gameId'];
        var game = req.body;
        gameModel
            .updateGame(apiId, game)
            .then(function (game) {
                res.sendStatus(200);
            });
    }

    function deleteGame(req, res) {
        var gameId = req.params['gameId'];
        gameModel
            .deleteGame(gameId)
            .then(function (game) {
                res.sendStatus(200);
            });
    }

}