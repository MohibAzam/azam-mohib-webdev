//Iffys/namespaces are ONLY created for client-side, not server-side

(function () {
    angular
        .module('DirLecture', [])
        .directive('hello', helloTag)
        //HTML uses lowercase and dashes, JS uses camelCase)
        .directive('wdDraggable', wdDraggable);

    function wdDraggable() {

        function linkFunction(scope, element) {
            //$(element).sortable();
        }

        return {
            link: linkFunction
        }
    }

    function helloTag() {

        function linkFunction(scope, element, attrs) {
            console.log(element);
            element.html('goodbye');
        }

        //alert('hello tag');
        return {
            template: 'hello world',
            link: linkFunction
        }
    }
})();