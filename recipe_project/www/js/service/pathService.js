/**
 * Created by airnold on 15. 8. 24..
 */


angular.module('recipe.services')
    .factory('$pathService', [
        function () {

            var next_path = undefined;
            var previous_path = undefined;
            var path_service = {};


            path_service.setnextPath = function(savepath){
                next_path = savepath;
            };
            path_service.getnextPath = function(){
                return next_path;
            };

            path_service.setpreviousPath = function(savepath){
                previous_path = savepath;
            };
            path_service.getpreviousPath = function(){
                return previous_path;
            };
            return path_service;

        }
    ]);
