(function () {
    angular
        .module('MioDB')
        .controller('testController', testController);

    function testController(testService) {
        var model = this;
        
        model.searchGames = searchGames;
        
        function searchGames () {
            console.log('hey');
            testService.searchGames()
                .then(function (response) {
                    console.log(response.url, JSON.stringify(response.body));
                });
        }
        
    }
})();
