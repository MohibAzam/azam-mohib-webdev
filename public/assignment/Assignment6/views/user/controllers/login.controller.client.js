(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        //Instantiate the model itself
        var vm = this;

        //Login the given user (whose credentials are provided)
        //If their credentials are invalid, deny them access
        vm.login = function(user) {

            userService
                //.findUserByCredentials(user.username, user.password)
                .login(user.username, user.password)
                .then(login, handleError);

            function login (found) {
                if(found !== null) {
                    $location.url('/profile');
                }
                else {
                    vm.message = "Username " + user.username + " not found, please try again";
                }
            }

            function handleError (error) {
                vm.message = "Username " + user.username + " not found, please try again";
            }
        };
    }
})();