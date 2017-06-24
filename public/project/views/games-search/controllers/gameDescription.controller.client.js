(function () {
    angular
        .module('MioDB')
        .controller('GameDescriptionController', gameDescriptionController);

    function gameDescriptionController(currentUser, gameService, userService, userGameService, $location, $routeParams) {
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
                    checkIfOnWishlist();
                });
        }

        function checkIfOnWishlist() {
            var wishlist = currentUser.wishlist;
            console.log(wishlist);
            var gameObject = {
                gameName: vm.game.gameName,
                gameCover: vm.game.gameCover,
                _id: vm.game._id
            };
            var resultInd = -1;
            for (var game in wishlist) {
                if (wishlist[game].gameName === gameObject.gameName &&
                    wishlist[game].gameCover === gameObject.gameCover &&
                    wishlist[game]._id === gameObject._id) {
                    resultInd = game;
                    break;
                }
            }
            if (resultInd === -1) {
                vm.notOnWishlist = true;
            }
            else {
                vm.onWishlist = true;
            }
        }

        init();

        vm.addToGameList = addToGameList;
        vm.removeFromGamesList = removeFromGamesList;
        vm.addToWishList = addToWishList;
        vm.removeFromWishList = removeFromWishList;
        vm.addComment = addComment;
        vm.redirectTo = redirectTo;

        function addToGameList() {
            var gameObject = {
                gameName: vm.game.gameName,
                gameCover: vm.game.gameCover,
                _id: vm.game._id,
                user: vm.user._id
            };
            userGameService
                .createUserGame(gameObject)
                .then(function (userGame) {
                    var userGameId = userGame._id;
                    var newUser = vm.user;
                    newUser.gamelist.push(userGameId);
                    userService
                        .updateUser(currentUser._id, newUser)
                        .then(function (response) {
                            console.log(currentUser);
                            vm.message = "Game has been added to your wishlist!";
                            vm.user = currentUser;
                            vm.notOnGamesList = false;
                            vm.onGamesList = true;
                        });
                });
        }

        function removeFromGamesList() {
            var userId = vm.user._id;
            userGameService
                .findSpecUserGameForUser(userId, gameId)
                .then(function (userGame) {
                    var userGameId = userGame._id;
                    var newUser = vm.user;
                    var ind = newUser.gamelist.indexOf(userGameId);
                    newUser.gamelist.splice(userGameId, 1);
                    userService
                        .updateUser(currentUser._id, newUser)
                        .then(function (response) {
                            userGameService
                                .deleteUserGame(userGameId)
                                .then(function (res) {
                                    console.log(currentUser);
                                    vm.message = "Game has been added to your wishlist!";
                                    vm.notOnGamesList = true;
                                    vm.onGamesList = false;
                                });
                        });
                })
        }

        function addToWishList() {
            var newUser = vm.user;
            var gameObject = {
                gameName: vm.game.gameName,
                gameCover: vm.game.gameCover,
                _id: vm.game._id
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
                    vm.notOnWishlist = false;
                    vm.onWishlist = true;
                });
        }

        function removeFromWishList() {
            var newUser = vm.user;
            var gameObject = {
                gameName: vm.game.gameName,
                gameCover: vm.game.gameCover,
                _id: vm.game._id
            };
            var resultInd = -1;
            for (var game in newUser.wishlist) {
                if (newUser.wishlist[game].gameName === gameObject.gameName &&
                    newUser.wishlist[game].gameCover === gameObject.gameCover &&
                    newUser.wishlist[game]._id === gameObject._id) {
                    resultInd = game;
                    break;
                }
            }
            if (resultInd !== -1) {
                newUser.wishlist.splice(resultInd, 1);
                userService
                    .updateUser(currentUser._id, newUser)
                    .then(function (response) {
                        console.log(currentUser);
                        vm.message = "Game has been added to your wishlist!";
                        vm.user = currentUser;
                        vm.notOnWishlist = true;
                        vm.onWishlist = false;
                    });
            }
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
                .updateGame(gameId, newGame)
                .then(function (response) {
                    //TODO: Set the url
                    $location.url('/game/' + gameId);
                    console.log(vm.game);
                })
        }

        function redirectTo(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    $location.url('/profile/' + user._id);
                });
        }

    }

})();