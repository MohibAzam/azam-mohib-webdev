/**
 * Created by mohib on 6/17/2017.
 */

(function () {
    angular
        .module('MioDB')
        .controller('loginController', loginController);

    function loginController($location, $routeParams, userService) {
        var vm = this;
        vm.linkBack = true;

        var error = $routeParams['errMsg'];

        if (error === '1') {
            vm.error = "You must be logged in to do that";
        }

        vm.handleBack = function() {
            $location.url('/home');
        };

        vm.login = function(username, password) {
            if (!(username && password)) {
                vm.error = "Please fill in both the username and the password fields";
                return;
            }
            else {
                userService
                    .login(username, password)
                    .then(login, handleError);
            }

            function login(found) {
                if (found !== null) {
                    console.log(found._id);
                    $location.url('/home');
                }
                else {
                    vm.error = "Invalid credentials, please try again.";
                }
            }

            function handleError(error) {
                vm.error = "Invalid credentials, please try again";
            }

        };

        vm.register = function(username, password, password2) {
            console.log('function call');
            if (!(username && password && password2)) {
                vm.error = "Please fill in all of the provided fields";
                return;
            }
            if (!(password === password2)) {
                vm.error = "Provided passwords do not match";
                return;
            }
            userService.findUserByUsername(username)
                .then(function (found) {
                    if (found === null || found.username !== username) {
                        finishRegistration();
                    }
                    else {
                        vm.error = "The username is already taken!";
                        return;
                    }
                });
            function finishRegistration() {
                var finalUser = {
                    username: username,
                    password: password
                };

                userService
                    .register(finalUser)
                    .then(function (response) {
                        $location.url('/home');
                    });
            }
        }
    }
})();