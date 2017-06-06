(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var vm = this;
        vm.userId = $routeParams['userId'];

        //initialize the websites for the given user
        function init() {
            vm.websites = websiteService.findAllWebsitesForUser(vm.userId);
        }
        init();
    }
})();