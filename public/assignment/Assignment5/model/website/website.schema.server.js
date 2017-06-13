var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({

    name: {type: String, require: true},

    //This field is a reference to the parent
    //Such that each website knows who its parent is
    //for the purposes of grabbing a user's websites
    //This is as close as you can get to creating
    //relations between objects
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},

    description: {type: String, require: true},
    dateCreated: {type: Date, default: Date.now},
    pages: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}
    ],
    lastModified: {type: Date}

}, {collection: "website"});/**
 * Created by mohib on 6/11/2017.
 */
module.exports = websiteSchema;
