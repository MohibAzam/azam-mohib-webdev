var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    //You can set additional parameters for each field
    //to specify if they're required fields and/or
    //have default values
    name: String,
    description: String,
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], require: true},
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
    size: Number,
    rows: Number,
    placeholder: String,
    text: String,
    width: String,
    height: String,
    url: String,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
    //you can either have the parents have references to its children
    //or make the children have references to their parent
    //i.e. either user -> websites or website -> user can work
}, {collection: "widget"});/**
 * Created by mohib on 6/11/2017.
 */
module.exports = widgetSchema;
