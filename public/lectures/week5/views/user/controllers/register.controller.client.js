(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);
    
    function registerController($location, userService) {

        var vm = this;

        // event handler
        vm.register = register;

        //Handle the registration of a new user,
        //checking to make sure their username is unique
        //and their passwords match
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
                userService.createUser(finalUser)
                    .then(function (user) {
                        $location.url('/user/' + finalUser._id);
                    });

            }
        }
    }
})();