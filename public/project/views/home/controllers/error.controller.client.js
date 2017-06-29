(function () {
    angular
        .module('MioDB')
        .controller('ErrorController', errorController);

    function errorController(currentUser, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.linkBack = true;

        vm.handleBack = handleBack;
        function handleBack() {
            $location.url('/home');
        }

    }
})();