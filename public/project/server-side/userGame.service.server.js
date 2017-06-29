/**
 * Created by mohib on 6/20/2017.
 */

var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var userGameModel = require('../models/userGame/userGame.model.server');

    app.post('/api/mioDB/user/:userId/userGame', createUserGame);
    app.get('/api/mioDB/userGame/:userGameId', findUserGameById);
    app.get('/api/mioDB/userGame/game/:gameId', findUserGameByGameId);
    app.get('/api/mioDB/user/:userId/userGame/:gameId', findSpecUserGameForUser);
    app.get('/api/mioDB/user/:userId/userGame', findUserGamesForUser);
    app.get('/api/mioDB/admin/userGame', isAdmin, findAllUserGames);
    app.put('/api/mioDB/userGame/:userGameId', updateUserGame);
    app.delete('/api/mioDB/userGame/:userGameId', deleteUserGame);
    app.delete('/api/mioDB/user/:userId/userGame', deleteUserGamesForUser);

    function createUserGame(req, res) {
        var userGame = req.body;
        var userId = req.params['userId'];
        userGameModel
            .createUserGame(userId, userGame)
            .then(function (userGame) {
                res.json(userGame);
            });
    }

    function findUserGameById(req, res) {
        var userGameId = req.params['userGameId'];
        userGameModel
            .findUserGameById(userGameId)
            .then(function (userGame) {
                res.json(userGame);
            });
    }

    function findUserGameByGameId(req, res) {
        var gameId = req.params['gameId'];
        userGameModel
            .findUserGameByGameId(gameId)
            .then(function (userGames) {
                res.json(userGames);
            });
    }

    function findSpecUserGameForUser (req, res) {
        var userId = req.params['userId'];
        var gameId = req.params['gameId'];
        userGameModel
            .findSpecUserGameForUser(userId, gameId)
            .then(function (userGame) {
                res.json(userGame);
            });
    }

    function findUserGamesForUser(req, res) {
        var userId = req.params['userId'];
        userGameModel
            .findUserGamesForUser(userId)
            .then(function (userGames) {
                res.json(userGames);
            });
    }

    function findAllUserGames(req, res) {
        userGameModel
            .findAllUserGames()
            .then(function (usergames) {
                res.json(usergames);
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

    function updateUserGame(req, res) {
        var userGameId = req.params['userGameId'];
        var userGame = req.body;
        userGameModel
            .updateUserGame(userGameId, userGame)
            .then(function (response) {
                res.sendStatus(200);
            });
    }

    function deleteUserGame(req, res) {
        var userGameId = req.params['userGameId'];
        userGameModel
            .deleteUserGame(userGameId)
            .then(function (response) {
                res.sendStatus(200);
            });
    }

    function deleteUserGamesForUser(req, res) {
        var userId = req.params['userId'];
        userGameModel
            .deleteUserGamesForUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            });
    }

}