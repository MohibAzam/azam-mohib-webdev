/**
 * Created by mohib on 6/9/2017.
 */
(function () {
    angular
        .module('MioDB')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider

            .when('/test', {
                templateUrl: 'testingGround/apiTest.view.client.html',
                controller: 'testController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login-page.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .otherwise({redirectTo: '/test'});
    }
})();