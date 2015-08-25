/**
 * addRecipeController
 * - 레시피 추가시 로직이 들어감
 * - 제목 / 간단 설명 / 필요재료에 대한 변수동기화
 * - 레시피 카테고리 설정
 * - 레시피 내용 추가 { 사진 및 내용 }
 */
angular.module('recipe.controllers')
    .config(function($compileProvider){
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .controller('addrecipeCtrl', [
        '$scope',
        '$ionicScrollDelegate',
        '$ionicLoading',
        '$cameraService',
        '$photouploadService',
        function($scope, $ionicScrollDelegate, $ionicLoading, $cameraService, $photouploadService) {

            $scope.imageURI =undefined;

            $scope.foodkinds=["한식","중식","양식","일식"];
            $scope.newRecipe={};
            $scope.newRecipe.steps=[];
            $scope.newRecipe.steps.push({
                step:1,
                content: undefined,
                photoPath: undefined,
            });
            $scope.newRecipe.hashtag=[];
            $scope.inputTag=undefined;
            $scope.addCompPhoto = true;

            $scope.addTag = function(event){
                if( $scope.inputTag === "" || $scope.inputTag === undefined) return;
                if(event.keyCode ===13){
                    if($scope.newRecipe.hashtag.length==5){
                        $ionicLoading.show({
                            template: '<i class="ion-ios-close-outline"></i> 해시태그는 5개까지 가능합니다.'
                            , noBackdrop: true
                            , duration: 2000 });
                        return;
                    }
                    $scope.newRecipe.hashtag.push({
                        name : $scope.inputTag
                    });
                    $ionicScrollDelegate.$getByHandle('tagHandler').scrollBottom();
                    $scope.inputTag=undefined;
                }
            }

            $scope.removeTag = function(index){
                $scope.newRecipe.hashtag.splice(index,1);
            }



            /**
             * camera & album getting img
             */
            $scope.getPhoto = function(step, sourceType) {
                var options={
                    quality: 75,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType : undefined,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 500,
                    targetHeight: 500,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                    //,mediaType : Camera.MediaType.PICTURE
                    //,correctOrientation : true
                };

                if(sourceType === 1){
                    options.sourceType = Camera.PictureSourceType.CAMERA;
                    //dataurlOptions.sourceType = Camera.PictureSourceType.CAMERA;
                }else{
                    options.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                    //dataurlOptions.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                }

                $cameraService.getPicture(options).then(function (imageURI) {
                    alert(imageURI);
                    // 사진 경로 조정
                    //var photoPath = imageURI.split("?");
                    //imageURI = photoPath[0].replace("modified",photoPath[1]);
                    //alert(imageURI);
                    //$scope.imageURI = imageURI;

                    step.photoPath = imageURI;
                    // base 64 coding
                    //$cameraService.getPicture(dataurlOptions).then(function (imageURI) {
                    //    step.photoToBase64 = "data:image/jpeg;base64,"+imageURI;
                    //}, function (err) {
                    //    alert(err);
                    //});
                }, function (err) {
                    alert(err);
                });
            }
            /**
             * add Step
             */
            $scope.addStep=function(){
                console.log("countentCnt ="+$scope.newRecipe.steps.length);
                if($scope.newRecipe.steps.length > 9){
                    $ionicLoading.show({
                        template: '<i class="ion-ios-close-outline"></i> 최대 10개까지 가능합니다.'
                        , noBackdrop: true
                        , duration: 1500 });
                }else{
                    console.log($scope.newRecipe.steps);

                    $scope.newRecipe.steps.push({
                        step:$scope.newRecipe.steps.length + 1,
                        content:undefined,
                        photoPath:undefined
                    });
                    $ionicScrollDelegate.scrollBottom(true);
                }
            };
            /**
             * remove Step
             */
            $scope.removeStep = function(index){
                for(var i = index+1; i < $scope.newRecipe.steps.length; i++){
                    $scope.newRecipe.steps[i].step -= 1;
                }
                $scope.newRecipe.steps.splice(index,1);
                $ionicScrollDelegate.scrollBottom(true);
            }
            /**
             * add Complete Photo
             */
            $scope.addcompletePhoto = function(){
                console.log("add complete Photo");
                $scope.addCompPhoto = !$scope.addCompPhoto;
                $ionicScrollDelegate.scrollBottom(true);
            }

            /**
             * 레시피 미리보기
             */
            $scope.previewRecipe=function(){

                alert("미리보기");
            }

            /**
             * adding member Infomation
             * 현 날짜 yyyymmdd 추가
             */
            function addmemberInfo(){
                $scope.newRecipe.writer="userName";

                Date.prototype.yyyymmdd = function() {
                    var yyyy = this.getFullYear().toString();
                    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
                    var dd  = this.getDate().toString();
                    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
                };

                var date = new Date();
                $scope.newRecipe.registrationdate = date.yyyymmdd();
            }


            /**
             * 레시피 작성완료
             * postData go ! --- RESTful : Insert Recipe
             */

            $scope.submitRecipe=function(){

                if($scope.validateRecipe()) return;
                addmemberInfo();
                /**
                 * new Recipe Object = image file - Upload
                 */
                for( step in $scope.newRecipe.steps){

                    var options = {
                        fileKey : "files",
                        fileName :"image.png",
                        chunkedMode : false,
                        mimeType : "image/jpeg",
                        params : {
                            writer : "writer",
                            msg : "씨발 이제 되냐?",
                            step : step //index
                        }
                    };
                    $photouploadService.upload(options,step.photoPath);
                }
            }

            /**
             * Recipe Validation Check
             */
            $scope.validateRecipe = function(){
                if($scope.newRecipe.title===undefined){
                    alert("제목을 입력해주세요.");
                }
                if($scope.newRecipe.description===undefined){
                    alert("간단 설명을 입력해주세요.");
                }
                if($scope.newRecipe.materials===undefined){
                    alert("요리 재료 설명을 입력해주세요.");
                }
                if($scope.newRecipe.hashtag.length===0){
                    alert("태그를 입력해주세요.");
                }

                for( step in $scope.newRecipe.steps){
                    if(step.content ===undefined){
                        alert("Step." + (Number(step)+1)+ "에 해당하는 내용을 입력해주세요.");
                        return true;
                    }
                    if(step.photoPath===undefined){
                        alert("Step." + (Number(step)+1) + "에 해당하는 사진을 선택해주세요.");
                        return true;
                    }
                }

                return false;

            }
        }]);
