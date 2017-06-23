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
            .when('/profile/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile-edit', {
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/following/:userId', {
                templateUrl: 'views/user/templates/following-list.view.client.html',
                controller: 'followingController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/search', {
                templateUrl: 'views/games-search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/game/:gameId', {
                templateUrl: 'views/games-search/templates/gameDescription.view.client.html',
                controller: 'GameDescriptionController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/:userId/wishlist/', {
                templateUrl: 'views/games-lists/templates/wishlist.view.client.html',
                controller: 'WishListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/:userId/gamelist/', {
                templateUrl: 'views/games-lists/templates/games-list.view.client.html',
                controller: 'GameListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/:userId/gamelist/:userGameId', {
                templateUrl: 'views/games-lists/templates/games-list-edit.view.client.html',
                controller: 'GameListEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .otherwise({redirectTo: '/login'});
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        //this, and all other resolve functions, will return a promise
        //The navigation will proceed once all promises are resolved
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                //reject promise if user is '0',
                //indicating it's invalid
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                }
                else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();