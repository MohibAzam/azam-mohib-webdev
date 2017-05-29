(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams,
                                  websiteService,
                                  $location) {

        var vm = this;
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;

        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = websiteService.findAllWebsitesForUser(vm.userId);
            vm.website = websiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(vm.websiteId, website);
            $location.url('/user/' + vm.userId + '/website');
            vm.message = "Website " + website.name + " has been updated!";
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + vm.userId + '/website');
            vm.message = "The website has been deleted!";
        }
    }
})();