(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        //The api for the PageService
        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        //Create a new Page for the given website's Id,
        //whose material is taken from the given (incomplete) page
        function createPage(websiteId, page) {
            var url = '/api/assignment/website/' + websiteId + '/page';
            console.log(url);
            return $http.post(url, page)
                .then(function (response) {
                    console.log('returning data');
                    return response.data
                });
        }

        //Find all of the pages in the given website's Id
        function findPagesByWebsiteId(websiteId) {
            var url = "/api/assignment/website/" + websiteId + '/page';
            console.log('url made: ' + url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //Update the given page with the material from the given incomplete page
        function updatePage(pageId, page) {
            var url = "/api/assignment/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        //Find a Page whose Id matches the given Id
        function findPageById(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //Delete the Page of the given Id
        function deletePage(pageId) {
            var url = "/api/assignment/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();