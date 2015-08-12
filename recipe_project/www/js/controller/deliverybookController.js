/**
 * Created by airnold on 15. 8. 7..
 */

angular.module('recipe.controllers')
    .controller('deliverybookCtrl', [
        '$scope',
        '$profileService',
        '$window',
        '$ionicScrollDelegate',
        function($scope, $profileService, $window,$ionicScrollDelegate){



            $ionicScrollDelegate.scrollTop(true);

            $scope.addbtn_status = false;
            $scope.edit_status = undefined;
            $scope.delivery_book = [];

            var temp = {};
            temp.representation = true;
            temp.address_title = '유자성집';
            temp.zip_code = '378-141';
            temp.jibun_address = '충남아산시 신창면 읍내리 순천향대학교 앙뜨레 쁘레너관 E307';
            temp.road_address = '충남아산시 순천향대학길길길 앙뜨레 쁘레너관 E307';
            temp.phone = '010-4230-0986';
            $scope.delivery_book.push(temp);
            var temp1 = {};
            temp1.address_title = '유자성집2';
            temp1.representation = false;
            temp1.zip_code = '378-111';
            temp1.jibun_address = '충남아산시 신창면 읍내리 순천향대학교 앙뜨레 쁘레너관 E3011237';
            temp1.road_address = '충남아산시 경희길길길';
            temp1.phone = '010-4230-0000';
            $scope.delivery_book.push(temp1);


            /**
             * $scope.delivery_book = $profileService.getdeliveryOnly
             */

            $scope.delivery_input_forms = [];

            $scope.adddeliveryBook = function(){

                $ionicScrollDelegate.scrollBottom(true);



                $scope.addbtn_status = true;
                $scope.delivery_input_forms.push(createaddressInput());



            };

            $scope.deleteDelivery = function(index){
                $scope.delivery_book.splice(index, 1);
            };
            $scope.editDelivery = function(index, delivery){

                /**
                 * 수정 폼 나와야 함
                 * db에 다시 저장하고 다시 요청하여 리 렌더링
                 */
                $scope.edit_status = index;
                var addedHeight = angular.element('#toScroll');
                $ionicScrollDelegate.scrollTo(0, addedHeight.height(), true);


            };
            $scope.$on('addcompleteFunc', function(event,data){


                /**
                 *
                 * 1. 몽고 디비에 insert
                 * 2. 다시 값을 가져온다
                 * 3. delivery_input_forms에서 해당 인덱스를 삭제한다
                 */

                $window.alert('추가완료');
                $scope.address_find_values.post_code = data.address.post_code;
                $scope.address_find_values.road_address = data.address.road_address;
                $scope.address_find_values.jibun_address = data.address.jibun_address;
                console.log($scope.address_find_values);

                $scope.addbtn_status = false;
                $scope.delivery_input_forms.splice(data.index, 1);
            });

            $scope.$on('addcloseFunc', function(event,data){
                $scope.delivery_input_forms.splice(data, 1);
                $scope.addbtn_status = false;
            });

            $scope.$on('editcompleteFunc', function(event,data){
                console.log(data.address);
                $window.alert('수정완료');
                $scope.edit_status=undefined;
            });

            $scope.$on('editcloseFunc', function(event, data){
                $scope.edit_status=undefined;
                var addedHeight = angular.element('#toScroll');
                $ionicScrollDelegate.scrollTo(0, addedHeight.height()*-1, true);
            });


            /**
             * address find data
             */

            $scope.address_find_values = {
                post_code : '',
                road_address : '',
                jibun_address : ''
            };

            $scope.$on('addressFind', function(event, data){


            })

        }

    ]);

function createaddressInput(){

    var temp = {};
    temp.address_title = '';
    temp.address = '';
    temp.zip_code = '';
    temp.phone = '';

    return temp;

}