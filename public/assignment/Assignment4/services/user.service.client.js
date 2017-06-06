(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        //The given users for us to make use of
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        //The api we will be using in this service
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        //Create a new user based on the given (incomplete) user
        function createUser(user) {
            //Make sure you register this route on the server!
            //Otherwise you get a 404
            var url = "/api/assignment/user"
            $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        //Find a user whose username matches the given one
        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username;
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        //Update a user based on the information given
        //in the incomplete user
        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;
            //put is used for updating and passing new data
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        //Delete the user for the given Id
        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        //Find a user whose login credentials match
        //the given one
        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //Find a user of the given Id
        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
            //Not as simple it seems
            //Since the above just results in returning a promise
            //A promise is a statement from the server that basically
            //says the data isn't available yet, but it will become
            //available at some point in time...just not yet :/
            //So, whoever receives the promise needs to handle is accordingly
            //The promise can either be handled in the userService
            //or by the Controller, dependent on what we need to do with the data
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();