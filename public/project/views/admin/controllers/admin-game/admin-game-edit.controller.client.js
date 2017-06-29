(function () {
    angular
        .module('MioDB')
        .controller('AdminGameEditController', adminGameEditController);

    function adminGameEditController(currentUser, $location, $routeParams, gameService) {
        var vm = this;
        var gameId = $routeParams['gameId'];
        vm.user = currentUser;
        vm.linkBack = true;

        function init() {
            gameService
                .findGameById(gameId)
                .then(function (game) {
                    vm.game = game;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.updateGame = updateGame;
        vm.deleteGame = deleteGame;

        function handleBack() {
            $location.url('/admin/game');
        }

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