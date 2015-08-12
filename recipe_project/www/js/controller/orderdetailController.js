/**
 * Created by airnold on 15. 8. 11..
 */



angular.module('recipe.controllers')
    .controller('orderdetailCtrl',[
        '$scope',
        '$stateParams',
        '$ionicScrollDelegate',
        function($scope, $stateParams,$ionicScrollDelegate){
            console.log($stateParams.orderId);

            $scope.see_product = false;
            $scope.delivery_change_status = false;
            $scope.address_show = false;



            $scope.buyer_info = {};
            /**
             * buyer_info 후에 구매자 정보 들어갈 곳
             */

            $scope.deliveryChange = function(){
                if($scope.delivery_change_status == false){
                    $scope.delivery_change_status = true;
                }else{
                    $scope.delivery_change_status = false;
                    $scope.address_show = false;
                }
            };

            $scope.showProduct = function(){

                if($scope.see_product == false){

                    $scope.see_product = true;
                    var addHeight = angular.element('#scrollToproduct');
                    $ionicScrollDelegate.scrollTo(0, 2, true);

                }else{
                    $scope.see_product = false;
                    var minusHeight = angular.element('#scrollToproduct');
                    $ionicScrollDelegate.scrollTo(0, minusHeight.height()*-1, true);
                }
            };

            $scope.delivery_book = [];
            $scope.show_delivery = {};

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




            $scope.radioChecked = function(data){


                $scope.show_delivery = data;
                $scope.address_show = true;

                $ionicScrollDelegate.scrollTo(0, 200, true);
            };

            $scope.buyerChange = function(){
                /**
                 * db로 보내서 변경후 배송지 변경 닫기
                 */

                $scope.delivery_change_status = false;
                $scope.address_show = false;

            }
        }
    ]);