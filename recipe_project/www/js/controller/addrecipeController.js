/**
 * addRecipeController
 * - 레시피 추가시 로직이 들어감
 * - 제목 / 간단 설명 / 필요재료에 대한 변수동기화
 * - 레시피 카테고리 설정
 * - 레시피 내용 추가 { 사진 및 내용 }
 */

angular.module('recipe.controllers')
    .controller('addrecipeCtrl', [
        '$scope',
        '$ionicLoading',
        function($scope, $ionicLoading) {
            /**
             * foodkind : 음식 카테고리 설정
             * newRecipe : 입력 된 글 객체 - 제목 / 간단 설명 / 요리재료 / [ 사진 및 내용 ]
             * contentCnt : 사진 및 내용 Max 값을 설정
             */
            $scope.foodkinds=["한식","중식","양식","일식"];
            $scope.newRecipe={};
            $scope.contentCnt = 0;
            $scope.contents = [{
                name:"test1",
                content : "testsrc"
            }];
            $scope.hideplusBtn=true;

            $scope.getAlbum=function(){
                console.log("getAlbum")
            };

            $scope.addContent=function(){
                /**
                 * 0 ~ 9까지는 directive add
                 * 9가 되는 순간 button hide
                 * directive remove 할 시, 버튼 추가
                 */
                console.log("countentCnt ="+$scope.contentCnt++);
                if($scope.contentCnt > 9){
                    $ionicLoading.show({
                        template: '<i class="ion-ios-close-outline"></i> 최대 10개까지 가능합니다.'
                        , noBackdrop: true
                        , duration: 2000 });
                    //$scope.hideplusBtn=false;
                }else{
                    $scope.contents.push({
                        name:"test"+$scope.contentCnt,
                        content : "testsrc"+$scope.contentCnt
                    });
                }
            };

            // toString
            $scope.showNewrecipe=function(){
                console.log($scope.newRecipe);
            };
        }]);
