(function () {
    angular
        .module('MioDB')
        .controller('WishListController', WishListController);

    function WishListController(currentUser, $location, userService, $routeParams) {
        var vm = this;

        var userId = $routeParams['userId'];
        vm.userId = userId;

        vm.loggedInUser = currentUser;

        function init() {
            userService
                .findUserById(userId)
                .then(function (user) {
                    renderUser(user);
                    currentAndViewing();
                });
        }

        function renderUser(user) {
            console.log(user.wishlist);
            console.log(user);
            vm.user = user;
        }

        function currentAndViewing() {
            if (currentUser._id === userId) {
                vm.showPersonal = 'true';
                console.log(vm.showPersonal);
            }
        }

        init();

        vm.deleteWishList = deleteWishList;
        vm.deleteGame = deleteGame;

        function deleteWishList() {
            var newUser = vm.user;
            newUser.wishlist = new Array();
            userService
                .updateUser(userId, newUser)
                .then(function (response) {
                    vm.message = "The wishlist has been cleared";
                });
        }

        function deleteGame(game) {
            var newUser = vm.user;
            var gameInd = newUser.wishlist.indexOf(game);
            if (gameInd > -1) {
                newUser.wishlist.splice(gameInd, 1);
                userService
                    .updateUser(userId, newUser)
                    .then(function (response) {
                        vm.message = "Game deleted";
                    });
            }
        }
    }
})();