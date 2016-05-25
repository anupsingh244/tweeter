(function() {
    'use strict';
    angular
        .module('myApp')
        .service('TwitrService', TwitrService);

    TwitrService.$inject = ['$http', '$q', 'authentication'];

    function TwitrService($http, $q, authentication) {

        var vm = this;

        vm.getTweet = function() {
            var deferred = $q.defer();
            var Query = authentication.stack.ContentType("tweets").Query();
            Query
                .find()
                .ascending('created_at')
                .limit(10)
                .then(function(data) {
                    deferred.resolve(data.entries);
                    console.log("datafromapi", data.entries);
                    //  UID=data.entries.uid;
                }, function(err) {
                    deferred.resolve(err);
                    console.error('Error : ', err);
                })

            return deferred.promise;
        };

        vm.setTweet = function(txttweet) {
            var deferred = $q.defer();
            var config = {
                method: 'POST',
                url: authentication.URL,
                headers: authentication.stack.headers,
                contentType: 'application/json',
                data: {
                    "entry": {
                        "title": txttweet,
                        "url": "/newtweet",
                        "status": false
                    }
                }
            };
            $http(config).then(function successCallback(res) {
                deferred.resolve(res);
            }, function errorCallback(err) {
                console.log(err);
            });
            return deferred.promise;
            console.log(deferred.promise);
        };

        vm.deleteTweet = function(tweetuid) {
            var deferred = $q.defer();
            var config = {
                method: 'DELETE',
                url: authentication.URL + '/' + tweetuid,
                headers: authentication.stack.headers,
            };
            $http(config).then(function successCallback(res) {
                deferred.resolve(res);
                console.log(res);
            }, function errorCallback(err) {
                console.log(err);
            });
            return deferred.promise;
        };
    };

})();
