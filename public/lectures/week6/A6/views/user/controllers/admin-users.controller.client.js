/**
 * Created by mohib on 6/14/2017.
 */
(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController)

    function adminUsersController(UserService) {
        var model = this;
        model.deleteUser = deleteUser;

        function init() {
            UserService
                .findAllUsers()
                .then(function (users) {

                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id);
        }
    }
})