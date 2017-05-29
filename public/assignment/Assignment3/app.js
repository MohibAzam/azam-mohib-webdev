/*
(function () {
    angular
    //The array you see here is basically the list of
    //extra dependencies/libraries to use.
        .module('WAM', ['ngRoute'])
        .config(configuration);

    //$routeProvider is a provider from ngRoute
    //containing functions that help with routing
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<h1>home page</h1>'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })

    }
})();
*/

(function () {
    angular
        .module('WAM', ['ngRoute']);
})();