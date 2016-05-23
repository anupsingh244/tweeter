(function() {
    'use strict';
    angular
        .module('myApp')
        .service('TwitrService', TwitrService);

    TwitrService.$inject = ['$http','$q'];

    function TwitrService($http, $q) {

        var vm = this;
        var Stack = Contentstack.Stack({
            'api_key': 'blt0624b335c13a74e8',
            'access_token': 'blt853f379d7018f7287b7d7ac5',
            'environment': ''
        });

        var credentials = {
            "api_key": "blt0624b335c13a74e8",
            "authtoken": "blta265c80c31bcc8e98d577c66"
        };

        var urlPath = 'https://api.contentstack.io:443/v2/content_types/tweets/entries';

        vm.getTweet = function() {
            var deferred = $q.defer();
            var Query = Stack.ContentType("tweets").Query();
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

        vm.tweetInsert = function(txttweet) {
            var deferred = $q.defer();
            var config = {
                method: 'POST',
                url: urlPath,
                headers: credentials,
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

        vm.tweetDelete = function(tweetuid) {
            var deferred = $q.defer();
            var config = {
                method: 'DELETE',
                url: urlPath + '/' + tweetuid,
                headers: credentials,
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
