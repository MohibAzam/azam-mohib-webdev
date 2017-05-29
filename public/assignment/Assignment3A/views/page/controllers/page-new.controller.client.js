(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;

        // event handlers
        model.createWebsite = createPage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

        // implementation
        function createPage(page) {
            pageService.createWebsite(model.websiteId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();