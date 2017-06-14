var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    name: {type: String, require: true},
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
    description: {type: String, require: true},
    dateCreated: {type: Date, default: Date.now},
    lastModified: {type: Date},
    widgets: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}
    ],
}, {collection: "page"});
module.exports = pageSchema;
