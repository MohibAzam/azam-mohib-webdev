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
            'notPlaying',
            'playing',
            'replaying',
            'extras',
            'competitive',
            'other'
        ]},
    ownershipStatus: {type: String,
        enum: [
            'ownPhysical',
            'ownDigital',
            'rental',
            'previouslyOwned',
            'borrowed',
            'lost',
            'other'
        ]},
    completionStatus: {type: String,
        enum: [
            'unplayed',
            'unfinished',
            'beaten',
            'completed',
            'mastered',
            'other'
        ]},
    notes: String,
    rating: String
}, {collection: "miodb-userGame"});

module.exports = userGameSchema;