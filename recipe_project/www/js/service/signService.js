/**
 * Created by airnold on 15. 8. 6..
 */



angular.module('recipe.services')
    .factory('$signService', [
        '$http',
        '$window',
        '$q',
        '$localStorage',
        function ($http, $window, $q,$localStorage) {

            var user_email = $localStorage.user_email;

            var sign_status = $localStorage.current_sign;

            var user_sign_info = {};

            /**
             *
             * set get signstatus
             *
             */
            /*user_sign_info.setsignStatus = function (status) {
                sign_status = status;
            };

            user_sign_info.getsignStatus = function () {
                return sign_status;
            };
*/
            user_sign_info.signinhttpRequest = function (signin_json) {


                /**
                 * this function request to node server for getting user sign id or passwd
                 * compare sign data between db data and user input id passwd
                 * finally, setting sign status and save to local storage
                 */

                var defer = $q.defer();
                $http({
                    url:"http://localhost:3000/rest/sign/signin",
                    method : 'post',
                    data : {'data' : signin_json}
                }).success(function(data,status,headers, config){
                    defer.resolve(data);
                }).error(function(data, status, headers, config){
                    $window.alert(data);
                });
                return defer.promise;
            };

            user_sign_info.signuphttpRequest = function (signup_json) {

                var defer = $q.defer();
                $http({
                    url:"http://localhost:3000/rest/sign/signup",
                    method : 'post',
                    data : {'data' : signup_json}
                }).success(function(data,status,headers, config){
                    defer.resolve(data);
                }).error(function(data, status, headers, config){
                    $window.alert(data);
                });
                return defer.promise;

                /**
                 * sign up http request for join this application
                 * after this request, save localstorage and automatically signin service
                 */

            };
            user_sign_info.signupcheckemailRequest = function(signup_email){

                var defer = $q.defer();
                $http({
                    url:"http://localhost:3000/rest/sign/signup/idcheck?email="+signup_email,
                    method : 'get'
                }).success(function(data,status,headers, config){

                    defer.resolve(data);
                }).error(function(data, status, headers, config){
                    $window.alert(data);
                });
                return defer.promise;
            };

            user_sign_info.setuserEmail = function(email){

                user_email = email;
            };
            user_sign_info.getuserEmail = function(){
                return user_email;
            };


            return user_sign_info;

        }]);