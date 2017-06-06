(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        //Self-instantiation
        var vm = this;

        //Ids
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;

        // event handlers
        vm.createPage = createPage;

        //Initialize by getting the pages in the website
        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        //Create a new Page in the Website based on the given information
        function createPage(page) {
            console.log(page);
            pageService.createPage(vm.websiteId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
            console.log('done');
        }
    }
})();