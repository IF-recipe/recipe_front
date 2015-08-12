/**
 * Created by airnold on 15. 8. 7..
 */


angular.module('recipe.controllers')
    .controller('profileCtrl',[
        '$scope',
        '$location',
        function($scope, $location){

            $scope.profile_info = {
                email : '',
                grade : undefined,
                point : undefined,
                phone : '',
                nickname : ''
            };


            $scope.deliverybookClick = function(){
                $location.path('/deliverybook');
            }

        }
    ]);