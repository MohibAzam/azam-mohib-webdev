/*
(function () {
    angular
        .module('MioDB')
        .factory('testService', testService);

    function testService($http) {

        //The api we will be using in this service
        var api = {
            searchGames: searchGames
        };

        return api;

        function searchGames() {
            console.log('test');
            var url = "/rest/apitest";
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
        }
    }
})();
*/

/*
(function () {
    angular
        .module('MioDB')
        .service('testService', testService);

    function testService($http) {

        this.searchGames = searchGames;


        //const igdb = require('igdb-api-node').default;
        //const client = igdb('9e9507643b4dd0c98dfff3a7661b55d4');


        return client
            .games({
                    filters: {
                        'release_dates.date-gt': '2010-12-31',
                        'release_dates.date-lt': '2012-01-01'
                    },
                    limit: 5,
                    offset: 0,
                    order: 'release_dates.date:desc',
                    search: 'zelda'
                },
                [
                    'name',
                    'release_dates.date',
                    'rating',
                    'hypes',
                    'cover'
                ])
            .then(function (response) {
                return response;
            });


        //key = "xoFjMGspjnmshTRuATEBFPuA3ZSmp1tFcCEjsn9BM8eNv4n7dr";
        var urlBase= "http://thegamesdb.net/api/";
        //urlBase += "/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda";
        //var typeToRetrieve;
        urlBase += "GetGamesList.php?name=x-men";

        function searchGames() {
            console.log('hey');
            return $http.get(urlBase)
                .then(function (response) {
                    console.log(response);
                    return response;
                });
        }
    }
})();
*/



 (function () {
     angular
         .module('MioDB')
         .service('testService', testService);

     function testService($http) {
         this.searchGames = searchGames;

         var key = "vZLmhvdPdVmshSx9vMVNoTvkIVjMp1Du44cjsnsyqQzGEWMe4U";
         //key = "xoFjMGspjnmshTRuATEBFPuA3ZSmp1tFcCEjsn9BM8eNv4n7dr";
         var urlBase= "https://igdbcom-internet-game-database-v1.p.mashape.com";
         urlBase += "/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda";
         var typeToRetrieve;

         var req = {
             method: 'GET',
             url: urlBase,
             headers: {
                 "X-Mashape-Key": key,
                 "X-Mashape-Host": "igdbcom-internet-game-database-v1.p.mashape.com"
             }
         }

         function searchGames() {
             console.log('hey');
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
     }
 })();

