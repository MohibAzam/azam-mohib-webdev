(function () {
    angular
        .module('MioDB')
        .controller('AdminController', adminController);

    function adminController(currentUser, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

        vm.handleBack = handleBack;
        function handleBack() {
            $location.url('/home');
        }

    }
})();