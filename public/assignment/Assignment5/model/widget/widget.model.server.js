var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server.js');

//mongoose.model notes the model name followed by
//the schema used by the data in the model
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findAllWidgets = findAllWidgets;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteAllWidgetsForPage = deleteAllWidgetsForPage;

//Anybody who requires this file will be able to access
//the widgetModel and its functions
module.exports = widgetModel;

function createWidget(widget) {
    //This inserts new data into the database
    //We will return a promise so that
    //whoever calls this function can handle it properly
    return widgetModel.create(widget);
}

function findAllWidgets() {
    //When no condition is specified, find() returns all values
    return widgetModel.find();
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        //$set : website
        $set : {
            name: widget.name,
            description: widget.description,
            lastModified: Date.now
        }
    })
}

function findWidgetById(widgetId) {
    //Returns a single instance whose id matches the given one
    //don't forget! All objects generated in the Mongo DB get an id
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    //find returns a specific array of websites that meet the given conditions
    return widgetModel.find({_page: pageId})
    //This will allow us to list off the user itself
        .populate('_page')
        //You can string together multiple transformations, such as .sort()
        //exec() is called to end the list of transformations and run through
        //all of the ones that have been listed
        .exec();
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function deleteAllWidgetsForPage(pageId) {
    return widgetModel.remove({_page: pageId});
}