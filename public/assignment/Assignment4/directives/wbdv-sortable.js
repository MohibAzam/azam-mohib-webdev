/**
 * Created by mohib on 6/6/2017.
 */

(function () {
    angular
        .module('WbdvDirectives', [])
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable($http, $routeParams) {

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
                        }
                    }
                    else {
                        if (oldId === newId) {
                            lastInd = w - 1;
                        }
                    }
                }
                console.log(w);
                if (foundFirstInd) {
                    lastInd = w;
                }
                else {
                    return;
                }
                $http.put('/page/:' + pageId + '/widget?initial=' + firstInd + '&final=' + lastInd, )
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