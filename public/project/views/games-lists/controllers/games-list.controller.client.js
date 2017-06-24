/**
 * Created by mohib on 6/22/2017.
 */
(function () {
    angular
        .module('MioDB')
        .controller('GamesListController', gamesListController);

    function gamesListController(currentUser, $location, userService, userGameService, $routeParams) {
        var vm = this;
        console.log(currentUser._id);

        var userId = $routeParams['userId'];
        vm.userId = userId;
        console.log(userId);
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
                .findUserGamesForUser(currentUser._id)
                .then(function (games) {
                    vm.games = games;
                });
        }

        init();

        vm.deleteUserGame = deleteUserGame;
        vm.clearGameList = clearGameList;

        function clearGameList() {
            userGameService
                .deleteUserGamesForUser(userId)
                .then(function (response) {
                    $location.url('/profile/' + userId + '/gamelist/' + userGameId);
                    vm.message = "Game list has been emptied";
                });
        }

        function deleteUserGame(userGame) {
            var userGameId = userGame._id;
            userGameService
                .deleteUserGame(userGameId)
                .then(function (response) {
                    $location.url('/profile/' + userId + '/gamelist/' + userGameId);
                    vm.message = userGame.gameName + " has been removed";
                });
        }

    }
})();