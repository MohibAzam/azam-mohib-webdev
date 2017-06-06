(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);
    
    function websiteService() {

        //Collection of websites to use
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        //The api we'll be using in this service
        var api = {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        return api;

        //A function to create a website from the given Id and website
        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            website.created = new Date();
            website.updated = new Date();
            websites.push(website);
        }

        //Update the website of the given Id
        //Using the material from the given (incomplete) website
        function updateWebsite(websiteId, website) {
            var oldSite = findWebsiteById(websiteId);
            var index = websites.indexOf(oldSite);
            website._id = oldSite._id;
            website.created = oldSite.created;
            website.updated = new Date();
            website.developerId = oldSite.developerId;
            websites[index] = website;
        }

        //Delete the website of the given Id
        function deleteWebsite(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });
            var index = websites.indexOf(website);
            websites.splice(index, 1);
        }

        //Find a Website of the given Id
        function findWebsiteById(websiteId) {
            return websites.find(function (website) {
                return website._id === websiteId;
            });
        }

        //Find all of the Websites created by the given User
        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/" + userId + '/website';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();