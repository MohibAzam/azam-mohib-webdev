//When installing via npm, don't forget to use --save
//afterwards, otherwise your code will work locally
//but not when it gets deployed!
var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    var userModel = require('../../model/user/user.model.server.js');

    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    var googleConfig = {
        clientID     : '716524462943-pskf85rdtc8012bka33goqg39u5fcr7s.apps.googleusercontent.com',
        clientSecret : 'G83qDVF4y0Q1bP5Jup4JcjKm',
        //Note: Replace the callback URL with the localhost:3000
        //If you wish to use this locally.
        //This should work fine on Heroku
        callbackURL  : 'https://azam-mohib-webdev.herokuapp.com/auth/google/callback'
    };
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    var bcrypt = require("bcrypt-nodejs");

    //Passport isn't doing the actual authentication,
    //we are, but it gives us the tools to do so,
    //and we notify them as we do authentication
    passport.use(new LocalStrategy(localStrategy));

    //Functions to tell us that passport received a request
    //and is trying to decrypt the cookie.
    //Tells passport how to identify users
    //Serialize sends the data into the cookie
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //This method is the methodology used for local authentication
    //First two arguments are obviously username and pw
    //Third argument allows you to chain multiple functions

    //If you use $https, it encrypts the information
    //between the browser and server. The browser and server
    //agree on keys and sends encrypted data back and forth
    //(note that heroku requires a paid account to do this)
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
                        //This gets executed if the user is found
                        console.log('correct choice');
                        return done(null, user);
                    }
                    else {
                        console.log('incorrect');
                        //This gets executed if the user does not exist
                        //Returns false to indicate it's unauthorized
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

    //The API for the user service on the Server-side

    //Tells passport to use local strategy to check the request that is coming
    //then let us know if the given user/password is valid
    app.post('/api/assignment/login', passport.authenticate('local'), login);

    app.get('/api/assignment/user/:userId', findUserById);

    app.get('/api/assignment/user/login', findUserByCredentials);

    app.get('/api/assignment/user', findUserByUsername);

    app.post('/api/assignment/user', createUser);

    app.put('/api/assignment/user/:userId', updateUser);

    app.delete('/api/assignment/user/:userId', deleteUser);

    app.get('/api/assignment/checkLoggedIn', checkLoggedIn);

    app.post('/api/assignment/logout', logout);

    app.post('/api/assignment/register', register);

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/Assignment6/index.html#!/profile',
            failureRedirect: '/assignment/Assignment6/index.html#!/login'
        }));


    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    //This added function input
                    //provides a callback to help operate
                    //both the login and the user creation
                    res.json(user);
                });
            })
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function checkLoggedIn(req, res) {
        //Added by passport that checks to see if the given user
        //has been authenticated (logged in)
        if(req.isAuthenticated()) {
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    //Log the given user in
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    //Create user pased on the given material
    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
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
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                console.log(user);
                res.json(user);
            }, function (err) {
                console.log('wasnt found');
                res.sendStatus(404);
            });
    }

    //Find a user for a given userIderr
    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    //States the cookie is good and user was found,
                    //seeing as findById gave us a result.
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

}