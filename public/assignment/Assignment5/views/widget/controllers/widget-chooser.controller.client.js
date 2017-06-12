(function () {
    angular
        .module('WAM')
        .controller('widgetChooseController', widgetChooseController);

    function widgetChooseController($location,
                                    $routeParams,
                                    $sce,
                                    widgetService) {

        //Initialize the model and the Ids
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        //initialize the widgets for the Page
        console.log('starting widget service');
        widgetService.findWidgetsByPageId(model.pageId)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            console.log(widgets);
            model.widgets = widgets;
        }

        //Event handler
        model.handleChoice = handleChoice;

        //Given some possible widgetType from the widget-chooser,
        //create a brand new widget of that type and immediately
        //have the user edit it
        function handleChoice(choice) {
            var widgetChoice = {
                widgetType: choice
            };
            widgetService.createWidget(model.pageId, widgetChoice)
                .then(function (widget) {
                    $location.url('/user/' + model.userId +
                        '/website/' + model.websiteId +
                        '/page/' + model.pageId +
                        '/widget/' + widget._id);
                });
        }
    }
})();