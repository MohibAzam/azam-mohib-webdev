(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var vm = this;
        var userId = $routeParams['userId'];

        vm.user = userService.findUserById(userId);

        vm.updateUser = updateUser;

        function updateUser(user) {
            userService.updateUser(userId, user);
            $location.url('/user/' + userId);
            vm.message = "The changes have been saved!"
        }
    }
})();