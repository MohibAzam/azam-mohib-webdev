(function () {
    angular
        .module('MioDB')
        .controller('gameDescriptionController', gameDescriptionController);

    function gameDescriptionController(currentUser, gameService, userService, $location, $routeParams) {
        var gameId = $routeParams['gameId'];
        var vm = this;

        function init() {
            if (currentUser) {
                vm.user = user;
            }
            gameService
                .findGameById(gameId)
                .then(function (game) {
                    vm.game = game;
                });
        }

        vm.addToGameList = addToGameList;
        vm.addToWishList = addToWishList;
        vm.addComment = addComment;

        function addToGameList() {

        }

        function addToWishList() {
            var newUser = vm.user;
            var ind = newUser.wishlist.indexOf(game);
            if (ind !== -1) {
                vm.message = "This game is already on your wishlist!";
                return;
            }
            newUser.wishlist.reverse();
            newUser.wishlist.push(vm.game);
            newUser.wishlist.reverse();
            userService
                .updateUser(currentUser._id, newUser)
                .then(function (response) {
                    vm.message = "Game has been added to your wishlist!"
                });
        }

        function addComment(comment) {
            var newGame = vm.game;
            var newComment = {
                username: vm.user.username,
                time: new Date().toUTCString(),
                message: comment
            };
            newGame.comments.reverse();
            newGame.comments.push(newComment);
            newGame.comments.reverse();
            gameService
                .updateGame(vm.gameId, newGame)
                .then(function (response) {
                    //TODO: Set the url
                    $location.url('...');
                })
        }

    }

})();