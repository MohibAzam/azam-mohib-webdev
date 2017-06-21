/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

var gameSchema = mongoose.schema({
    gameId: {type: String, require: true},
    gameName: {type: String, require: true},
    gameCover: String,
    gameGenres: String,
    gameDescription: String,
    gameDevelopers: String,
    gamePublishers: String,
    gameReleases: String,
    gameEsrb: String,
    /*
    gameRating: [
        {username: String, rating: Number}
    ],
    */
    comments: [
        {username: String, message: String}
    ]
}, {collection: "miodb-game"});

module.exports = gameSchema;