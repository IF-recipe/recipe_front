/**
 * Created by airnold on 15. 8. 7..
 */

angular.module('recipe.services')
    .factory('$profileService', [
        '$http',
        '$localStorage',
        '$q',
        function ($http,$localStorage,$q) {

            var user_profile = {};
            var profile_service = {};


            profile_service.profileRequest = function(){
                console.log('aaa');


                /**
                 * profile request http request using profile_info
                 *
                 * profile_service.setuserProfile(getdata);
                 */



                var url = 'http://localhost:3000/rest/member/'+$localStorage.user_email;
                var defer = $q.defer();
                console.log(url);
                $http.get(url)
                    .success(function(data,status,headers, config){

                    defer.resolve(data);
                    })
                    .error(function(data, status, headers, config){
                        console.log(data);
                });
                return defer.promise;
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
