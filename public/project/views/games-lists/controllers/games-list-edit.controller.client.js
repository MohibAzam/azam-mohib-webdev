/**
 * Created by mohib on 6/22/2017.
 */
(function () {
    angular
        .module('MioDB')
        .controller('GameListEditController', gameListEditController);

    function gameListEditController(currentUser, $location, userService, userGameService, $routeParams) {
        var vm = this;
        console.log(currentUser._id);
        vm.linkBack = true;

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
                .findUserGameById(userGameId)
                .then(function (game) {
                    vm.game = game;
                    console.log(game);
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.updateGame = updateGame;

        function handleBack() {
            $location.url('/profile/' + userId + '/gamelist');
        }

        function updateGame(newUserGame) {
            if (newUserGame.rating) {
                newUserGame.rating.castToNumber;
            }
            console.log(newUserGame);
            userGameService
                .updateUserGame(userGameId, newUserGame)
                .then(function (response) {
                    vm.message = "Your changes have been saved!";
                });
        }

    }
})();