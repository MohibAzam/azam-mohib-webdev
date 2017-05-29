(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {

        var vm = this;

        // event handlers
        vm.register = register;

        // implementation
        function register(user) {

            if(user.password !== user.password2) {
                vm.error = "Passwords must match";
                return;
            }

            var found = userService.findUserByUsername(user.username);

            if(found !== null) {
                vm.error = "Username is not available";
            } else {
                var finalUser = {
                    username: user.username,
                    password: user.password
                };
                // vm.message = user;
                userService.createUser(finalUser);
                $location.url('/user/' + finalUser._id);

            }
        }
    }
})();