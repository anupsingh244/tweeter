(function() {
    'use strict';
    angular
        .module('myApp')
        .service('TwitrService', TwitrService);

    TwitrService.$inject = ['$http', '$localStorage', '$q'];

    function TwitrService($http, $localStorage, $q) {

        var deferred = $q.defer();
        var vm = this;

        vm.getTweet = function() {
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

        vm.insert = function(txttweet) {
            if (txttweet != '' && txttweet != undefined) {
                $localStorage.message.unshift({ name: txttweet });
                deferred.resolve($localStorage.message);
                console.log($localStorage.message);
            } else {
                deferred.reject($localStorage.message);
            }
            return deferred.promise;
        };

        vm.delete = function(tweet) {
            var index = $localStorage.message.indexOf(tweet)
            $localStorage.message.splice(index, 1);
            deferred.resolve($localStorage.message);
            return deferred.promise;
        };
    }
})();
