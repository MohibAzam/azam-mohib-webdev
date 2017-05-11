/**
 * Created by mohib on 5/10/2017.
 */

(function ewq() { //IIFE
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);
    
    function TodoListController($scope, $http) {

        //scope is the main mechanism of communication btwn View and Controller
        $scope.todo = {title: "initial title"};
        $scope.todos = [];
        $scope.addTodo = addTodo;
        $scope.removeTodo = removeTodo;
        $scope.selectTodo = selectTodo;
        $scope.updateTodo = updateTodo;

        $http.get('/api/todo')
            .then(function (response) {
                console.log(response.data);
            });

        console.log($scope.todos);

        function updateTodo (todo) {
            $scope.todos[$scope.selectedIndex] = angular.copy(todo);
        }

        function removeTodo (todo) {
            console.log(todo);
            var index = $scope.todos.indexOf(todo);
            $scope.todos.splice(index, 1);
        }

        function selectTodo(index) {
            $scope.todo = angular.copy($scope.todos[index]);
            $scope.selectedIndex = index;
        }

        function addTodo(todo) {

            //var newTodo = {
            //    title: todo.title
            //};

            var newTodo = angular.copy(todo);

            console.log(newTodo);
            $scope.todos.push(newTodo);
            console.log($scope.todos);
        }
    }
})();