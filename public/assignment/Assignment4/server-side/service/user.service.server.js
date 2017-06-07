//When installing via npm, don't forget to use --save
//afterwards, otherwise your code will work locally
//but not when it gets deployed!
var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    //params
    app.get('/api/assignment/user/:userId', findUserById);

    //a query will be used here (optional parameter so to speak)
    app.get('/api/assignment/user', findUserByCredentials);

    app.get('/api/assignment/user/reg', findUserByUsername)

    //this has the same url as above, but it is able to be handled separately
    //since it's a POST, not a GET
    app.post('/api/assignment/user', createUser);

    //Use put when you're passing large objects as data for updating purposes
    //it will be part of the req.body
    app.put('/api/assignment/user/:userId', updateUser);

    //Use delete for deletion operations
    app.delete('/api/assignment/user/:userId', deleteUser);

    //The given users for us to make use of
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function findUserByUsername(req, res) {
        var user = req.query['username'];
        for (var u in users) {
            var user = users[u];
            if (user.username === username) {
                res.json(user);
                return;
            }
        }
        res.send(404);
    }

    //each req represents a "request" object to the server.
    //Specifically, its body is based on the url
    //req.params get the parameter data, for example
    //while req.query allows you to use data enclosed in ?s
    function createUser(req, res) {
        //the body contains whatever was passed into
        //this as a function input in the $http.post, so to speak
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        console.log(user);
        users.push(user);
        //Echoes the user back to the client
        res.send(user);
    }

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
        /*
        var oldUser = users.find(function (user) {
            return user._id === userId;
        });
        if (oldUser !== null) {
            var index = users.indexOf(oldUser);
            user._id = oldUser._id;
            users[index] = user;
            //Send status allows you to tell the client whether
            //or not the server operation was successful.

        }
        */
        res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
    }

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

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        console.log([username, password]);
        var user = null;
        user = users.find(function (user) {
            if (user.username === username) {
                console.log('from first case:' + user);
                res.json(user);
                return;
            }
        });
        console.log('from final case:' + user);
        res.json(user);
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        var user = users.find(function (user) {
            return user._id === userId;
        });
        res.send(user);
    }

}