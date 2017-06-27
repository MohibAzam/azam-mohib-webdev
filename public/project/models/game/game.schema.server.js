/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    _id: {type: Number, require: true},
    gameName: {type: String, require: true},
    gameCover: String,
    gameGenres: String,
    gameDescription: String,
    gameDevelopers: String,
    gamePublishers: String,
    gameReleases: String,
    gameEsrb: {type: String, enum: ['EC', 'E', 'E10+', 'T', 'M', 'AO']},
    /*
    gameRating: [
        {username: String, rating: Number}
    ],
    */
    comments: [
        {username: String, time: String, message: String}
    ]
}, {collection: "miodb-game"});

module.exports = gameSchema;