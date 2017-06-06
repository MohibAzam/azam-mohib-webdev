(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var vm = this;
        vm.userId = $routeParams['userId'];

        //initialize the websites for the given user
        function init() {
            websiteService.findAllWebsitesForUser(vm.userId)
                .then(function (websites) {
                    vm.websites = websites;
                });
        }
        init();
    }
})();