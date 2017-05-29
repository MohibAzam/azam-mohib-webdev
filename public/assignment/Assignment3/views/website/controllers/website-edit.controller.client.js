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

        //Initialize the websites owned by the user
        //and the website currently being edited
        function init() {
            vm.websites = websiteService.findAllWebsitesForUser(vm.userId);
            vm.website = websiteService.findWebsiteById(vm.websiteId);
        }
        init();

        //Update the website based on the information provided
        //in the incomplete website
        function updateWebsite(website) {
            websiteService.updateWebsite(vm.websiteId, website);
            $location.url('/user/' + vm.userId + '/website');
            vm.message = "Website " + website.name + " has been updated!";
        }

        //Delete the current website
        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + vm.userId + '/website');
            vm.message = "The website has been deleted!";
        }
    }
})();