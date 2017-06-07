(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);
    
    function widgetListController($routeParams, $sce, widgetService) {

        //Initialize the Model and some Ids
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        //Initialize the widgets in this model
        console.log('starting widget service');
        widgetService.findWidgetsByPageId(model.pageId)
            .then(renderWidgets);

        function renderWidgets(widgets) {
            console.log(widgets);
            model.widgets = widgets;
        }

        //Event Handlers
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        //Get the view url for the given widget type
        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        //Create an embedded version of a given Youtube link
        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);

        }

        //Force the application to accept some text as HTML
        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();