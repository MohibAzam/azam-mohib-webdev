(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   pageService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        // implementation
        function createPage(page) {
            pageService.createWebsite(model.websiteId, page);
            $location.url('/user/' + model.userId + '/website' + model.websiteId + '/page');
        }

        function updatePage(page) {
            pageService.updatePage(model.pageId, page);
            $location.url('/user/' + model.userId + '/website' + model.websiteId + '/page');
        }

        function deletePage() {
            websiteService.deletePage(model.pageId);
            $location.url('/user/' + model.userId + '/website' + model.websiteId + '/page');
        }
    }
})();