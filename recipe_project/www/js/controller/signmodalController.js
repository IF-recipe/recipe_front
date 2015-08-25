/**
 * Created by airnold on 15. 8. 6..
 */


angular.module('recipe.controllers')
    .controller('signmodalCtrl', [
        '$scope',
        '$signService',
        '$rootScope',
        '$ionicLoading',
        '$timeout',
        '$localStorage',
        '$location',
        '$pathService',
        '$window',
        '$state',
        function($scope,$signService, $rootScope, $ionicLoading,$timeout, $localStorage,$location,$pathService,$window, $state){

            $scope.create_account = true;
            $scope.sign_title = '로그인';
            $scope.checkemail = undefined;
            $scope.signin_check = undefined;

            /**
             *
             * @type {auto_signin : boolean}
             * auto_signin에 따라서 local storage 에 너을지 말지를 판단
             */
            $scope.auto_signin = false;

            /**
             * signin json data
             * @type {{email: string, passwd: string}}
             * need validation check
             */
            $scope.signin_info = {
                email : '',
                passwd : ''
            };

            $scope.signin = function(){

                $ionicLoading.show({
                    showBackdrop: false,
                    showDelay: 0,
                    template : '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>'
                });


                var temp = {};
                temp.email = $scope.signin_info.email;
                temp.password = $scope.signin_info.passwd;
                temp.auto_signin = $scope.auto_signin;

                $signService.signinhttpRequest(temp).then(function(sign_response_data){
                    if(sign_response_data.sign_status === true){
                        /**
                         * id passwd 확인 메시지 꺼주기
                         * @type {boolean}
                         */
                        $scope.signin_check = false;

                        /**
                         * token을 로컬 스토리지에 담아주고
                         * 추후 요청될 기본 정보를 담아준다
                         */
                        $localStorage.user_token=sign_response_data.sign_token;
                        $localStorage.auto_sign_status = $scope.auto_signin;
                        $localStorage.user_email = $scope.signin_info.email;
                        $localStorage.current_sign = true;

                        $rootScope.$broadcast('signstatusChange');

                        $timeout(function () {

                            $scope.signup_info.email = '';
                            $scope.signup_info.name = '';
                            $scope.signup_info.passwd = '';
                            $scope.signup_info.passwd_check = '';

                            $scope.signin_info.email = '';
                            $scope.signin_info.passwd = '';
                            $scope.auto_signin = false;

                            var temp = $pathService.getnextPath().split('/#');
                            console.log('signincheck');
                            $location.path(temp[1]);

                            $ionicLoading.hide();

                            $scope.$emit('closeModal');

                        }, 1000);

                    }else{
                        /**
                         * 로그인 실패
                         * 값 넣어주기
                         */
                        $timeout(function () {

                            $ionicLoading.hide();

                        }, 1000);
                        $scope.signin_check = true;
                    }
                });
            };

            $scope.autosigninChange = function(){
                console.log($scope.auto_signin);

            };

            $scope.create = function(){
                $scope.create_account = false;
                $scope.sign_title = '회원가입';
            };

            /**
             * signup json data
             * @type {{email: string, name: string, passwd: string}}
             * need validation check
             */

            $scope.signup_info = {
                email : '',
                name : '',
                passwd : '',
                passwd_check : ''
            };

            $scope.closeModal = function(){

                $scope.signup_info.email = '';
                $scope.signup_info.name = '';
                $scope.signup_info.passwd = '';
                $scope.signup_info.passwd_check = '';

                $scope.signin_info.email = '';
                $scope.signin_info.passwd = '';

                $scope.create_account = true;
                $scope.checkemail = undefined;

                $scope.auto_signin = false;

                var temp = $pathService.getnextPath().split('/#');

                if(temp[1] == '/addrecipe' || temp[1] == '/searchrecipe'){
                    $state.go('recipeall');
                }else{
                    $location.path('/');
                }
                $scope.$emit('closeModal');
            };


            $scope.signupemailCheck = function(){

                /**
                 * 이부분에서 회원가입 이메일 체크하면 된다.
                 */
                $signService.signupcheckemailRequest($scope.signup_info.email).then(function(data){
                    if(data === true){
                        /**
                         * 아이디 중복 없음 다음 진행
                         */
                        $scope.checkemail = 'available';
                        console.log(data);
                    }else{
                        /**
                         * 아이디 중복!
                         */
                        console.log(data);
                        $scope.checkemail = 'duplicate';
                        var idinput = angular.element('#idinput');
                        idinput.focus();
                    }
                });

            };

            $scope.signup = function(){

                $ionicLoading.show({
                    showBackdrop: false,
                    showDelay: 0,
                    template : '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>'
                });

                $timeout(function () {
                    $ionicLoading.hide();

                    $scope.create_account = true;
                    $scope.signup_info.email = '';
                    $scope.signup_info.name = '';
                    $scope.signup_info.passwd = '';
                    $scope.signup_info.passwd_check = '';

                    $scope.signin_info.email = '';
                    $scope.signin_info.passwd = '';
                    $scope.auto_signin = false;

                }, 1000);

                var temp = {};
                temp.email = $scope.signup_info.email;
                temp.name = $scope.signup_info.name;
                temp.password = $scope.signup_info.passwd;

                $signService.signuphttpRequest(temp).then(function(data){
                    console.log(data);
                });

            };

        }]);
