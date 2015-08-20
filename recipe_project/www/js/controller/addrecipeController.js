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
        '$cordovaFileTransfer',
        function($scope, $ionicScrollDelegate, $ionicLoading, $cameraService, $cordovaFileTransfer) {


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
                    $scope.inputTag=undefined;
                }
            }

            $scope.removeTag = function(index){
                $scope.newRecipe.hashtag.splice(index,1);
            }




            /**
             * camera & album getting img
             */
                //using camera module
            $scope.getPhoto = function(step,sourceType) {
                var options={
                    quality: 80,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: undefined,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 600,
                    targetHeight: 600,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                    //,correctOrientation : true
                };
                if(sourceType==0){
                    console.log("getting Camera");
                    options.sourceType=Camera.PictureSourceType.CAMERA;
                }else{
                    console.log("getting album");
                    options.sourceType=Camera.PictureSourceType.PHOTOLIBRARY;
                    //options.sourceType=Camera.PictureSourceType.SAVEDPHOTOALBUM;
                }
                $cameraService.getPicture(options).then(function (imageURI) {
                    alert(imageURI);
                    step.photoPath = imageURI;
                }, function (err) {
                    alert(err);
                });
            }



            /**
             * Input form 추가
             */
            $scope.addinputForm=function(){
                console.log("countentCnt ="+$scope.newRecipe.steps.length);
                if($scope.newRecipe.steps.length > 9){
                    $ionicLoading.show({
                        template: '<i class="ion-ios-close-outline"></i> 최대 10개까지 가능합니다.'
                        , noBackdrop: true
                        , duration: 2000 });
                }else{
                    console.log($scope.newRecipe.steps);

                    $scope.newRecipe.steps.push({
                        step:$scope.newRecipe.steps.length + 1,
                        content:undefined,
                        photoPath:undefined
                    });

                    console.log($scope.newRecipe.steps);
                    $ionicScrollDelegate.scrollBottom(true);
                }
            };



            /**
             * 레시피 미리보기
             */
            $scope.previewRecipe=function(){
                var f = new FileTransfer();

                alert("미리보기");
            }



            /**
             * 레시피 작성완료
             * postData go ! --- RESTful : Insert Recipe
             */

            //document.addEventListener('deviceready', function () {
            //
            //}, false);
            $scope.submitRecipe=function(){
                //alert($scope.newRecipe);
                $scope.newRecipe.writer="userName";

                Date.prototype.yyyymmdd = function() {
                    var yyyy = this.getFullYear().toString();
                    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
                    var dd  = this.getDate().toString();
                    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
                };

                var date = new Date();
                alert($scope.newRecipe.steps[0].photoPath);
                $scope.newRecipe.registrationdate = date.yyyymmdd();

                /**
                 * new Recipe Object = image file - Upload
                 */
                var url = "http://14.63.171.30:3000/rest/photo/recipe/upload";
                //target path may be local or url
                var targetPath = $scope.newRecipe.steps[0].photoPath;
                var filename = targetPath.split("/").pop();
                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpg",
                    description : "uplpad from my phone"
                };

                $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                    alert("SUCCESS: " + JSON.stringify(result.response));
                    //alert("success");
                    //alert(JSON.stringify(result.response));
                }, function(err) {
                    alert("ERROR: " + JSON.stringify(err));
                    //alert(JSON.stringify(err));
                }, function (progress) {
                    alert("progress");
                    // constant progress updates
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    })
                });
            }
        }]);
