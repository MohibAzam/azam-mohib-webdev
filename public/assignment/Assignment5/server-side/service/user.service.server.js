//When installing via npm, don't forget to use --save
//afterwards, otherwise your code will work locally
//but not when it gets deployed!
var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    var userModel = require('../../model/user/user.model.server.js');

    //The API for the user service on the Server-side
    app.get('/api/assignment/user/:userId', findUserById);

    app.get('/api/assignment/user', findUserByCredentials);

    app.get('/api/assignment/user/', findUserByUsername);

    app.post('/api/assignment/user', createUser);

    app.put('/api/assignment/user/:userId', updateUser);

    app.delete('/api/assignment/user/:userId', deleteUser);

    //Create user pased on the given material
    function createUser(req, res) {
        console.log('yo');
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                console.log(user);
                res.json(user);
            })

    }

    //Update the user of a given userId
    //with the given properties
    function updateUser(req, res) {
        var user = req.body;
        var id = req.params['userId'];
        userModel
            .updateUser(id, user)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    //Delete the user of the given userId
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    //Find the user for the given username and password
    function findUserByCredentials(req, res)  {
        console.log('got here');
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    //Find a user for a given username
    function findUserByUsername(req, res) {
        console.log('got to method');
        var username = req.params['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    //Find a user for a given userId
    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

}