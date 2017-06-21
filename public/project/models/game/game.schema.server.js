/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

//TODO: Finish schema
var gameSchema = mongoose.schema({
    gameId: String,
    gameName: String,
    gameCover: String,
    gameGenres: String,
    gameDescription: String,
    gameDevelopers: String,
    gamePublishers: String,
    gameReleases: String,
    gameEsrb: String,
    gameRating: [
        {username: String, rating: Number}
    ],
    comments: [
        {username: String, message: String}
    ]
}, {collection: "miodb-game"});

module.exports = gameSchema;