(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);
    
    function loginController($location, userService) {

        var vm = this;

        vm.login = function(user) {

            var found = userService.findUserByCredentials(user.username, user.password);
            
            if(found !== null) {
                $location.url('/user/' + found._id);
                // $scope.message = "Welcome " + username;
            } else {
                vm.message = "Username " + user.username + " not found, please try again";
            }
        };
    }
})();