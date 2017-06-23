var mongoose = require('mongoose');

//TODO: Finish the Steam Login info
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: String,
    dateCreated: {type: Date, default: Date.now},
    email: String,
    description: String,
    followingList: [
        {type: String}
    ],
    comments: [
        {username: String, time: String, message: String}
    ],
    wishlist: [
        {gameName: String, gameCover: String, gameId: Number}
    ],
    gamelist: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'UserGameModel'}
    ],
    team: {
        openID: String
    }

}, {collection: "miodb-user"});

module.exports = userSchema;