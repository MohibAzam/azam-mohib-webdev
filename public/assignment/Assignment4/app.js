(function () {
    angular
        .module('WAM', ['ngRoute'])
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
})();