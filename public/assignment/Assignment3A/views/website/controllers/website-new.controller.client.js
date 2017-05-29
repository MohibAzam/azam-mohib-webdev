(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var vm = this;
        vm.userId = $routeParams['userId'];

        // event handlers
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = websiteService.findAllWebsitesForUser(vm.userId);
        }
        init();

        // implementation
        function createWebsite(website) {
            websiteService.createWebsite(vm.userId, website);
            $location.url('/user/' + vm.userId + '/website');
            vm.message = "Website " + website.name + " has been created!";
        }
    }
})();