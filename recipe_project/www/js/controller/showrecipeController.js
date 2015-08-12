/**
 * Created by kimsungwoo on 15. 8. 12..
 */
angular.module('recipe.controllers')
    .controller('showrecipeCtrl',[
        '$scope',
        '$http',
        function($scope, $http) {
            $scope.recipeSteps = [];

            $http.get('json/makerecipe.json').success(function(items) {
                $scope.recipeSteps = items.steps;

            });
        }]);
