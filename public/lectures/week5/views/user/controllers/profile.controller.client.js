(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        //Self-instantiation
        var vm = this;

        var userId = $routeParams['userId'];
        //vm.user = userService.findUserById(userId);
        //console.log(vm.user);

        /*
        var promise = userService.findUserById(userId);
        promise.then(function (response) {
            console.log(response)
        });
        */

        userService
            .findUserById(userId)
            //Continue to use .then here on the data that gets returned
            //by findUserById, since we don't know when we'll get back from them
            .then(renderUser);

        function renderUser (user) {
            model.user = user;
        }

            //event handler
        vm.updateUser = updateUser;

        function deleteUser(user) {
            userService.deleteUser(user._id)
                .then(function (user) {
                    $location.url('/login');
                })
                .error(function (user) {
                    vm.message = "An error has occurred";
                });
        }

        //Update the user for the new changes given on their profile
        function updateUser(user) {
            userService.createUser(user)
                .then(function (user) {
                    vm.message = "The changes have been saved!";
                })
                .error(function (user) {
                    vm.message = "An error has occurred";
                });
            /*
            userService.updateUser(userId, user);
            $location.url('/user/' + userId);
            vm.message = "The changes have been saved!"
            */
        }
    }
})();