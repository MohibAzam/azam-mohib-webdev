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

var pageModel = require('../page/page.model.server.js');

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
        /*
        .then(function (widget) {
            return pageModel.addWidget(pageId, widget._id);
        });
        */
}

function findAllWidgets() {
    return widgetModel.find();
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set : widget
    });
}

function findWidgetById(widgetId) {
    //Returns a single instance whose id matches the given one
    //don't forget! All objects generated in the Mongo DB get an id
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId})
        .populate('_page', 'name')
        .exec();
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            var pageId = widget._page._id;
            return widget.remove({_id: widgetId});
                /*
                .then(function (status) {
                    return pageModel.removeWidget(pageId, widgetId);
                });
                */
        });
}

function deleteAllWidgetsForPage(pageId) {
    return widgetModel.remove({_page: pageId});
}