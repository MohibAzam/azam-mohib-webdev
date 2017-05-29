(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        return {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime() + "";
            page.created = new Date();
            page.updated = new Date();
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var sitePages = [];
            for(var p in pages) {
                var page = pages[p];
                if (page.websiteId === websiteId) {
                    sitePages.push(page);
                }
            }
            return sitePages;
        }

        function updatePage(pageId, page) {
            var oldPage = findPageById(pageId);
            page._id = oldPage._id;
            page.websiteId = oldPage.websiteId;
            page.created = oldPage.created;
            page.updated = new Date();
            var index = pages.indexOf(oldPage);
            pages[index] = page;
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

    }
})();