/**
 * Created by mohib on 6/9/2017.
 */
(function () {
    angular
        .module('MioDB')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/templates/login-page.view.client.html',
                controller: 'loginController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkNotLoggedIn
                }
            })
            .when('/home', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
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
            .when('/search', {
                templateUrl: 'views/games-search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
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
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-user/admin-user.view.client.html',
                controller: 'AdminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user/new', {
                templateUrl: 'views/admin/templates/admin-user/admin-user-new.view.client.html',
                controller: 'AdminUserNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user/:userId', {
                templateUrl: 'views/admin/templates/admin-user/admin-user-edit.view.client.html',
                controller: 'AdminUserEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/game', {
                templateUrl: 'views/admin/templates/admin-game/admin-game.view.client.html',
                controller: 'AdminGameController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/game/new', {
                templateUrl: 'views/admin/templates/admin-game/admin-game-new.view.client.html',
                controller: 'AdminGameNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/game/:gameId', {
                templateUrl: 'views/admin/templates/admin-game/admin-game-edit.view.client.html',
                controller: 'AdminGameEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/usergame', {
                templateUrl: 'views/admin/templates/admin-usergame/admin-usergame.view.client.html',
                controller: 'AdminUsergameController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/usergame/:userGameId', {
                templateUrl: 'views/admin/templates/admin-usergame/admin-usergame-edit.view.client.html',
                controller: 'AdminUsergameEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .otherwise({redirectTo: '/home'});
    }

    function checkNotLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser !== '0') {
                    deferred.reject();
                    $location.url('/home');
                }
                else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/home');
                }
                else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
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