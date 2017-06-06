(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

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
            var url = "/api/assignment/user/" + userId + "/website"
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        //Update the website of the given Id
        //Using the material from the given (incomplete) website
        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        //Delete the website of the given Id
        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //Find a Website of the given Id
        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
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