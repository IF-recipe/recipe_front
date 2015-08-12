/**
 * Created by airnold on 15. 8. 10..
 */

/**
 * status - > 추가인지 수정인지
 * delivery -> 수정인경우 폼에 기존 값 너어주기
 * index -> 지번검색 추가 된 폼을 삭제하거나 없앨때 사용
 */

angular.module('recipe.directives', [])
    .directive('addressFind', [function () {
        return {
            restrict : 'E',
            templateUrl : 'template/addressfindTemplate.html',
            scope:{
                status : '@status',
                delivery : '=deliveryEdit',
                index : '=deliveryIndex'
            },
            controller : function($scope, $element){

                $scope.addresswrap = false;

                $scope.sending_address= {
                    post_code :'',
                    road_address:'',
                    jibun_address : ''
                };
                if($scope.status === 'edit'){

                    $scope.sending_address.post_code = $scope.delivery.zip_code;
                    $scope.sending_address.road_address = $scope.delivery.road_address;
                    $scope.sending_address.jibun_address = $scope.delivery.jibun_address;
                    $scope.sending_address.phone = $scope.delivery.phone;
                    $scope.sending_address.address_title = $scope.delivery.address_title;
                    $scope.btn_title = '수정하기';

                }else{
                    $scope.btn_title = '추가';
                }


                $scope.confirmClick = function(){
                    if($scope.status === 'add'){

                        $scope.$emit('addcompleteFunc', {address : $scope.sending_address, index : $scope.index});
                    }else{

                        console.log($scope.sending_address);
                        $scope.$emit('editcompleteFunc', {address : $scope.sending_address, index : $scope.index});
                    }
                };
                $scope.closeClick = function(){
                    if($scope.status === 'add'){
                        $scope.$emit('addcloseFunc', $scope.index);
                    }else{
                        console.log('close');
                        $scope.$emit('editcloseFunc', $scope.index);
                    }
                };

                var element_wrap = document.getElementById('wrap');

                $scope.foldDaumPostcode = function() {

                    $scope.addresswrap = false;
                };

                $scope.openAddress = function(){

                    $scope.addresswrap = true;

                    daum.postcode.load(function(){
                        new daum.Postcode({
                            oncomplete: function(data) {
                                $scope.sending_address.post_code = data.postcode;
                                $scope.sending_address.road_address = data.roadAddress;
                                $scope.sending_address.jibun_address = data.jibunAddress;
                            }
                        }).embed(element_wrap);
                    });

                    /*element_wrap.style.display = 'block';*/

                }
            },
            link: function (scope, elem, attrs, ctrl) {
            }
        }
    }]);




