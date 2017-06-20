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
            userService
                .addComment(userId, userId, comment)
                .then(function () {
                    $location.url = '/profile';
                });
        }
    }
})();