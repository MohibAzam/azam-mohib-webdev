(function () {
    angular
        .module('MioDB')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {
        var vm = this;
        console.log(currentUser._id);

        vm.linkBack = true;

        var userId = $routeParams['userId'];
        vm.userId = userId;
        console.log(userId);
        vm.loggedInUser = currentUser;

        vm.handleBack = function () {
            $location.url('/home');
        };

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
            else {
                checkIfFollowing();
            }
        }

        function checkIfFollowing() {
            var followingList = currentUser.following;
            var resultInd = followingList.indexOf(vm.user.username);
            if (resultInd === -1) {
                vm.notFollowing = true;
            }
            else {
                vm.following = true;
            }
        }

        init();

        vm.logout = logout;
        vm.addComment = addComment;
        vm.redirectTo = redirectTo;
        vm.follow = follow;
        vm.unFollow = unFollow;
        vm.findUser = findUser;

        function logout() {
            userService
                .logout()
                .then(function (response) {
                    moveOn();
                });

            function moveOn() {
                $location.url('/login');
            }
        }

        function addComment(comment) {
            var date = new Date();
            date = date.toUTCString();
            var message = {username: currentUser.username, time: date, message: comment};
            var updatedUser = vm.user;
            updatedUser.comments.reverse();
            updatedUser.comments.push(message);
            updatedUser.comments.reverse();
            userService
                .updateUser(userId, updatedUser)
                .then(function (response) {
                    $location.url('/profile/' + userId);
                });
        }

        function redirectTo(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    $location.url('/profile/' + user._id);
                });
        }

        function follow() {
            var newUser = currentUser;
            newUser.following.push(vm.user.username);
            userService
                .updateUser(currentUser._id, newUser)
                .then(function (response) {
                    vm.following = true;
                    vm.notFollowing = false;
                    vm.message = "You are now following " + vm.user.username;
                });
        }

        function unFollow() {
            var newUser = currentUser;
            var userInd = newUser.following.indexOf(vm.user.username);
            newUser.following.splice(userInd, 1);
            userService
                .updateUser(currentUser._id, newUser)
                .then(function (response) {
                    vm.following = false;
                    vm.notFollowing = true;
                    vm.message = "You've unfollowed " + vm.user.username;
                });
        }

        function findUser(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    if (user) {
                        $location.url('/profile/' + user._id);
                    }
                    else {
                        vm.error = "User " + username + " was not found";
                    }
                });
        }
    }
})();