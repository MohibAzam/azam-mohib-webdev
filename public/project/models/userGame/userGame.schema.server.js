/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

var userGameSchema = mongoose.Schema({
    gameName: String,
    gameCover: String,
    gameId: Number,
    user: String,
    addedDate: String,
    lastUpdatedDate: String,
    playingStatus: {type: String,
        enum: [
            'Not Playing',
            'Playing',
            'Replaying',
            'Extras',
            'Competitive',
            'Other'
        ]},
    ownershipStatus: {type: String,
        enum: [
            'Own Physical',
            'Own Digital',
            'Rented',
            'Previously Owned',
            'Borrowed',
            'Lost',
            'Other'
        ]},
    completionStatus: {type: String,
        enum: [
            'Unplayed',
            'Unfinished',
            'Beaten',
            'Completed',
            'Mastered',
            'Other'
        ]},
    notes: String,
    rating: String
}, {collection: "miodb-userGame"});

module.exports = userGameSchema;