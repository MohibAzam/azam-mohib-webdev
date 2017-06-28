/**
 * Created by mohib on 6/22/2017.
 */
(function () {
    angular
        .module('MioDB')
        .controller('followingController', followingController);

    function followingController(currentUser, $location, userService, $routeParams) {
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

        init();

        vm.unFollow = unFollow;
        vm.redirectTo = redirectTo;

        function unFollow(username) {
            var newUser = currentUser;
            var userInd = newUser.following.indexOf(username);
            newUser.following.splice(userInd, 1);
            userService
                .updateUser(currentUser._id, newUser)
                .then(function (response) {
                    if (!(vm.showPersonal)) {
                        vm.following = false;
                        vm.notFollowing = true;
                    }
                    $location.url('/following/' + userId);
                    vm.message = "You've unfollowed " + vm.user.username;
                });
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