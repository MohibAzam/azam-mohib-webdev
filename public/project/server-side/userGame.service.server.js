/**
 * Created by mohib on 6/20/2017.
 */

var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var userGameModel = require('../models/userGame.model.server');

    app.post('/api/mioDB/user/:userId/userGame', createUserGame);
    app.get('/api/mioDB/userGame/:userGameId', findUserGameById);
    app.get('/api/mioDB/user/:userId/userGame', findUserGamesForUser);
    app.put('/api/mioDB/userGame/:userGameId', updateUserGame);
    app.delete('/api/mioDB/userGame/:userGameId', deleteUserGame);

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

    function findUserGamesForUser(req, res) {
        var userId = req.params['userId'];
        userGameModel
            .findUserGamesForUser(userId)
            .then(function (userGames) {
                res.json(userGames);
            });
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

}