(function () {
    angular
        .module('MioDB')
        .controller('searchController', searchController);

    function searchController(searchService, gameService, $location) {
        var model = this;

        model.searchGames = searchGames;
        model.games = new Array();

        model.initGame = initGame;

        function initGame(game) {
            model.game = game;
            var genreString = "";
            searchService.searchGenres(model.game.genres)
                .then(function (response) {
                    handleResponse(response);
                });

            function handleResponse(response) {
                console.log('response from server');
                console.log(response);
                for (var r in response) {
                    genreString += response[r].name;
                    genreString += ", ";
                }
                genreString = genreString.slice(0, genreString.length - 2);
                console.log(genreString);
                //model.game.gameGenres = genreString;
                var game = {
                    gameId: model.game._id,
                    gameName: model.game.name,
                    gameCover: model.game.cover,
                    gameGenres: genreString,
                    gameDescription: model.game.summary
                };
                gameService
                    .createGame(game)
                    .then(function () {
                        //TODO: Fill in URL
                        $location.url('...');
                    });
            }
        }

        function searchGames (gameName) {
            console.log('hey');
            searchService.searchGames(gameName)
                .then(function (response) {
                    //console.log(response.url, JSON.stringify(response.body));
                    for (var g in response) {
                        model.games[g] = response[g];
                        if (model.games[g].cover) {
                            model.games[g].cover = "https://" + model.games[g].cover.url.slice(2);
                        }
                        else {
                            delete model.games[g].cover;
                        }
                        if(model.games.websites !== undefined && !(model.games.websites.isEmpty())) {
                            model.games[g].website = model.games[g].websites[0].url;
                            console.log(model.games[g].website);
                        }
                    }
                });
        }

    }
})();
