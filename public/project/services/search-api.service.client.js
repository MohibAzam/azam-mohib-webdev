(function () {
    angular
        .module('MioDB')
        .service('searchService', searchService);


    function searchService($http) {
        this.searchGames = searchGames;
        this.searchGenres = searchGenres;
        this.searchCompanies = searchCompanies;
        this.searchCollections = searchCollections;
        this.searchFranchises = searchFranchises;
        this.searchPlatforms = searchPlatforms;
        this.searchThemes = searchThemes;

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
                idList += ids[id];
                idList += ",";
            }
            idList = idList.slice(0, idList.length - 1);

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
                idList += ids[id];
                idList += ",";
            }
            idList = idList.slice(0, idList.length - 1);

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
                idList += ids[id];
                idList += ",";
            }
            idList = idList.slice(0, idList.length - 1);

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
                idList += ids[id];
                idList += ",";
            }
            idList = idList.slice(0, idList.length - 1);

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
                idList += ids[id];
                idList += ",";
            }
            idList = idList.slice(0, idList.length - 1);

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