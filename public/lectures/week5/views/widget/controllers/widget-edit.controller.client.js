(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, $sce, widgetService) {

        //Initialize the model and all the Ids
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        //Initialize the widgets in the page and the widget to be edited
        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();

        //Event Handlers
        model.getEditUrlForType = getEditUrlForType;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        //Find the editing Url for the given type of Widget
        function getEditUrlForType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '-edit.view.client.html';
        }

        //Update the current widget based on the info
        //in the given widget
        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url('/user/' + model.userId +
                '/website/' + model.websiteId +
                '/page/' + model.pageId +
                '/widget/');
        }

        //Delete the current widget
        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId +
                '/website/' + model.websiteId +
                '/page/' + model.pageId +
                '/widget/');
        }
    }
})();