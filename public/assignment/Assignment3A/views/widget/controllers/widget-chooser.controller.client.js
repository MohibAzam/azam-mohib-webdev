(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($location, $sce) {

        var model = this;

        model.widgets = widgets;

        function handleChoice(choice) {
            var widgetChoice = {
                widgetType: choice
            };
            widgetChoice._id = (new Date()).getTime() + "";
            widgets.push(widgetChoice);
            $location.url('/user/' + model.userId +
                '/website/' + model.websiteId +
                '/page/' + model.pageId +
                '/widget/' + widgetChoice._id);
        }
    }
})();