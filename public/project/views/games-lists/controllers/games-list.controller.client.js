/**
 * Created by mohib on 6/22/2017.
 */
(function () {
    angular
        .module('MioDB')
        .controller('GameListController', gameListController);

    function gameListController(currentUser, $location, userService, userGameService, $routeParams) {
        var vm = this;

        vm.linkBack = true;

        var userId = $routeParams['userId'];
        vm.userId = userId;
        vm.loggedInUser = currentUser;

        function init() {
            userService
                .findUserById(userId)
                .then(function (user) {
                    renderUser(user);
                    currentAndViewing();
                    setupUserGames();
                });
        }

        function renderUser(user) {
            console.log(user);
            vm.user = user;
        }

        function currentAndViewing() {
            if (currentUser._id === userId) {
                vm.showPersonal = 'true';
                console.log(vm.showPersonal);
            }
        }

        function setupUserGames() {
            userGameService
                .findUserGamesForUser(userId)
                .then(function (games) {
                    vm.games = games;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.deleteUserGame = deleteUserGame;
        vm.clearGameList = clearGameList;

        function handleBack() {
            $location.url('/profile/' + userId);
        }

        function clearGameList() {
            userGameService
                .deleteUserGamesForUser(userId)
                .then(function (response) {
                    var newUser = vm.user;
                    newUser.gamelist = new Array();
                    userService
                        .updateUser(vm.user._id, newUser)
                        .then(function (response) {
                            $location.url('/profile/' + userId + '/gamelist');
                            vm.message = "Game list has been emptied";
                        });
                });
        }

        function deleteUserGame(userGame) {
            var userGameId = userGame._id;
            var gameId = userGame.gameId;
            userGameService
                .deleteUserGame(userGameId)
                .then(function (response) {
                    cleanUser();
                });
        }

        function cleanUser() {
            var newUser = vm.user;
            var ind = newUser.gamelist.indexOf(gameId);
            newUser.gamelist.splice(ind, 1);
            userService
                .updateUser(vm.user._id, newUser)
                .then(function (response) {
                    $location.url('/profile/' + userId + '/gamelist');
                    vm.message = userGame.gameName + " has been removed";
                });
        }

    }
})();