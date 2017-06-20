var mongoose = require('mongoose');

//TODO: Finish this Schema
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: String,
    dateCreated: {type: Date, default: Date.now},
    email: String,
    description: String,

    steam: {
        openID: String
    }

}, {collection: user});

module.exports = userSchema;