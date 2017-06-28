(function () {
    angular
        .module('MioDB')
        .controller('AdminUserController', adminUserController);

    function adminUserController(currentUser, $location, userService) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

        function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    vm.users = users;
                });
        }

        init();

        vm.handleBack = handleBack;
        vm.deleteUser = deleteUser;

        function handleBack() {
            $location.url('/admin');
        }

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function (response) {
                    vm.message = "The user has been deleted";
                    $location.url('/admin/user');
                });
        }
    }
})();