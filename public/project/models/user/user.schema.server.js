var mongoose = require('mongoose');

//TODO: Finish the Steam Login info
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: String,
    dateCreated: {type: Date, default: Date.now},
    email: String,
    description: String,
    following: [
        {type: String}
    ],
    comments: [
        {username: String, time: String, message: String}
    ],
    wishlist: [
        {gameName: String, gameCover: String, _id: Number}
    ],
    gamelist: [
        Number
    ],
    team: {
        openID: String
    },
    following: [
        String
    ]
}, {collection: "miodb-user"});

module.exports = userSchema;