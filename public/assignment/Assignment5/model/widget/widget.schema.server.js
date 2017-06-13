var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
    name: String,
    description: String,
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'], require: true},
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
}, {collection: "widget"});
module.exports = widgetSchema;
