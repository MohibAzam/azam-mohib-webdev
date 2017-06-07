//When installing via npm, don't forget to use --save
//afterwards, otherwise your code will work locally
//but not when it gets deployed!
var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    //The API for the user service on the Server-side
    app.get('/api/assignment/user/:userId', findUserById);

    app.get('/api/assignment/user', findUserByCredentials);

    app.get('/api/assignment/user/reg', findUserByUsername);

    app.post('/api/assignment/user', createUser);

    app.put('/api/assignment/user/:userId', updateUser);

    app.delete('/api/assignment/user/:userId', deleteUser);

    //The list of all users, held here on the server-side
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //Create user pased on the given material
    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        console.log(user);
        users.push(user);
        res.send(user);
    }

    //Update the user of a given userId
    //with the given properties
    function updateUser(req, res) {
        var user = req.body;
        var id = req.params['userId'];
        for (var u in users) {
            if (id === users[u]._id) {
                users[u] = user;
                console.log(user);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    //Delete the user of the given userId
    function deleteUser(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
    }

    //Find the user for the given username and password
    function findUserByCredentials(req, res)  {
        console.log('got here');
        var username = req.query['username'];
        var password = req.query['password'];
        console.log([username, password]);
        var user = users.find(function (user) {
            if (user.username === username && user.password === password) {
                console.log('from first case:' + user);
                res.json(user);
                return;
            }
        });
        console.log('from final case:' + user);
        res.sendStatus(404);
    }

    //Find a user for a given username
    function findUserByUsername(req, res) {
        console.log('got to method');
        var username = req.query['username'];
        console.log(username);
        var user = null;
        user = users.find(function (u) {
            if (u.username === username) {
                console.log('from first case:' + u);
                res.json(u);
                return;
            }
        });
        console.log('from final case:' + user);
        res.json(user);
    }

    //Find a user for a given userId
    function findUserById(req, res) {
        var userId = req.params['userId'];
        var user = users.find(function (user) {
            return user._id === userId;
        });
        res.send(user);
    }

}