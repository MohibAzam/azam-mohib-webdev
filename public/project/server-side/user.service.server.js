/**
 * Created by mohib on 6/19/2017.
 */
module.exports = function (app) {
    //TODO: Set this path
    var userModel = require('../models/user/user.model.server');

    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    var FacebookStrategy = require('passport-facebook');

    if(process.env.MLAB_USERNAME) {
        var facebookConfig = {
            clientID     : process.env.FACEBOOK_ID,
            clientSecret : process.env.FACEBOOK_SECRET,
            callbackURL  : 'http://localhost:3000/auth/facebook/callback'
        };
    }
    else {
        var facebookConfig = {
            clientID     : 239462213223929,
            clientSecret : '7eea74e0a859b77c4b1f0752db17a15e',
            callbackURL  : 'http://localhost:3000/auth/facebook/callback'
        };
    }

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.email;
                        //console.log(email);
                        var description = profile.about;
                        //console.log(description);
                        var name = profile.displayName;
                        console.log(name);
                        if (profile.username !== undefined) {
                            var username = profile.username;
                        }
                        else if (profile.email !== undefined) {
                            var username = email.split("@");

                        }
                        else {
                            var username = profile.displayName;
                        }
                        var newFacebookUser = {
                            username: username,
                            email: email,
                            description: description,
                            name: name,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
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
    app.get('/api/mioDB/admin/user', isAdmin, findAllUsers);
    app.put('/api/mioDB/user/:userId', updateUser);
    app.delete('/api/mioDB/user/:userId', deleteUser);
    app.put('/api/mioDB/comment/:profileUserId', addComment);

    app.post('/api/mioDB/login', passport.authenticate('local'), login);
    app.post('/api/mioDB/logout', logout);
    app.post('/api/mioDB/register', register);
    app.get('/api/mioDB/checkAdmin', checkAdmin);
    app.get('/api/mioDB/checkLoggedIn', checkLoggedIn);

    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/home',
            failureRedirect: 'project/#!/login'
        }));

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

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
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

    function checkAdmin(req, res) {
        if (req.isAuthenticated() && req.user.role === 'ADMIN') {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
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