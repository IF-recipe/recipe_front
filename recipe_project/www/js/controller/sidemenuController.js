angular.module('recipe.controllers')
    .controller('sidemenuCtrl', [
        '$scope',
        '$ionicSideMenuDelegate',
        '$state',
        function($scope, $ionicSideMenuDelegate, $state) {
            $scope.toggleLeft = function() {

                $ionicSideMenuDelegate.toggleLeft();
            };

            $scope.titleClick = function(){
                $state.go('recipeall');
            }

    }]);
