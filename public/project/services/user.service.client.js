/**
 * Created by mohib on 6/19/2017.
 */
(function () {
    angular
        .module('MioDB')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            addComment: addComment
        };

        return api;

        function createUser(user) {
            var url = "/api/mioDB/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/mioDB/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/mioDB/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/mioDB/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteUser(userId) {
            var url = "/api/mioDB/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/mioDB/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }


        function logout() {
            var url = "/api/mioDB/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "/api/mioDB/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/mioDB/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addComment(profileUserId, writerId, message) {
            console.log('in user service client');
            var url = "/api/mioDB/addComment/" + profileUserId + "/" + writerId;
            return $http.put(url, message)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();