(function () {
    angular
        .module('MioDB')
        .controller('testController', testController);

    function testController(testService) {
        var model = this;
        
        model.searchGames = searchGames;
        model.games = new Array();

        model.initGame = initGame;

        function initGame(game) {
            model.game = game;
            model.allGenres = "";
            var genreString = "";
            testService.searchGenres(model.game.genres)
                .then(function (response) {
                    console.log('response from server');
                    console.log(response);
                    for (var r in response) {
                        genreString += response[r].name;
                        genreString += ", ";
                    }
                    genreString = genreString.slice(0, genreString.length - 2);
                    console.log(genreString);
                    model.allGenres = genreString;
                });
        }

        function searchGames (gameName) {
            console.log('hey');
            testService.searchGames(gameName)
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
