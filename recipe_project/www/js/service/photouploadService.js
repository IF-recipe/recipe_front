/**
 * Created by parkbeomsoo on 15. 8. 24..
 */
angular.module('recipe.services')
    .factory('$photouploadService', [
        '$cordovaFileTransfer',
        function ($cordovaFileTransfer) {
            var url = "http://14.63.169.140:3500/rest/photo/recipe/upload";
            var photoUpload = {};
            var options= undefined;

            photoUpload.upload = function(options,photoPath){
                this.options = options;
                if(options===undefined){
                    alert("try it after optionSetting complete.");
                    return;
                }
                $cordovaFileTransfer.upload(url, photoPath, options).then(function(result){
                    alert("success");
                    alert(result);
                },function(err){
                    alert("err");
                    alert(err);
                });
            }
            return photoUpload;
        }]);
