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

            //var found = userService.findUserByCredentials(user.username, user.password);

            userService
                .findUserByCredentials(user.username, user.password)
                //handleError gets called if an error occurs
                //i.e. login function doesn't do anything
                .then(login, handleError);

            function handleError(error) {
                vm.message = "Username " + user.username + " not found, please try again";
            }

            function login(found) {
                if(found !== null) {
                    $location.url('/user/' + found._id);
                } else {
                }
            }
        };
    }
})();