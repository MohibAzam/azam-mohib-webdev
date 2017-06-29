(function () {
    angular
        .module('MioDB')
        .controller('AdminUserNewController', adminUserNewController);

    function adminUserNewController(currentUser, $location, $routeParams, userService) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

        vm.handleBack = handleBack;
        vm.createUser = createUser;

        function handleBack() {
            $location.url('/admin/user');
        }

        function createUser(newUser) {
            userService
                .createUser(newUser)
                .then(function (response) {
                    $location.url('/admin/user');
                });
        }
    }
})();