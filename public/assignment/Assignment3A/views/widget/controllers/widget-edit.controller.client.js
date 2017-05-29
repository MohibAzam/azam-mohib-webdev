(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($location, $routeParams, $sce, widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        function init() {
            console.log('test');
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
            console.log(model.widget);
        }
        init();

        model.getEditUrlForType = getEditUrlForType;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function getEditUrlForType(type) {
            return 'views/widget/templates/widget-' + type.toLowerCase() + '-edit.view.client.html';
        }

        function updateWidget(widget) {
            widgetService.updateWidget(model.widgetId, widget);
            $location.url('/user/' + model.userId +
                '/website/' + model.websiteId +
                '/page/' + model.pageId +
                '/widget/');
        }

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId +
                '/website/' + model.websiteId +
                '/page/' + model.pageId +
                '/widget/');
        }
    }
})();