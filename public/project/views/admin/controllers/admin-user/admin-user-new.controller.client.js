(function () {
    angular
        .module('MioDB')
        .controller('AdminUserNewController', adminUserNewController);

    function adminUserNewController(currentUser, $location, $routeParams, userService) {
        var vm = this;
        var userId = $routeParams['userId'];
        vm.user = currentUser;
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