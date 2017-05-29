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

        //Initialize the websites owned by the user
        function init() {
            vm.websites = websiteService.findAllWebsitesForUser(vm.userId);
        }
        init();

        //Create a new website based on the info provided
        //in the incomplete website
        function createWebsite(website) {
            websiteService.createWebsite(vm.userId, website);
            $location.url('/user/' + vm.userId + '/website');
            vm.message = "Website " + website.name + " has been created!";
        }
    }
})();