(function () {
    angular
        .module('MioDB')
        .controller('testController', testController);

    function testController(testService) {
        var model = this;
        
        model.searchGames = searchGames;
        
        function searchGames () {
            testService.searchGames()
                .then(function (response) {
                    console.log(response);
                });
        }
        
    }
})();
