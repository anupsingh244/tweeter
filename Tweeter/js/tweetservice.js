(function() {
    'use strict';
    angular
        .module('myApp')
        .service('TwitrService', TwitrService);

    TwitrService.$inject = ['$http', '$localStorage', '$q'];

    function TwitrService($http, $localStorage, $q) {

        var vm = this;

        vm.getTweet = function() {
            var deferred = $q.defer();
            if ($localStorage.message == undefined || $localStorage.message.length <= 0) {
                return $http.get('save.json')
                    .then(function(response) {
                        $localStorage.message = response.data;
                        $localStorage.message = $localStorage.message;
                        return $localStorage.message;
                    });
            } else {
                deferred.resolve($localStorage.message);
                return deferred.promise;
            }
        };

        vm.tweetInsert = function(txttweet) {
            var deferred = $q.defer();
            if (txttweet != '' && txttweet != undefined) {
                $localStorage.message.unshift({ name: txttweet });
                deferred.resolve($localStorage.message);
                console.log($localStorage.message);
            } else {
                deferred.reject($localStorage.message);
            }
            return deferred.promise;
        };

        vm.tweetDelete = function(tweetindex) {
          //  var deferred = $q.defer();
            $localStorage.message.splice(tweetindex, 1);
           // deferred.resolve($localStorage.message);
          //  return deferred.promise;
        };
    }
})();
