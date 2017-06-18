var app = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {
    var RapidAPI = require('rapidapi-connect');
    var rapid = new RapidAPI('miodb_5942d01de4b08a5f8310af6b', 'c62fe410-192e-4078-a335-a5ab33d9d34b');

    app.get('/rest/apitest', searchGames);

    function searchGames(req, res) {
        rapid.call('Internet Game Database', 'Games', {
            'fields': 'name',
            'limit': 10,
            'offset': 0,
            'order': 'release_dates.date:desc:',
            'search': 'zelda'
        }).on('success', function (payload) {
            console.log(payload);
            res.json(payload);
        }).on('error', function (payload) {
            res.sendStatus(404);
        });
    }
}

/*

(function () {
    angular
        .module('MioDB')
        .service('testService', testService);

    function testService($http) {

        this.searchGames = searchGames;


        const igdb = require('igdb-api-node').default;
        const client = igdb('9e9507643b4dd0c98dfff3a7661b55d4');

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


        var key = "vZLmhvdPdVmshSx9vMVNoTvkIVjMp1Du44cjsnsyqQzGEWMe4U";
        key = "xoFjMGspjnmshTRuATEBFPuA3ZSmp1tFcCEjsn9BM8eNv4n7dr";
        var urlBase= "https://igdbcom-internet-game-database-v1.p.mashape.com";
        urlBase += "/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda";
        var typeToRetrieve;

        var req = {
            method: 'GET',
            url: urlBase,
            headers: {
                "X-Mashable-Key":key,
                "X-Mashape-Host":"igdbcom-internet-game-database-v1.p.mashape.com"
            }
        }

        function searchGames() {
            console.log('hey');
            return $http(req)
                .then(function (response) {
                    console.log(response);
                });
        }

    }
})();

*/