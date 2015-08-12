/**
 * Created by airnold on 15. 8. 6..
 */



angular.module('recipe.services')
    .factory('$signService', [
        '$http',
        '$window',
        function ($http, $window) {

            var user_input_signdata = {};

            var sign_status = false;
            var dialog = undefined;

            var user_sign_info = {};

            /*admin_sign.compare_sign = function(modal_data){
             var sign_result = comparesigndata(modal_data, tempsign_data);
             if(sign_result === true){
             this.set_sign_status(true);

             }else{
             this.set_sign_status(false);
             this.set_sign_message(sign_result);
             }
             };*/

            /**
             *
             * set get signstatus
             *
             */
            user_sign_info.setsignStatus = function (status) {
                sign_status = status;
            };

            user_sign_info.getsignStatus = function () {
                return sign_status;
            };



            user_sign_info.signinhttpRequest = function (signin_json) {
                user_input_signdata = signin_json;

                /**
                 * this function request to node server for getting user sign id or passwd
                 * compare sign data between db data and user input id passwd
                 * finally, setting sign status and save to local storage
                 */

            };

            user_sign_info.signuphttpRequest = function (signup_json) {
                user_input_signdata = signup_json;

                /**
                 * sign up http request for join this application
                 * after this request, save localstorage and automatically signin service
                 */

            };

            return user_sign_info;

        }]);

/*
 function comparesigndata(modal_data , tempsign_data){

 if(modal_data.id === tempsign_data.id){
 if(modal_data.password === tempsign_data.password){
 return true;
 }else{
 return  'Please Check your Password';
 }
 }else{
 return 'Please Check your ID';
 }
 }*/
