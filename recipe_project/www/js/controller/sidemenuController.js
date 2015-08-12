angular.module('recipe.controllers')
    .controller('sidemenuCtrl', [
        '$scope',
        '$ionicSideMenuDelegate',
        '$location',
        '$signService',
        '$ionicModal',
        function($scope, $ionicSideMenuDelegate, $location,$signService,$ionicModal) {


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
                sign_status : $signService.getsignStatus()
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

                if($scope.sign.sign_status == false){
                    /**
                     * show modal for signup / signin
                     */
                    $scope.signmodal.show();

                }else{

                    $signService.setsignStatus(false);
                    /**
                     * just change sign status
                     */
                    $scope.sign.sign_status = $signService.getsignStatus();
                    $scope.sign.sign_title = 'signIn';
                }
            };

            $scope.$on('signstatusChange', function(){
                $scope.sign.sign_status = $signService.getsignStatus();
                $scope.sign.sign_title = 'signOut';
            });

            $scope.$on('closeModal', function(event,data){
                $scope.signmodal.hide();
            })


        }]);
