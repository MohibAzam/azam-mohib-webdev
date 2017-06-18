(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var vm = this;
        vm.userId = $routeParams['userId'];

        //initialize the websites for the given user
        websiteService.findAllWebsitesForUser(vm.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
        }
    }
})();