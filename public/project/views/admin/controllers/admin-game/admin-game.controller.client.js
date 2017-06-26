(function () {
    angular
        .module('MioDB')
        .controller('AdminGameController', adminGameController);

    function adminGameController($location, gameService) {
        var vm = this;

        function init() {
            gameService
                .findAllGames()
                .then(function (games) {
                    vm.games = games;
                });
        }

        init();

        vm.deleteGame = deleteGame;

        function deleteGame(gameId) {
            gameService
                .deleteGame(gameId)
                .then(function (response) {
                    $location.url('/admin/game');
                });
        }
    }
})();