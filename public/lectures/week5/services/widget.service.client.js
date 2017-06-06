(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService() {

        //Widgets we'll be using for the sample webpage
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        //The api we'll be using for the widgets
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        return api;

        //Create a widget from the given pageId and widet
        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widget._id = (new Date()).getTime() + "";
            widgets.push(widget);
        }

        //Find widgets that are a part of the page
        //whose Id is given
        function findWidgetsByPageId(pageId) {
            var pageWidgets = [];
            for(var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId === pageId) {
                    pageWidgets.push(widget);
                }
            }
            return pageWidgets;
        }

        //Find a widget in the collection through its Id
        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        //Update a given widget based on the new information
        //provided in an incomplete widget
        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widget._id = oldWidget._id;
            widget.pageId = oldWidget.pageId;
            widgets[index] = widget;
        }

        //Delete the widget whose Id is given
        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }


    }
})();
