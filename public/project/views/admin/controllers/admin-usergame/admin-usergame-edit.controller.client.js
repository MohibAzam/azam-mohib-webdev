(function () {
    angular
        .module('MioDB')
        .controller('AdminUserGameEditController', adminUserGameEditController);

    function adminUserGameEditController($location, $routeParams, userGameService) {
        var vm = this;
        var userGameId = $routeParams['userGameId'];

        function init() {
            userGameService
                .findUserById(userGameId)
                .then(function (userGame) {
                    vm.userGame = userGame;
                });
        }

        init();

        vm.updateUserGame = updateUserGame;
        vm.deleteUserGame = deleteUserGame;

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