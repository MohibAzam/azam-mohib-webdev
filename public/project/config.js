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
            .when('/home', {
                templateUrl: 'views/home/templates/home.view.client.html'
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
                    currentUser: checkCurrentUser
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
            .otherwise({redirectTo: '/home'});
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login?errMsg=1');
                }
                else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                }
                else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }



})();