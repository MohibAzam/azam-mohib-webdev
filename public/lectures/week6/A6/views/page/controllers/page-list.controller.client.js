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
        console.log('starting page service');
        pageService.findPagesByWebsiteId(vm.websiteId)
            .then(renderPages);

        function renderPages(pages) {
            console.log(pages);
            vm.pages = pages;
        }
    }
})();