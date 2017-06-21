/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

//TODO: Add the date of being added, beaten, and completed
var userGameSchema = mongoose.schema({
    gameId: String,
    gameName: String,
    gameCover: String,
    _user: String,
    playingStatus: {type: String,
        enum: [
            'notPlaying',
            'firstPlay',
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
    notes: String
}, {collection: "miodb-userGame"});

module.exports = userGameSchema;