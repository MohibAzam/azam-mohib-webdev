var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({

    name: {type: String, require: true},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    description: {type: String, require: true},
    dateCreated: {type: Date, default: Date.now},
    pages: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}
    ],
    lastModified: {type: Date}

}, {collection: "website"});
module.exports = websiteSchema;
