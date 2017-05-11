/**
 * Created by mohib on 5/10/2017.
 */

(function ewq() { //IIFE
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);
    
    function TodoListController($scope) {

        $scope.todo = {title: "initial title"};
        $scope.todos = [];
        $scope.addTodo = addTodo;
        $scope.removeTodo = removeTodo;

        function removeTodo (index) {
            $scope.todos.splice(index, 0);
        }

        function addTodo(todo) {

            var newTodo = {
                title: todo.title
            };

            $scope.todos.push(newTodo);
            console.log($scope.todos);
        }
    }
})();