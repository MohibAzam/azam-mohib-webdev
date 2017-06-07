/**
 * Created by mohib on 6/6/2017.
 */
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    dateCrated: Date
});

module.exports(userSchema);

