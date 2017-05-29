(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {

        //self-instantiation
        var vm = this;

        //Ids
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;

        //Initialize by getting the pages in the website
        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();
    }
})();