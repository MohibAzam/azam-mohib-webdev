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

            if (user === undefined || (!(user.username && user.password && user.password2))) {
                vm.error = "You must fill in the Username and Password fields";
                return;
            }

            if (user.password !== user.password2) {
                vm.error = "Passwords must match";
                return;
            }

            var pw = user.password;

            console.log(user.username);



            /*
            var found = userService.findUserByUsername(user.username)
                .then(handleFound);

            function handleFound(found) {
                console.log('got found:' + found);
                if (found === user.username) {
                    vm.error = "Username is not available";
                }
                else {
                    var finalUser = {
                        username: user.username,
                        password: pw
                    };
                    console.log(finalUser);
                    userService.createUser(finalUser)
                        .then(moveOnRegister);
                }
            }
            */

            var found = userService.findUserByUsername(user.username)
                .then(function (found) {
                    console.log('this is what was found');
                    console.log(found);
                    if (found === null) {
                        moveOn();
                    }
                    else if (found.username === user.username) {
                        vm.error = "Username is not available";
                        return;
                    }
                    else {
                        moveOn();
                    }
                });

            function moveOn() {
                var finalUser = {
                    username: user.username,
                    password: pw
                };
                console.log(finalUser);
                userService
                    .register(finalUser)
                    .then(moveOnRegister);

                function moveOnRegister(user) {
                    console.log('moving');
                    console.log(user);
                    $location.url('/profile');
                }
            }
        }
    }
})();