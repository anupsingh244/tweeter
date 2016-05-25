(function() {
    'use strict';
    angular
        .module('myApp')
        .service('TwitrService', TwitrService);

    TwitrService.$inject = ['$http', '$q', 'authentication'];

    function TwitrService($http, $q, authentication) {

        var vm = this;
        vm.limit=0;
        vm.getTweet = function() {
            vm.limit=0;
            var deferred = $q.defer();
            var Query = authentication.stack.ContentType("tweets").Query();
            Query
                .find()
                .descending('created_at')
                .limit(2)
              //  .skip(2)
                .then(function(data) {
                    deferred.resolve(data.entries);
                    console.log("datafromapi", data.entries);
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

        vm.loadMore =function(){
            
             var deferred = $q.defer();
            var Query = authentication.stack.ContentType("tweets").Query();
            Query
                .find()
                .descending('created_at')
                .limit(3)
               .skip(2 +vm.limit)
                .then(function(data) {
                    deferred.resolve(data.entries);
                    console.log("datafromapi", data.entries);
                }, function(err) {
                    deferred.resolve(err);
                    console.error('Error : ', err);
                })
            vm.limit = vm.limit + 3;
            return deferred.promise;
        }
    };

})();
