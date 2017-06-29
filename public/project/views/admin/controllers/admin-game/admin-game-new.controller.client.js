(function () {
    angular
        .module('MioDB')
        .controller('AdminGameNewController', adminGameNewController);

    function adminGameNewController(currentUser, $location, $routeParams, gameService) {
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
        vm.createGame = createGame;

        function handleBack() {
            $location.url('/admin/game');
        }

        function createGame(newGame) {
            console.log('made it here');
            gameService
                .createGame(newGame)
                .then(function (response) {
                    $location.url('/admin/game')
                });
        }

    }
})();