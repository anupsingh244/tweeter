  (function() {
      'use strict';
      angular
          .module("myApp")
          .controller('TwitrController', TwitrController);

      TwitrController.$inject = ['TwitrService'];

      function TwitrController(TwitrService) {

          var vm = this;
          vm.tweets = [];

          vm.refreshTweet = function() {
              TwitrService.getTweet().then(function(resp) {
                      vm.tweets = resp;
                  },
                  function(error) {
                      console.log('tweets retrieval failed.')
                  });
          };

          vm.addTweet = function() {
              TwitrService.insert(vm.txttweet).then(function(data) {
                  vm.tweets = data;
              }, function(error) {
                  alert("Tweet Field is blank");
              });
              vm.txttweet = '';
          };

          vm.deleteTweet = function(tweet) {
              TwitrService.delete(tweet).then(function(data) {
                  vm.tweets = data;
              });
          };
      }


  })();
