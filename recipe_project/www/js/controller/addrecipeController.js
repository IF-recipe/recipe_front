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
        '$cordovaFile',
        'cameraService',
        '$cordovaFileTransfer',
        function($scope, $ionicScrollDelegate, $ionicLoading, $cordovaFile, cameraService, $cordovaFileTransfer) {


            $scope.foodkinds=["한식","중식","양식","일식"];
            $scope.newRecipe={};
            $scope.newRecipe.steps=[];
            $scope.newRecipe.steps.push({
                step:1,
                content: undefined,
                photoPath: undefined,
            });
            /**
             * camera & album getting img
             */
                //using camera module
            $scope.getPhoto = function(step,sourceType) {
                var options={
                    quality: 80,
                    destinationType: Camera.DestinationType.NATIVE_URI,
                    sourceType: undefined,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.PNG,
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
                }
                cameraService.getPicture(options).then(function (imageURI) {
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
                alert("미리보기");
            }
            /**
             * 레시피 작성완료
             * postData go ! --- RESTful : Insert Recipe
             */
            $scope.submitRecipe=function(){
                alert($scope.newRecipe);

                /**
                 * new Recipe Object = image file - Upload
                 */
                var url = "http://your_ip_address/uploads/upload.php";
                //target path may be local or url
                var targetPath = "http://your_ip_address/images/my.jpg";
                var filename = targetPath.split("/").pop();
                var options = {
                    fileKey: "file",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpg"
                };
                $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                    console.log("SUCCESS: " + JSON.stringify(result.response));
                    alert("success");
                    alert(JSON.stringify(result.response));
                }, function(err) {
                    console.log("ERROR: " + JSON.stringify(err));
                    alert(JSON.stringify(err));
                }, function (progress) {
                    // constant progress updates
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    })
                });
            }
        }]);
