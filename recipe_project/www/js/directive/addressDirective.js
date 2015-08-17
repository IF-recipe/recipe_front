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
            restrict: 'E',
            templateUrl: 'template/addressfindTemplate.html',
            scope: {
                status: '@status',
                delivery: '=deliveryEdit',
                index: '=deliveryIndex'
            },
            controller: function ($scope, $element) {

                (function post() {
                    $("#postcodify").postcodify({
                        insertPostcode6: "#post_code",
                        insertJibeonAddress: "#jibun_address",
                        hideOldAddresses: false,
                        afterSelect: function () {
                            $("#postcodify div.postcode_search_result").remove();
                            $("#postcodify div.postcode_search_status.summary").hide();
                            $("#postcodify div.too_many").hide();
                        }

                    });
                }());

                var inputBox = angular.element('.keyword');
                inputBox.attr('placeholder', '도로명+건물번호 또는 동/리+번지로 입력해주세요');
                inputBox.attr('size', '40');
                inputBox.addClass('item item-input');

                var searchBtn = angular.element(".search_button");
                searchBtn.css('margin-top','30px');
                searchBtn.addClass(' button button-block button-positive ');


                $scope.sending_address = {
                    post_code: '',
                    detail_address: '',
                    jibun_address: ''
                };

                if ($scope.status === 'edit') {

                    $scope.sending_address.post_code = $scope.delivery.zip_code;
                    $scope.sending_address.detail_address = $scope.delivery.detail_address;
                    $scope.sending_address.jibun_address = $scope.delivery.jibun_address;
                    $scope.sending_address.phone = $scope.delivery.phone;
                    $scope.sending_address.address_title = $scope.delivery.address_title;
                    $scope.btn_title = '수정하기';

                } else {

                    $scope.btn_title = '추가';

                }

                $scope.confirmClick = function () {
                    if ($scope.status === 'add') {

                        $scope.$emit('addcompleteFunc', {address: $scope.sending_address, index: $scope.index});
                    } else {

                        console.log($scope.sending_address);
                        $scope.$emit('editcompleteFunc', {address: $scope.sending_address, index: $scope.index});
                    }
                };

                $scope.closeClick = function () {
                    if ($scope.status === 'add') {
                        $scope.$emit('addcloseFunc', $scope.index);
                    } else {
                        console.log('close');
                        $scope.$emit('editcloseFunc', $scope.index);
                    }
                };
            },
            link: function (scope, elem, attrs, ctrl) {
            }
        }
    }]);




