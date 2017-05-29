(function () {
    angular
        .module('WAM')
        .factory('userService', userService);
    
    function userService() {

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
            user._id = (new Date()).getTime() + "";
            users.push(user);
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
            var oldUser = findUserById(userId);
            var index = users.indexOf(oldUser);
            user._id = oldUser._id;
            users[index] = user;
        }

        //Delete the user for the given Id
        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
        }

        //Find a user whose login credentials match
        //the given one
        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        //Find a user of the given Id
        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            });
        }
    }
})();