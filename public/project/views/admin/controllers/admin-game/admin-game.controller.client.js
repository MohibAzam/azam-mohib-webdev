(function () {
    angular
        .module('MioDB')
        .controller('AdminGameController', adminGameController);

    function adminGameController(currentUser, $location, gameService) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

        function init() {
            gameService
                .findAllGames()
                .then(function (games) {
                    vm.games = games;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.deleteGame = deleteGame;

        function handleBack() {
            $location.url('/admin');
        }

        function deleteGame(gameId) {
            gameService
                .deleteGame(gameId)
                .then(function (response) {
                    vm.message = "The game has been removed";
                    $location.url('/admin/game');
                });
        }
    }
})();