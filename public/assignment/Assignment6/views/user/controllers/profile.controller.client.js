(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);
    
    function profileController(currentUser, $location, userService, $routeParams) {

        //Self-instantiation
        var vm = this;

        var userId = currentUser._id;
        //userService
            //.findUserById(userId)
            //Continue to use .then here on the data that gets returned
            //by findUserById, since we don't know when we'll get back from them
            //.then(renderUser);

        function init() {
            renderUser(currentUser);
        }
        init();
        function renderUser (user) {
            vm.user = user;
        }

        //event handler
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.addComment = addComment;

        function deleteUser(user) {
            userService.deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                });
        }

        //Update the user for the new changes given on their profile
        function updateUser(user) {
            userService.updateUser(userId, user)
                .then(function () {
                    vm.message = "The changes have been saved!";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }

        function addComment(String) {
            userService
                .addComment(userId, userId)
                .then(function () {
                    $location.url('/profile');
                });
        }
    }
})();