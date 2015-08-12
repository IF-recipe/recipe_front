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
    'recipe.directive',
    'ng-mfb'
])

.run(['$ionicPlatform',
        '$q',
        '$http',
        '$rootScope',
        '$location',
        '$window',
        '$timeout',
        function($ionicPlatform, $q, $http, $rootScope, $location, $window, $timeout) {
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

            /*$rootScope.$on("$locationChangeStart", function(event, next, current){
                $rootScope.error = null;
                console.log("Route change!!!", $location.path());
                var path = $location.path();

                console.log("App Loaded!!!");
            });*/
        }])


.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('recipeall', {
                url: "/",
                templateUrl: "template/recipeallTemplate.html",
                controller:"recipeallCtrl"
            })
            /*.state('showrecipe', {
                url: "/showrecipe",
                templateUrl: "template/showrecipeTemplate.html"
            })*/
            .state('myprofile', {
                url: "/myprofile",
                templateUrl: "template/myprofileTemplate.html"
            })
            .state('deliverybook', {
                url: "/deliverybook",
                templateUrl: "template/deliverybookTemplate.html"
            })
            .state('orderlist', {
                url: "/orderlist",
                templateUrl: "template/orderlistTemplate.html"
            })
            .state('orderdetail', {
                url: "/orderdetail",
                templateUrl: "template/orderdetailTemplate.html"
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
                templateUrl: "template/addrecipeTemplate.html"
            })
            .state('previewrecipe', {
                url: "/previewrecipe",
                templateUrl: "template/previewrecipeTemplate.html"
            });

        $urlRouterProvider.otherwise("/");
});

angular.module('recipe.controllers', []);

angular.module('recipe.services', []);

angular.module('recipe.directive', []);
