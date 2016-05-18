(function() {
    'use strict';
    angular
        .module('myApp')
        .directive('tweetDirective', tweetDirective);
    function tweetDirective() {
        
        return {
           // bindToController: true,
       //    controller: TwitrController,
       //    controllerAs: 'tc',
         //   link: link,
            restrict: 'E',
          //  replace: true,
            scope: {
            	data:"=",
                addclass:"=",
                remove:"=",
                deletetweet:"&"
            },
            templateUrl: 'tweetband.html',
            link:function(scope, element, attrs){
                var obj = scope.deletetweet();
                scope.myfunction = function(x){
                  console.log("scope function");
                  obj(x);

                }
            
            }
        };

     
    }
})();