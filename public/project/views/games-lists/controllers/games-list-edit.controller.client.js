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
        var userGameId = $routeParams['userGameId'];
        vm.userId = userId;
        console.log(userId);
        vm.loggedInUser = currentUser;

        function init() {
            userService
                .findUserById(userId)
                .then(function (user) {
                    renderUser(user);
                    setupGame();
                });
        }

        function renderUser(user) {
            console.log(user);
            vm.user = user;
        }

        function setupGame() {
            userGameService
                .findUserGameById(currentUser._id)
                .then(function (game) {
                    vm.game = game;
                });
        }

        init();

        vm.updateGame = updateGame;

        function updateGame(newUserGame) {
            userGameService
                .updateGame(userGameId, newUserGame)
                .then(function (response) {
                    vm.message = "Your changes have been saved!";
                });
        }

    }
})();