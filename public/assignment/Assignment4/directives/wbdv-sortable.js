/**
 * Created by mohib on 6/6/2017.
 */

(function () {
    angular
        .module('WbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable(widgetService, $routeParams) {

        var lastSorted;
        var newSorted;

        var pageId = $routeParams['pageId'];

        function linkFunction(scope, element) {
            //TODO: Make methods in the widget services for sorting.
            $(element).sortable({
                axis: "y",
                start: function (event, ui) {
                    lastSorted = $(element).sortable("toArray");
                    console.log(lastSorted);
                },
                update: function (event, ui) {
                    newSorted = $(element).sortable("toArray");
                    console.log(newSorted);
                    checkArray(lastSorted, newSorted);
                }
            });

            function checkArray(lastSorted, newSorted) {
                console.log('got to function call');
                var foundFirstInd = false;
                var firstInd = -1;
                var lastInd = -1;
                for (var w in lastSorted) {
                    var oldId = lastSorted[w];
                    var newId = newSorted[w];
                    if (!(foundFirstInd)) {
                        if (oldId !== newId) {
                            firstInd = w;
                            foundFirstInd = true;
                        }
                    }
                    else {
                        if (oldId === newId) {
                            lastInd = w - 1;
                            break;
                        }
                    }
                }
                console.log(w);
                if (foundFirstInd && lastInd === -1) {
                    lastInd = w;
                }
                else if (firstInd === -1) {
                    return;
                }
                var url = '/api/assignment/page/' +
                    pageId + '/widget?initial=' + firstInd +
                    '&final=' + lastInd;
                console.log(url);
                return $http.put(url, pageId)
                    .then(function () {
                       console.log('sorted successfully');
                    });
            }

        }
        return {
            link: linkFunction
        }
    }

})();