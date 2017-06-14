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

        //initialize the websites for the given user
        websiteService.findAllWebsitesForUser(vm.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
        }

        //Create a new website based on the info provided
        //in the incomplete website
        function createWebsite(website) {
            websiteService.createWebsite(vm.userId, website)
                .then(function (website) {
                    $location.url('/user/' + vm.userId + '/website');
                    vm.message = "Website " + website.name + " has been created!";
                })
                /*
                .error(function (website) {
                    vm.message = "Error: Website " + website.name + " failed to be created";
                });
                */
        }
    }
})();