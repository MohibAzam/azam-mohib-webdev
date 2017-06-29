(function () {
    angular
        .module('MioDB')
        .controller('AdminUserEditController', adminUserEditController);

    function adminUserEditController(currentUser, $location, $routeParams, userService) {
        var vm = this;
        var userId = $routeParams['userId'];
        vm.loggedInUser = currentUser;
        vm.linkBack = true;

        function init() {
            userService
                .findUserById(userId)
                .then(function (user) {
                    vm.user = user;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function handleBack() {
            $location.url('/admin/user');
        }

        function updateUser(newUser) {
            userService
                .updateUser(userId, newUser)
                .then(function (response) {
                    vm.message = "The user has been updated!";
                });
        }

        function deleteUser() {
            userService
                .deleteUser(userId)
                .then(function (response) {
                    $location.url('/admin/user');
                });
        }
    }
})();