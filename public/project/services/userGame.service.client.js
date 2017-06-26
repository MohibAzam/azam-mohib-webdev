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
            findSpecUserGameForUser: findSpecUserGameForUser,
            findUserGamesForUser: findUserGamesForUser,
            findAllUserGames: findAllUserGames,
            updateUserGame: updateUserGame,
            deleteUserGame: deleteUserGame,
            deleteUserGamesForUser: deleteUserGamesForUser
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

        function findSpecUserGameForUser(userId, gameId) {
            var url = "/api/mioDB/user/" + userId + "/userGame/" + gameId;
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

        function findAllUserGames() {
            var url = '/api/mioDB/admin/usergame';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUserGame(userGameId, userGame) {
            var url =  "/api/mioDB/userGame/" + userGameId;
            return $http.put(url, userGame)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUserGame(userGameId) {
            var url = "/api/mioDB/userGame/" + userGameId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUserGamesForUser(userId) {
            var url = "/api/mioDB/user/" + userId + "/userGame";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();