(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        var vm = this;
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;

        // event handlers
        vm.createPage = createPage;

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        // implementation
        function createPage(page) {
            console.log(page);
            pageService.createPage(vm.websiteId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
            console.log('done');
        }
    }
})();