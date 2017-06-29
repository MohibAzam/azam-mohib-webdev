/**
 * Created by mohib on 6/25/2017.
 */
(function () {
    angular
        .module('MioDB')
        .controller('HomeController', homeController);

    function homeController(currentUser) {
        var model = this;
        model.user = currentUser;
    }
})();