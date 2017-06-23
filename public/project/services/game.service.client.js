/**
 * Created by mohib on 6/20/2017.
 */
(function () {
    angular
        .module('MioDB')
        .factory('gameService', gameService);


    function gameService($http) {

        var api = {
            createGame: createGame,
            findGameById: findGameById,
            //findGameByApiId: findGameByApiId,
            updateGame: updateGame,
            deleteGame: deleteGame
        };

        return api;

        function createGame(game) {
            var url = '/api/mioDB/game';
            return $http.post(url, game)
                .then(function (response) {
                    console.log('returning response data');
                    console.log(response.data);
                    return response.data;
                });
        }

        function findGameById(gameId) {
            var url = '/api/mioDB/game/' + gameId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        /*
        function findGameByApiId(apiId) {
            var url = '/api/mioDB/game?apiId=' + apiId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        */

        function updateGame(gameId, game) {
            var url = '/api/mioDB/game/' + gameId;
            return $http.put(url, game)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteGame(gameId) {
            var url = '/api/mioDB/game/' + gameId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();