(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);

        model.updateUser = updateUser;

        function updateUser(firstName, lastName) {
            var user = {
                firstName: firstName,
                lastName: lastName
            };
            userService.updateUser(userId, user);
            $location.url('/user/' + userId);
        }
    }
})();