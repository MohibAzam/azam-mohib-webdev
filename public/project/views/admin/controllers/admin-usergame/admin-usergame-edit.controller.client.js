(function () {
    angular
        .module('MioDB')
        .controller('AdminUsergameEditController', adminUserGameEditController);

    function adminUserGameEditController(currentUser, $location, $routeParams, userGameService) {
        var vm = this;
        var userGameId = $routeParams['userGameId'];
        vm.user = currentUser;
        vm.linkBack = true;

        function init() {
            userGameService
                .findUserGameById(userGameId)
                .then(function (userGame) {
                    vm.userGame = userGame;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.updateUserGame = updateUserGame;
        vm.deleteUserGame = deleteUserGame;

        function handleBack() {
            $location.url('/admin/usergame');
        }

        function updateUserGame(newUserGame) {
            userGameService
                .updateUserGame(userGameId, newUserGame)
                .then(function (response) {
                    vm.message = "The usergame has been updated!";
                });
        }

        function deleteUserGame() {
            userGameService
                .deleteUserGame(userGameId)
                .then(function (response) {
                    $location.url('/admin/usergame');
                });
        }
    }
})();