/**
 * Created by airnold on 15. 8. 7..
 */


angular.module('recipe.controllers')
    .controller('profileCtrl',[
        '$scope',
        '$location',
        'profile_data',
        function($scope, $location,profile_data){

            console.log(profile_data);

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