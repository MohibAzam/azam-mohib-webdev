(function () {
    angular
        .module('MioDB')
        .controller('searchController', searchController);

    function searchController(searchService, gameService, $routeParams, $location) {
        var model = this;

        model.searchGames = searchGames;
        model.games = new Array();

        function start() {
            var keyword = $routeParams['search'];
            if (keyword) {
                searchGames(keyword);
            }
        }

        start();

        model.initGame = initGame;

        function initGame(game) {
            console.log(game);
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
                model.genreString = genreString;
                //model.game.gameGenres = genreString;
                var game = {
                    _id: model.game.id,
                    gameName: model.game.name,
                    gameCover: model.game.cover,
                    gameGenres: genreString,
                    gameDescription: model.game.summary
                };
                console.log('sending this game');
                console.log(game);
                gameService
                    .findGameById(game._id)
                    .then(function (response) {
                        if (response === undefined || response === null) {
                            gameService
                                .createGame(game)
                                .then(function (newGame) {
                                    console.log('moving');
                                    $location.url('/game/' + newGame._id);
                                });
                        }
                        else {
                            $location.url('/game/' + response._id);
                        }
                    });
            }

            function finalizeGame() {
                var game = {
                    _id: model.game.id,
                    gameName: model.game.name,
                    gameCover: model.game.cover,
                    gameGenres: model.genreString,
                    gameDescription: model.game.summary
                };
                console.log('sending this game');
                console.log(game);
                gameService
                    .findGameById(game._id)
                    .then(function (response) {
                        if (response === undefined || response === null) {
                            gameService
                                .createGame(game)
                                .then(function (newGame) {
                                    console.log('moving');
                                    $location.url('/game/' + newGame._id);
                                });
                        }
                        else {
                            $location.url('/game/' + response._id);
                        }
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
