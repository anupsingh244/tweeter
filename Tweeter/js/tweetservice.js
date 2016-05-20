(function() {
    'use strict';
    angular
        .module('myApp')
        .service('TwitrService', TwitrService);

    TwitrService.$inject = ['$http', '$localStorage', '$q'];

    function TwitrService($http, $localStorage, $q) {

        var vm = this;
        var Stack = Contentstack.Stack({
            'api_key': 'bltc099573d2517cfe4',
            'access_token': 'blt85cc750cba5639be5599fd93',
            'environment': ''
        });

        var credentials = {
            "api_key": "bltc099573d2517cfe4",
            "authtoken": "blt14d843be0fff2e5bc8e5d365"
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
                        "tweetsdescription": txttweet,
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
