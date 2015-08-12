/**
 * Created by airnold on 15. 8. 11..
 */

angular.module('recipe.controllers')
    .controller('orderlistCtrl',[
        '$scope',
        function($scope){

            /**
             *
             * @type {{order_id: string, order_title: string, order_img: string, order_date: string, order_status: string, order_pay: string}}
             * orderlist를 resolve에서 가져온 후 넣어줘야 함
             * orderlist request service 필요함
             */

            $scope.orderlists = {
                order_id : '',
                order_title : '',
                order_img : '',
                order_date : '',
                order_status : '',
                order_pay : '',
                pay_by : true
            };
        }
    ]);