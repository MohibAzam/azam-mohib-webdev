(function () {
    angular
        .module('pocApp', [])
        .controller('pocController', pocController);

    function pocController() {
        var model = this;
        model.hello = 'hello world';

        function searchMovie(title) {
            var url="https://igdbcom-internet-game-database-v1.p.mashape.com/";
            $http.get(url)
                .then(function (response) {
                    console.log(response);
                })
        }

    }
})();