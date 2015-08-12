angular.module('recipe.directive')
    .directive('addrecipeContent', function () {
        return {
            restrict: 'E',
            template: '<p>{{text}}</p>',
            scope: {
                text: '@text'
            },
            link:function(scope,element){
                $( element ).click(function(){
                    // does not compile :(
                    $(this).parent().append("<test text='n'></test>");
                });
            }
        };
    });