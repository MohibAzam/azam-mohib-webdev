(function () {
    angular
        .module('MioDB')
        .controller('AdminGameEditController', adminGameEditController);

    function adminGameEditController($location, $routeParams, gameService) {
        var vm = this;
        var gameId = $routeParams['gameId'];

        function init() {
            gameService
                .findGameById(gameId)
                .then(function (game) {
                    vm.game = game;
                });
        }

        init();

        vm.updateGame = updateGame;
        vm.deleteGame = deleteGame;

        function updateGame(newGame) {
            gameService
                .updateGame(gameId, newGame)
                .then(function (response) {
                   vm.message = "The game has been updated!";
                });
        }

        function deleteGame() {
            gameService
                .deleteGame(gameId)
                .then(function (response) {
                    $location.url('/admin/game');
                });
        }


    }
})();