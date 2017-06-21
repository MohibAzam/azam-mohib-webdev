/**
 * Created by mohib on 6/20/2017.
 */
(function () {
    angular
        .module('MioDB')
        .factory('userGameService', userGameService);

    function userGameService($http) {
        var api = {
            createUserGame: createUserGame,
            findUserGameById: findUserGameById,
            findUserGamesForUser: findUserGamesForUser,
            updateUserGame: updateUserGame,
            deleteUserGame: deleteUserGame
        };

        return api;

        function createUserGame(userId, userGame) {
            var url = "/api/mioDB/user/" + userId + "/userGame";
            return $http.post(url, userGame)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserGameById(userGameId) {
            var url = "/api/mioDB/userGame/" + userGameId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserGamesForUser(userId) {
            var url = "/api/mioDB/user/" + userId + "/userGame";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUserGame(userGameId, userGame) {
            var url =  "/api/mioDB/userGame" + userGameId;
            return $http.put(url, userGame)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUserGame(userGameId) {
            var url = "/api/mioDB/userGame" + userGameId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();