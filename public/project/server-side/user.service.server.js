/**
 * Created by mohib on 6/19/2017.
 */
module.exports = function (app) {
    //TODO: Set this path
    var userModel = require('../models/user/user.model.server');

    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    var SteamStrategy = require('passport-steam');

    var steamConfig = {
        //TODO: Configure these settings
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: 'your steam API key'
    };
    passport.use(new SteamStrategy(steamConfig, steamStrategy));

    //TODO: Finish this strategy
    function steamStrategy(identifier, profile, done) {
        userModel.findUserByOpenId({ openId: identifier }, function (err, user) {
            return done(err, user);
        });
    }

    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log('in conditional');
                    if (user) {
                        console.log('true');
                    }
                    console.log(bcrypt.compareSync(password, user.password));
                    if (user && bcrypt.compareSync(password, user.password)) {
                        console.log('correct choice');
                        return done(null, user);
                    }
                    else {
                        console.log('incorrect');
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    app.post('/api/mioDB/user', createUser);
    app.get('/api/mioDB/user', findUserByUsername);
    app.get('/api/mioDB/user/:userId', findUserById);
    app.put('/api/mioDB/user/:userId', updateUser);
    app.delete('/api/mioDB/user/:userId', deleteUser);
    app.put('/api/mioDB/comment/:profileUserId', addComment);

    app.post('/api/mioDB/login', passport.authenticate('local'), login);
    app.post('/api/mioDB/logout', logout);
    app.post('/api/mioDB/register', register);
    app.get('/api/mioDB/checkLoggedIn', checkLoggedIn);

    app.get('/auth/steam',
        passport.authenticate('steam'),
        function(req, res) {
            // The request will be redirected to Steam for authentication, so
            // this function will not be called.
        });

    app.get('/auth/steam/return',
        //TODO: Configure these settings
        passport.authenticate('steam', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.createUser(user)
            .then(function (user) {
                console.log(user);
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
               res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        var id = req.params['userId'];
        userModel
            .updateUser(id, user)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    function addComment(req, res) {
        console.log('got to addComment');
        var profileUserId = req.params['profileUserId'];
        var message = req.body;
        console.log('sending to model');
        userModel
            .addComment(profileUserId, message)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    res.json(user);
                });
            });
    }

    function checkLoggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

}