(function () {
    angular
        .module('WAM')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController($location,
                                    $routeParams,
                                    $sce,
                                    widgetService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        model.handleChoice = handleChoice;

        function handleChoice(choice) {
            var widgetChoice = {
                widgetType: choice
            };
            widgetService.createWidget(model.pageId, widgetChoice);
            $location.url('/user/' + model.userId +
                '/website/' + model.websiteId +
                '/page/' + model.pageId +
                '/widget/' + widgetChoice._id);
        }
    }
})();