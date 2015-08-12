/**
 * Created by airnold on 15. 8. 6..
 */


angular.module('recipe.controllers')
    .controller('signmodalCtrl', [
        '$scope',
        '$signService',
        '$rootScope',
        function($scope,$signService, $rootScope){

            $scope.create_account = true;
            $scope.sign_title = '로그인';

            $scope.signin = function(){

                $signService.setsignStatus(true);
                $signService.signmodalClose();

                $rootScope.$broadcast('signstatusChange');
            };
            $scope.signup = function(){

            };

            $scope.create = function(){
                $scope.create_account = false;
                $scope.sign_title = '회원가입';
            };


            /**
             *
             * @type {auto_signin : boolean}
             * auto_signin에 따라서 local storage 에 너을지 말지를 판단
             */
            $scope.auto_signin = false;
            $scope.autosigninChange = function(){
                console.log($scope.auto_signin);
            };

            /**
             * signin json data
             * @type {{id: string, passwd: string}}
             * need validation check
             */
            var signin_info = {
                id : '',
                passwd : ''
            };

            /**
             * signup json data
             * @type {{id: string, nickname: string, passwd: string}}
             * need validation check
             */

            var signup_info = {
                id : '',
                nickname : '',
                passwd : '',
                passwd_check : ''
            };



            $scope.closeModal = function(){
                $scope.$emit('closeModal');
            }

        }]);
