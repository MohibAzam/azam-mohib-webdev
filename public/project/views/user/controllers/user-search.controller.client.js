(function () {
    angular
        .module('MioDB')
        .controller('UserSearchController', userSearchController);

    function userSearchController(currentUser, $location, userService, $routeParams) {
        var model = this;
        model.user = currentUser;

        model.findUser = findUser;

        function findUser(username) {
            userService
                .findUserByUsername(username)
                .then(function (user) {
                    if (user) {
                        $location.url('/profile/' + user._id);
                    }
                    else {
                        model.error = "User " + username + " was not found";
                    }
                });
        }

    }

})();
