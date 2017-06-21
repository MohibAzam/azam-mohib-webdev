/**
 * Created by mohib on 6/20/2017.
 */
var mongoose = require('mongoose');

var userGameSchema = mongoose.schema({
    game: {type: mongoose.Schema.Types.ObjectId, ref: 'GameModel'},
    _user: String,
    addedDate: String,
    lastUpdatedDate: String,
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
    notes: String,
    rating: Number
}, {collection: "miodb-userGame"});

module.exports = userGameSchema;