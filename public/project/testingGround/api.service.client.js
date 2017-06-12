(function () {
    angular
        .module('MioDB')
        .service('testService', testService);

    function testService($http) {


        var key = "9e9507643b4dd0c98dfff3a7661b55d4";
        var urlBase= "https://igdbcom-internet-game-database-v1.p.mashape.com";
        urlBase += "/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda";
        var typeToRetrieve;

        var req = {
            method: 'GET',
            url: urlBase,
            headers: {
                "X-Mashable-Key": key,
                "Accept": "application/json",
                "X-Mashape-Host": "igdbcom-internet-game-database-v1.p.mashape.com"
            }
        }

        function searchGames() {
            return $http(req)
                .then(function (response) {
                    console.log(response);
                });
        }
    }
})();

