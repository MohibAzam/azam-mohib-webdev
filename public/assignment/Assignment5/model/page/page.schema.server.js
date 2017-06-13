var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    //You can set additional parameters for each field
    //to specify if they're required fields and/or
    //have default values
    name: {type: String, require: true},
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
    description: {type: String, require: true},
    dateCreated: {type: Date, default: Date.now},
    lastModified: {type: Date},
    widgets: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}
    ],
    //you can either have the parents have references to its children
    //or make the children have references to their parent
    //i.e. either user -> websites or website -> user can work
}, {collection: "page"});/**
 * Created by mohib on 6/11/2017.
 */
module.exports = pageSchema;
