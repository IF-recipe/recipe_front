/**
 * Created by airnold on 15. 8. 7..
 */

angular.module('recipe.services')
    .factory('$profileService', [
        '$http',
        function ($http) {

            var user_profile = {};
            var profile_service = {};


            profile_service.profileRequest = function(profile_info){
                /**
                 * profile request http request using profile_info
                 *
                 *
                 *
                 * profile_service.setuserProfile(getdata);
                 */


            };

            profile_service.getuserProfile = function(){
                return user_profile;
            };

            profile_service.setuserProfile = function(get_profile_http_data){
                user_profile = get_profile_http_data;
            };

            profile_service.getdeliveryOnly = function(){
                return user_profile.address;
            };

            return profile_service;


        }
    ]);
