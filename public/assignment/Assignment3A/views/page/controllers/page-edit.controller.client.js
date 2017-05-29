(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   pageService,
                                   $location) {

        var vm = this;
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = pageService.findPageById(vm.pageId);
        }
        init();

        function updatePage(page) {
            pageService.updatePage(vm.pageId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }

        function deletePage() {
            pageService.deletePage(vm.pageId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }
    }
})();