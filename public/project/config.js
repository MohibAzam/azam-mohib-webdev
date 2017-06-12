/**
 * Created by mohib on 6/9/2017.
 */
(function () {
    angular
        .module('MioDB')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider

            .when('/', {
                templateUrl: 'testingGround/apiTest.view.client.html',
                controller: 'testController',
                controllerAs: 'model'
            })
            .otherwise({redirectTo: '/'});
    }
})();