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
        '$http',
        '$cordovaFile',
        function($scope, $ionicScrollDelegate, $ionicLoading, $cameraService, $photouploadService, $http, $cordovaFile) {

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

            $scope.newRecipe.compleStep = {
                photoPath : undefined,
                content : undefined,
                step : 0
            };

            $scope.addTag = function(event){
                if( $scope.inputTag === "" || $scope.inputTag === undefined) return;

                if(event.keyCode ===13 || event.keyCode == 32){

                    if($scope.newRecipe.hashtag.length==5){
                        $ionicLoading.show({
                            template: '<i class="ion-ios-close-outline"></i> 해시태그는 5개까지 가능합니다.'
                            , noBackdrop: true
                            , duration: 2000 });
                        return;
                    }else{
                        for(var i in $scope.newRecipe.hashtag){
                            if($scope.inputTag === $scope.newRecipe.hashtag[i].name) {
                                $scope.inputTag = undefined;
                                $ionicLoading.show({
                                    template: '<i class="ion-ios-close-outline"></i> 이미 존재하는 태그입니다.'
                                    , noBackdrop: true
                                    , duration: 2000 });
                                return;
                            }
                        }
                    }
                    $scope.newRecipe.hashtag.push({
                        name : $scope.inputTag.replace(" ","")
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
            $scope.getPhoto = function(step, sourceType) {
                var options={
                    quality: 75,
                    destinationType: Camera.DestinationType.NATIVE_URI,
                    sourceType : undefined,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 350,
                    targetHeight: 350,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                    //,mediaType : Camera.MediaType.PICTURE
                    //,correctOrientation : true
                };

                if(sourceType === 1){
                    options.sourceType = Camera.PictureSourceType.CAMERA;
                }else{
                    options.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                }

                $cameraService.getPicture(options).then(function (imageURI) {
                    alert(imageURI);
                    // 사진 경로 조정
                    var photoPath = imageURI.split("?");
                    var originfileName = photoPath[0].substring(photoPath[0].lastIndexOf('/')+1);
                    var newfileName = step.step+".jpg";

                    alert(originfileName);
                    alert(dir);
                    alert(newfileName);

                    alert(cordova.file.externalCacheDirectory);
                    step.photoPath = imageURI;
                    if(ionic.Platform.isAndroid()){
                        $cordovaFile.copyFile(cordova.file.externalCacheDirectory, originfileName, cordova.file.externalCacheDirectory, newfileName)
                            .then(function (success) {
                                // success
                                alert("success");
                                step.photoPath = cordova.file.externalCacheDirectory + newfileName;
                            }, function (error) {
                                alert("err");
                            });
                    }else{
                        if(ionic.Platform.isIOS()){
                            alert("IOS")
                        }
                    }
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

                    //$ionicScrollDelegate.scrollBottom(true);
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
                $scope.recipeId=undefined;
                if($scope.validateRecipe()) return;
                sendnewRecipe($scope.newRecipe);
            }

            /**
             * Recipe Validation Check
             */
            validateRecipe = function(){
                if($scope.newRecipe.title===undefined || $scope.newRecipe.title==""){
                    alert("제목을 입력해주세요.");
                }
                if($scope.newRecipe.description===undefined || $scope.newRecipe.description==""){
                    alert("간단 설명을 입력해주세요.");
                }
                if($scope.newRecipe.stuffs===undefined || $scope.newRecipe.stuffs==""){
                    alert("요리 재료 설명을 입력해주세요.");
                }
                if($scope.newRecipe.hashtag.length===0){
                    alert("태그를 입력해주세요.");
                }

                for( var i = 0 ; i < $scope.newRecipe.steps.length ; i++){
                    if($scope.newRecipe.steps[i].content ===undefined){
                        alert("Step." + (Number(step)+1)+ "에 해당하는 내용을 입력해주세요.");
                        return true;
                    }
                    if($scope.newRecipe.steps[i].photoPath===undefined){
                        alert("Step." + (Number(step)+1) + "에 해당하는 사진을 선택해주세요.");
                        return true;
                    }
                }
                return false;
            }
            /**
             * $http
             */
            sendnewRecipe = function(recipe){
                alert("sendnewRecipe ---- 글데이터 : "+ $scope.newRecipe.steps.length);
                var url = "http://14.63.169.140:3500/rest/recipe/add";
                //var url = "http://localhost:3500/rest/recipe/add";
                //alert(url);
                recipe.steps.splice(0,0, $scope.newRecipe.compleStep);
                $http.post(url, recipe).then(function(res){;
                    console.log(res.data);
                    /**
                     * send step photo Path -- file upload
                     * res.data
                     *  --> 등록 recipe의 Mongo _id값을 가지고 있음.
                     */
                    for( var i = 0 ; i < $scope.newRecipe.steps.length ; i++){
                        var options = {
                            fileKey : "files",
                            fileName :"image.png",
                            chunkedMode : false,
                            mimeType : "image/jpeg",
                            params : {
                                recipeId : res.data._id,
                                stepId : res.data.steps[i]._id
                            }
                        };
                        $photouploadService.upload(options, $scope.newRecipe.steps[i].photoPath);
                    }
                }).then(function(){
                    recipe.steps.splice(0,1);
                });
            }
        }]);
