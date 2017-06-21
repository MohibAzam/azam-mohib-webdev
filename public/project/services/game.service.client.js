/**
 * Created by mohib on 6/20/2017.
 */
(function () {
    angular
        .module('MioDB')
        .factory('userService', userService);


    function gameService($http) {

        var api = {
            createGame: createGame,
            findGameById: findGameById,
            findGameByApiId: findGameByApiId,
            updateGame: updateGame,
            deleteGame: deleteGame
        }

        function createGame(game) {
            var url = '/api/mioDB/game';
            $http.post(url, game)
                .then(function (response) {
                    return response.data;
                });
        }

        function findGameById(gameId) {
            var url = '/api/mioDB/game/' + gameId;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findGameByApiId(apiId) {
            var url = '/api/mioDB/game?apiId=' + apiId;
            $http.get(url)
                .then(function (reponse) {
                    return response.data;
                });
        }

        function updateGame(gameId, game) {
            var url = '/api/mioDB/game/' + gameId;
            $http.put(url, game)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteGame(gameId) {
            var url = '/api/mioDB/game/' + gameId;
            $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();