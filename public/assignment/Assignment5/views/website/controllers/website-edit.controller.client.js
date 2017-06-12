(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var vm = this;

        //Initialize the user and website Ids
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;

        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        //initialize the websites for the given user
        websiteService.findAllWebsitesForUser(vm.userId)
            .then(renderWebsites);

        function renderWebsites(websites) {
            vm.websites = websites;
        }

        websiteService.findWebsiteById(vm.websiteId)
            .then(function (website) {
               vm.website = website;
            });

        //Update the website based on the information provided
        //in the incomplete website
        function updateWebsite(website) {
            websiteService.updateWebsite(vm.websiteId, website)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website');
                    vm.message = "Website " + website.name + " has been updated!";
                })
                /*
                .error(function (error) {
                    vm.message = "An error has occurred";
                });
                */
        }

        //Delete the current website
        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website');
                    vm.message = "The website has been deleted!";
                })
                /*
                .error(function (error) {
                    vm.message = "An error has occurred";
                });
                */
        }
    }
})();