(function() {
    'use strict';
    angular
        .module('myApp')
        .directive('tweetDirective', tweetDirective);

    function tweetDirective() {

        return {
            restrict: 'E',
            scope: {
                data: "=",
                addclass: "=",
                remove: "=",
                deletetweet: "&",
                modal: "@",
                limit: "="
                    //passing a parameterised function to directive is bit tricky and needs to follow these steps
            },
            templateUrl: 'tweetbar.html',
            link: function(scope, element, attrs) {
                var passUid = scope.deletetweet();
                scope.invokeDelete = function(x, y) {
                    passUid(x, y);
                };
                scope.tweet2Modal = function(a, b, c) {
                    scope.popuptweet = a;
                    scope.popupcreated = b;
                    scope.popupurl = c;
                };

            }
        };


    }
})();
