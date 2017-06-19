(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams,
                                  pageService,
                                  $location) {

        //Self-instantiation
        var vm = this;

        //Ids
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;

        // event handlers
        vm.createPage = createPage;

        //Initialize by getting the pages in the website
        pageService.findPagesByWebsiteId(vm.websiteId)
            .then(renderPages);

        function renderPages(pages) {
            vm.pages = pages;
        }

        //Create a new Page in the Website based on the given information
        function createPage(page) {
            if (page === undefined || !(page.name)) {
                vm.error = "You must provide a name for the page";
            }
            else {
                console.log(page);
                pageService.createPage(vm.websiteId, page)
                    .then(function (page) {
                        console.log('got callback');
                        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                        vm.page = "Page " + page.name + " has been created!";
                    });
            }
        }
    }
})();