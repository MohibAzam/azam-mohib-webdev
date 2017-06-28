(function () {
    angular
        .module('MioDB')
        .controller('profileEditController', profileEditController);

    function profileEditController(currentUser, $location, userService) {
        var vm = this;

        var userId = currentUser._id;
        vm.linkBack = true;

        function init() {
            renderUser(currentUser);
        }
        init();
        function renderUser(user) {
            vm.user = user;
        }

        vm.handleBack = handleBack;
        vm.logout = logout;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function handleBack() {
            $location.url('/profile/' + userId);
        }


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(userId, user)
                .then(function () {
                    vm.message = "Your changes have been saved!";
                });
        }

        function deleteUser() {
            userService.deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                });
        }
    }
})();