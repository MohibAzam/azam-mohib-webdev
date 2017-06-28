(function () {
    angular
        .module('MioDB')
        .controller('AdminUsergameController', adminUserGameController);

    function adminUserGameController(currentUser, $location, userGameService) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

        function init() {
            userGameService
                .findAllUserGames()
                .then(function (userGames) {
                    vm.userGames = userGames;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.deleteUserGame = deleteUserGame;

        function handleBack() {
            $location.url('/admin');
        }

        function deleteUserGame(userGameId) {
            userGameService
                .deleteUserGame(userGameId)
                .then(function (response) {
                    vm.message = "The usergame has been deleted";
                    $location.url('/admin/usergame');
                });
        }
    }
})();