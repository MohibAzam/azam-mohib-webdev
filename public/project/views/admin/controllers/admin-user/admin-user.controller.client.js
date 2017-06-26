(function () {
    angular
        .module('MioDB')
        .controller('AdminUserController', adminUserController);

    function adminUserController($location, userService) {
        var vm = this;

        function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    vm.users = users;
                });
        }

        init();

        vm.deleteUser = deleteUser;

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function (response) {
                    $location.url('/admin/user');
                });
        }
    }
})();