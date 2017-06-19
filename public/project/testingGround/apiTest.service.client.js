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
         this.searchGenres = searchGenres;

         var key = "vZLmhvdPdVmshSx9vMVNoTvkIVjMp1Du44cjsnsyqQzGEWMe4U";
         var urlBase= "https://igdbcom-internet-game-database-v1.p.mashape.com";

         //key = "xoFjMGspjnmshTRuATEBFPuA3ZSmp1tFcCEjsn9BM8eNv4n7dr";
         var gameUrl = "/games/?fields=name,cover,summary,esrb,aggregated_rating," +
             "aggregated_rating_count,collection,franchise," +
             "genres,themes,developers,publishers,first_release_date" +
             "&offset=0&search=";
         gameUrl = "/games/?fields=*&offset=0&limit=5&search=";

         var req = {
             method: 'GET',
             headers: {
                 "X-Mashape-Key": key,
                 "X-Mashape-Host": "igdbcom-internet-game-database-v1.p.mashape.com"
             }
         }

         function searchGames(gameName) {
             req.url = urlBase;
             req.url += gameUrl;
             req.url += gameName;
             console.log('hey');
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }

         function searchGenres(ids) {
             var idList = "";
             for (var id in ids) {
                 idList += ids[id];
                 idList += ",";
             }
             idList = idList.slice(0, idList.length - 1);

             req.url = urlBase;
             req.url += "/genres/" + idList + "?fields=*";
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
         function searchCompanies(id) {
             var idList = "";
             for (var id in ids) {
                 idList += id;
                 if (id === ids.length - 1) {
                     break;
                 }
                 idList += ",";
             }

             req.url = urlBase;
             req.url += "/companies/" + idList + "?fields=*";
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
         function searchCollections(id) {
             var idList = "";
             for (var id in ids) {
                 idList += id;
                 if (id === ids.length - 1) {
                     break;
                 }
                 idList += ",";
             }

             req.url = urlBase;
             req.url += "/collections/" + idList + "?fields=*";
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
         function searchFranchises(id) {
             var idList = "";
             for (var id in ids) {
                 idList += id;
                 if (id === ids.length - 1) {
                     break;
                 }
                 idList += ",";
             }

             req.url = urlBase;
             req.url += "/franchises/" + idList + "?fields=*";
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
         function searchThemes(id) {
             var idList = "";
             for (var id in ids) {
                 idList += id;
                 if (id === ids.length - 1) {
                     break;
                 }
                 idList += ",";
             }

             req.url = urlBase;
             req.url += "/themes/" + idList + "?fields=*";
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
         function searchPlatforms(id) {
             var idList = "";
             for (var id in ids) {
                 idList += id;
                 if (id === ids.length - 1) {
                     break;
                 }
                 idList += ",";
             }

             req.url = urlBase;
             req.url += "/platforms/" + idList + "?fields=*";
             return $http(req)
                 .then(function (response) {
                     console.log(response.data);
                     return response.data;
                 });
         }
     }
 })();

