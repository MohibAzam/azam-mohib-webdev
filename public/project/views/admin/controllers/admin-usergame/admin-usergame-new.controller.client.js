(function () {
    angular
        .module('MioDB')
        .controller('AdminUsergameNewController', adminUserGameNewController);

    function adminUserGameNewController(currentUser, $location, $routeParams, userGameService) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

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