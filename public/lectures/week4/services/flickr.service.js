function flickrService() {
    angular
        .module("WAM")
        .service('flickrService', flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        //fill this in using flickr
        var key = "";
        var secret = "";
        var urlBase = "";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
}