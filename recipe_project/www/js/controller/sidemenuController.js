angular.module('recipe.controllers')
    .controller('sidemenuCtrl', [
        '$scope',
        '$ionicSideMenuDelegate',
        '$location',
        '$signService',
        '$ionicModal',
        '$localStorage',
        function($scope, $ionicSideMenuDelegate, $location,$signService,$ionicModal,$localStorage) {

            /**
             *
             * @type {{sign_title: string, sign_status : boolean}}
             * sign_title : 로그인 버튼의 텍스트를 바꿔주기 위함
             * sign_status : 현재 로그인이 되어있는 상태인지 아닌지를 판별하기 위한 상태값
             */

            $ionicModal.fromTemplateUrl('template/signmodalTemplate.html', function($ionicModal) {
                $scope.signmodal = $ionicModal;
            }, {

                scope: $scope,

                animation: 'slide-in-up'
            });

            $scope.sign = {
                sign_title : '',
                sign_status : $localStorage.current_sign
            };

            if($scope.sign.sign_status === false){
                $scope.sign.sign_title = 'signIn'
            }else{
                $scope.sign.sign_title = 'signOut'
            }

            $scope.toggleLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
            };

            $scope.titleClick = function(){
                $location.path('/');
            };

            $scope.loginbtnClick = function(){

                if($localStorage.current_sign == false){
                    /**
                     * show modal for signup / signin
                     */
                    $scope.signmodal.show();

                }else{
                    $localStorage.current_sign = false;
                    $localStorage.user_email = '';
                    $localStorage.user_token = '';

                    /**
                     * just change sign status
                     */

                    $location.path('/');
                    console.log('로그아웃!');
                    $scope.sign.sign_status = $localStorage.current_sign;
                    $scope.sign.sign_title = 'signIn';
                }
            };

            $scope.$on('signstatusChange', function(){

                if($localStorage.current_sign == false){
                    $scope.sign.sign_title = 'signIn';
                }else{
                    $scope.sign.sign_title = 'signOut';
                }
            });

            $scope.$on('closeModal', function(event,data){
                $scope.signmodal.hide();
            });
            $scope.$on('opensignModal', function(event,data){
                $scope.signmodal.show();
            });

        }]);
