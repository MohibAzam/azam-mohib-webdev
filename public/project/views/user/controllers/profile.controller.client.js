(function () {
    angular
        .module('MioDB')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {
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

        vm.logout = logout;
        vm.addComment = addComment;
        vm.redirectTo = redirectTo;

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
    }
})();