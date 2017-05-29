(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        //All instances of $scope (originally an input into loginController
        //have been replaced with instances of model
        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = userService.findUserByUsername(username);

            if (found !== null) {
                model.error = "Username is not available"
            }
            else {
                var user = {
                    username: username,
                    password: password
                };
                userService.createUser(user);
                $location.url('/user/' + user._id);
            }
        }
    }
})();
/**
 * Created by mohib on 5/22/2017.
 */
