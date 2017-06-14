(function () {
    angular
        .module('WAM')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController(flickrService, widgetService, $routeParams, $location) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function selectPhoto(photo) {
            var newPhoto = {
                "widgetType": "IMAGE",
                "width": "100%",
                "url": "https://farm" + photo.farm +
                ".staticflickr.com/" + photo.server +
                "/" + photo.id + "_" + photo.secret + "_s.jpg"
            };
            widgetService.updateWidget(model.widgetId, newPhoto)
                .then(function () {
                    $location.url('/user/' + model.userId +
                        '/website/' + model.websiteId +
                        '/page/' + model.pageId +
                        '/widget/');
                });
        }


        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();

