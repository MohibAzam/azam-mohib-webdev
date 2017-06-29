var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: String,
    dateCreated: {type: Date, default: Date.now},
    email: String,
    age: String,
    gender: {type: String, enum: ['Male', 'Female']},
    description: String,
    role: {type: String, default: 'USER', enum: ['USER', 'ADMIN']},
    facebook: {
        id:    String,
        token: String
    },
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
    ]
}, {collection: "miodb-user"});

module.exports = userSchema;