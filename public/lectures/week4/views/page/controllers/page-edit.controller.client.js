(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   pageService,
                                   $location) {

        //self-instantiation
        var vm = this;

        //Ids
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        //Initialize by getting the pages in the website
        //and the page currently being edited
        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = pageService.findPageById(vm.pageId);
        }
        init();

        //Update the current page with the information in the given page
        function updatePage(page) {
            pageService.updatePage(vm.pageId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }

        //Delete the current page
        function deletePage() {
            pageService.deletePage(vm.pageId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
        }
    }
})();