(function () {
    angular
        .module('MioDB')
        .controller('AdminUserGameController', adminUserGameController);

    function adminUserGameController($location, userGameService) {
        var vm = this;

        function init() {
            userGameService
                .findAllUserGames()
                .then(function (userGames) {
                    vm.userGames = userGames;
                });
        }

        init();

        vm.deleteUserGame = deleteUserGame;

        function deleteUserGame(userGameId) {
            userGameService
                .deleteUserGame(userGameId)
                .then(function (response) {
                    $location.url('/admin/usergame');
                });
        }
    }
})();