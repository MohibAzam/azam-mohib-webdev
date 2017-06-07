/**
 * Created by mohib on 6/6/2017.
 */

(function () {
    angular
        .module(WAM, [])
        .directive('widgetDraggable', widgetDraggable);

    function widgetDraggable() {
        function linkFunction(scope, element) {
            //TODO: Make methods in the widget services for sorting.
            $(element).sortable();
        }
        return {
            link: linkFunction
        }
    }
});