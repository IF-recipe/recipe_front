angular.module('recipe.controllers')
    .controller('sidemenuCtrl', [
        '$scope',
        '$ionicSideMenuDelegate',
        '$location',
        function($scope, $ionicSideMenuDelegate, $location) {
            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };

            $scope.titleClick = function(){
                $location.path('/recipeall');
            }
    }]);
