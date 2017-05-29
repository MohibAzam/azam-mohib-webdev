(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        //All instances of $scope (originally an input into loginController
        //have been replaced with instances of model
        var model = this;
        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);
    }
})();
