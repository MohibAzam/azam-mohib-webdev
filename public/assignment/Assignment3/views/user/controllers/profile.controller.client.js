(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        //Self-instantiation
        var vm = this;

        var userId = $routeParams['userId'];
        vm.user = userService.findUserById(userId);

        //event handler
        vm.updateUser = updateUser;

        //Update the user for the new changes given on their profile
        function updateUser(user) {
            userService.updateUser(userId, user);
            $location.url('/user/' + userId);
            vm.message = "The changes have been saved!"
        }
    }
})();