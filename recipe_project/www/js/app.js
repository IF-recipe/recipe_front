// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('recipe', [
    'ionic',
    'recipe.controllers',
    'recipe.services',
    'recipe.directives',
    'ng-mfb',
    'ngCordova',
    'ngStorage',
    'angular-jwt'
])

    .run(['$ionicPlatform',

        '$localStorage',
        '$rootScope',
        '$location',
        '$pathService',
        function ($ionicPlatform, $localStorage, $rootScope, $location,$pathService) {
            var auto_sign_storage = $localStorage.auto_sign_data;
            if (auto_sign_storage === undefined) {

                $localStorage = $localStorage.$default({
                    auto_sign_status: false,
                    user_token: '',
                    user_email: '',
                    current_sign: false
                });
            } else {

                console.log('yes');
            }

            $rootScope.$on("$locationChangeStart", function (event, next, current) {

                var s_status = $localStorage.current_sign;
                var currentUrl = $location.path();
                $pathService.setnextPath(next);
                $pathService.setpreviousPath(currentUrl);

                if (s_status == true) {
                    /**
                     * 로그인 되어있는 상태 바로 이동
                     */
                    $location.path(currentUrl);
                } else {
                    /**
                     * 로그인이 안되어있는 상태
                     */
                    if (currentUrl == '/' || currentUrl == '' ||  currentUrl == '/searchrecipe') {
                        /**
                         * 로그인 없이사용할 수 있는 서비스
                         */
                        $location.path(currentUrl);
                    }else{
                        /**
                         * 로그인 없이 불가능한 서비스
                         */
                        event.preventDefault();
                        $rootScope.$broadcast('opensignModal');
                    }
                }
            });

            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleLightContent();
                }
            });


        }])


    .config(function ($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider, $provide) {




        jwtInterceptorProvider.tokenGetter = ['$localStorage', function ($localStorage) {
            return $localStorage.user_token;
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

        $httpProvider.interceptors.push(['$q','$window','$localStorage','$rootScope', function($q, $window, $localStorage,$rootScope) {

            return {
                'response': function (response) {
                    //Will only be called for HTTP up to 300
                    return response;
                },
                'responseError': function (rejection) {
                    if(rejection.status === 401) {
                        console.log('401 error ');
                        /*location.reload();*/
                        $localStorage.current_sign = false;
                        $rootScope.$broadcast('signstatusChange');

                    }
                    return $q.reject(rejection);
                }
            };

        }]);


        $stateProvider
            .state('recipeall', {
                url: "/",
                templateUrl: "template/recipeallTemplate.html",
                controller: "recipeallCtrl"
            })
            /*.state('showrecipe', {
             url: "/showrecipe",
             templateUrl: "template/showrecipeTemplate.html"
             })*/
            .state('myprofile', {
                url: "/myprofile",
                templateUrl: "template/profileTemplate.html",
                controller: 'profileCtrl',
                resolve: {

                    profile_data: function ($profileService) {
                        return $profileService.profileRequest().then(function (data) {
                            return data;
                        })
                    }
                }
            })
            .state('deliverybook', {
                url: "/deliverybook",
                templateUrl: "template/deliverybookTemplate.html",
                controller: 'deliverybookCtrl'
            })
            .state('orderlist', {
                url: "/orderlist",
                templateUrl: "template/orderlistTemplate.html",
                controller: 'orderlistCtrl'
            })
            .state('orderdetail', {
                url: "/orderdetail/:orderId",
                templateUrl: "template/orderdetailTemplate.html",
                controller: 'orderdetailCtrl'
            })
            .state('searchrecipe', {
                url: "/searchrecipe",
                templateUrl: "template/searchrecipeTemplate.html"
            })
            .state('searchresult', {
                url: "/searchresult",
                templateUrl: "template/searchresultTemplate.html"
            })
            .state('addrecipe', {
                url: "/addrecipe",
                templateUrl: "template/addrecipeTemplate.html",
                controller: 'addrecipeCtrl'
            })
            .state('previewrecipe', {
                url: "/previewrecipe",
                templateUrl: "template/previewrecipeTemplate.html"
            });

        $urlRouterProvider.otherwise("/");

    });

angular.module('recipe.controllers', []);

angular.module('recipe.services', []);

angular.module('recipe.directives', []);
