var mongoose = require('mongoose');

//TODO: Finish this Schema
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: String,
    dateCreated: {type: Date, default: Date.now},
    email: String,
    description: String,
    comments: [
        {username: String, time: String, message: String}
    ],
    wishlist: [
        {_game: String, name: String, cover: String}
    ],
    steam: {
        openID: String
    }

}, {collection: "miodb-user"});

module.exports = userSchema;