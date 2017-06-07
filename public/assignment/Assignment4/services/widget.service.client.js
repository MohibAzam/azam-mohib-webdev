(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

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
            var url = '/api/assignment/page/' + pageId + '/widget';
            console.log(url);
            return $http.post(url, widget)
                .then(function (response) {
                    console.log('returning data');
                    return response.data
                });
        }

        //Find widgets that are a part of the page
        //whose Id is given
        function findWidgetsByPageId(pageId) {
            var url = "/api/assignment/page/" + pageId + '/widget';
            console.log('url made: ' + url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //Find a widget in the collection through its Id
        function findWidgetById(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //Update a given widget based on the new information
        //provided in an incomplete widget
        function updateWidget(widgetId, widget) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        //Delete the widget whose Id is given
        function deleteWidget(widgetId) {
            var url = "/api/assignment/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();
