/**
 * Created by kimsungwoo on 15. 8. 6..
 */

angular.module('recipe.controllers')
    .controller('recipeallCtrl',[
        '$scope',
        '$http',
        '$ionicModal',
        '$ionicSlideBoxDelegate',
        '$ionicLoading',
        '$timeout',
        function($scope, $http, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, $timeout) {
            $scope.canloadMore = true;
            $scope.recipes = [];
            $scope.foodkinds_filter = "";

            /**
             * 음식 카테고리 종류.
             */
            $scope.tabClick = function(foodkinds){
                if(foodkinds == "전체"){
                    $scope.foodkinds_filter = "";
                } else {
                    $scope.foodkinds_filter = foodkinds;
                }
            }

            /**
             * 레시피 데이터를 받아오는 부분. 아직 서버와의 통신이 없기 때문에 로컬의 recipe.json파일을 읽어옴.
             */
            $http.get('json/recipe.json').success(function(items) {
                $scope.recipes = items;
                $scope.recipes_count = 15;
            });

            /**
             * 무한스크롤의 함수. 스크롤의 맨 마지막으로 이동하면 아래의 함수가 호출되며 기본 갯수 15개의 레시피에서 추가로 15개의 레시피를 더함.
             */
            $scope.loadMore = function() {
                $scope.recipes_count = $scope.recipes_count*1 + 15;

                if($scope.recipes.length != 0){
                    if($scope.recipes_count == $scope.recipes.length){
                        $scope.canloadMore = false;
                    }
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };




            $scope.recipeSteps = [];

            $http.get('json/makerecipe.json').success(function(items) {
                $scope.recipeSteps = items.steps;

            });

            /**
             * 모달 초기화 함수.
             */
            $ionicModal.fromTemplateUrl('template/showrecipeTemplate.html', {
                scope: $scope,
                animation: 'mh-slide'

            }).then(function(modal) {
                $scope.modal = modal;
            });

            /**
             * 모달 open. 현재는 한개의 레시피만 열리지만, 추후 파라미터값(레시피 id와 같은)을 전송하여 해당 레시피의 상세 를 볼 수 있게함.
             */
            $scope.openshowrecipeModal = function(){
                $ionicLoading.show({
                    showBackdrop: false,
                    showDelay: 0,
                    template : '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>'
                });

                $timeout(function () {
                    $ionicLoading.hide();

                    $ionicSlideBoxDelegate.slide(0);
                    $scope.modal.show();
                }, 1000);
            }

            $scope.closeModal = function() {
                $scope.modal.hide();
            };
        }]);
