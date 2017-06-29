(function () {
    angular
        .module('MioDB')
        .controller('GameDescriptionController', gameDescriptionController);

    function gameDescriptionController(currentUser, gameService, userService, userGameService, $location, $routeParams) {
        var gameId = $routeParams['gameId'];
        var vm = this;

        vm.linkBack = true;

        function init() {
            gameService
                .findGameById(gameId)
                .then(function (game) {
                    console.log(game);
                    vm.game = game;
                    setUpUserData();
                    if (currentUser._id) {
                        vm.user = currentUser;
                        console.log(vm.user);
                        checkIfOnWishlist();
                        checkIfOnGameList();
                    }
                });
        }

        function setUpUserData() {
            userGameService
                .findUserGameByGameId(gameId)
                .then(function (games) {
                    createUserStats(games);
                });
        }

        function createUserStats(games) {
            vm.numListed = games.length;
            vm.numBeaten = 0;
            vm.ratings = 0;
            vm.ratingSum = 0;
            for (var g in games) {
                var tempUg = games[g];
                if (tempUg.completionStatus &&
                    (tempUg.completionStatus === 'Beaten' ||
                    tempUg.completionStatus === 'Completed' ||
                    tempUg.completionStatus === 'Mastered')) {
                    vm.numBeaten++;
                }
                if (tempUg.rating) {
                    vm.ratings++;
                    vm.ratingSum += Number(tempUg.rating);
                    console.log(vm.ratingSum);
                }
            }
            if (vm.ratings > 0) {
                var quotient = vm.ratingSum / vm.ratings;
                vm.finalScore = vm.ratingSum / vm.ratings;
                vm.finalScore = vm.finalScore.toString().substring(0, 4);
                console.log(vm.finalScore);
            }
            else {
                vm.finalScore = "N/A";
            }
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

        function checkIfOnGameList() {
            var gamelist = currentUser.gamelist;
            console.log(gamelist);
            var resultInd = gamelist.indexOf(vm.game._id);
            if (resultInd === -1) {
                vm.notOnGamesList = true;
            }
            else {
                vm.onGamesList = true;
            }
        }

        init();

        vm.handleBack = handleBack;
        vm.addToGameList = addToGameList;
        vm.removeFromGamesList = removeFromGamesList;
        vm.addToWishList = addToWishList;
        vm.removeFromWishList = removeFromWishList;
        vm.addComment = addComment;
        vm.redirectTo = redirectTo;

        function handleBack() {
            $location.url('/search');
        }

        function addToGameList() {
            var gameObject = {
                gameName: vm.game.gameName,
                gameCover: vm.game.gameCover,
                gameId: vm.game._id,
                user: currentUser._id
            };
            console.log(gameObject);
            userGameService
                .createUserGame(currentUser._id, gameObject)
                .then(function (userGame) {
                    console.log(userGame);
                    var newUser = vm.user;
                    newUser.gamelist.push(vm.game._id);
                    userService
                        .updateUser(currentUser._id, newUser)
                        .then(function (response) {
                            console.log(response);
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
                                    vm.message = "Game has been removed from your gamelist!";
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
                        vm.message = "Game has been removed from your wishlist!";
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