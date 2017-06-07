/**
 * Created by mohib on 6/6/2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
userModel.createUser = createUser;
userModel.findUserById = findUserById;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(user) {

}