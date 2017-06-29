(function () {
    angular
        .module('MioDB')
        .controller('AdminUsergameNewController', adminUserGameNewController);

    function adminUserGameNewController(currentUser, $location, $routeParams, userGameService) {
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
        vm.createUserGame = createUserGame;

        function handleBack() {
            $location.url('/admin/usergame');
        }

        function createUserGame(newUserGame) {
            userGameService
                .createUserGame(newUserGame)
                .then(function (response) {
                    $location.url('/admin/usergame');
                });
        }
    }
})();