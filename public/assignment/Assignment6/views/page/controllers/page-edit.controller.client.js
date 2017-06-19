(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams,
                                   pageService,
                                   $location) {

        //self-instantiation
        var vm = this;

        //Ids
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        //initialize the websites for the given user
        pageService.findPagesByWebsiteId(vm.websiteId)
            .then(renderPages);

        function renderPages(pages) {
            vm.pages = pages;
        }

        pageService.findPageById(vm.pageId)
            .then(function (page) {
                vm.page = page;
            });

        //Update the current page with the information in the given page
        function updatePage(page) {
            if (page === undefined || !(page.name)) {
                vm.error = "You must provide a name for the page";
            }
            else {
                pageService.updatePage(vm.pageId, page)
                    .then(function () {
                        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                        vm.message = "Page " + page.name + " has been updated!";
                    });
            }
        }

        //Delete the current page
        function deletePage() {
            pageService.deletePage(vm.pageId)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page');
                    vm.message = "The page has been deleted!";
                });
        }
    }
})();