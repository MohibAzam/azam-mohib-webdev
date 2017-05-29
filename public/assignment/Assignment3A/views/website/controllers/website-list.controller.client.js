(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var vm = this;
        vm.userId = $routeParams['userId'];

        function init() {
            vm.websites = websiteService.findAllWebsitesForUser(vm.userId);
        }
        init();
    }
})();