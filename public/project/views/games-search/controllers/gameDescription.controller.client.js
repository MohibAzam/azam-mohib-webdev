(function () {
    angular
        .module('MioDB')
        .controller('GameDescriptionController', gameDescriptionController);

    function gameDescriptionController(currentUser, gameService, userService, $location, $routeParams) {
        var gameId = $routeParams['gameId'];
        var vm = this;

        function init() {
            if (currentUser) {
                vm.user = currentUser;
                console.log(vm.user);
            }
            gameService
                .findGameById(gameId)
                .then(function (game) {
                    console.log(game);
                    vm.game = game;
                });
        }

        init();

        vm.addToGameList = addToGameList;
        vm.addToWishList = addToWishList;
        vm.addComment = addComment;

        function addToGameList() {
            /*
            var newUser = vm.user;
            for (var game in newUser.gameList) {
                var checkedGame = newUser.gameList[game];
                if (checkedGame.game._id === vm.game._id) {
                    vm.message = "This game is already on your gamelist!";
                    return;
                }
            }
            newUser.wishlist.reverse();
            newUser.wishlist.push(gameObject);
            newUser.wishlist.reverse();
            console.log(newUser);
            userService
                .updateUser(currentUser._id, newUser)
                .then(function (response) {
                    vm.message = "Game has been added to your gamelist!"
                });
            */
        }

        function addToWishList() {
            var newUser = vm.user;
            for (var game in newUser.wishList) {
                var checkedGame = newUser.wishList[game];
                if (checkedGame._id === vm.game._id) {
                    vm.message = "This game is already on your wishlist!";
                    return;
                }
            }
            var gameObject = {
                gameName: vm.game.gameName,
                gameCover: vm.game.gameCover,
                gameId: vm.game._id
            };
            newUser.wishlist.reverse();
            newUser.wishlist.push(gameObject);
            newUser.wishlist.reverse();
            userService
                .updateUser(currentUser._id, newUser)
                .then(function (response) {
                    console.log(currentUser);
                    vm.message = "Game has been added to your wishlist!";
                    vm.user = currentUser;
                    userService
                        .findUserById(currentUser._id)
                        .then(function (user) {
                            console.log(user);
                            $location.url('/game/' + gameId);
                        });
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