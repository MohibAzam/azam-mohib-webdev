(function () {
    angular
        .module('MioDB')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService) {
        var vm = this;

        var userId = currentUser._id;

        function init() {
            renderUser(currentUser);
        }
        init();
        function renderUser(user) {
            vm.user = user;
        }

        vm.logout = logout;
        vm.addComment = addComment;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url = '/login';
                });
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
                .then(function () {
                    $location.url = '/profile';
                });
        }
    }
})();