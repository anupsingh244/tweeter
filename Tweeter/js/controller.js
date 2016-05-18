  (function() {
      'use strict';
      angular
          .module("myApp")
          .controller('TwitrController', TwitrController);

      TwitrController.$inject = ['TwitrService', '$scope'];

      function TwitrController(TwitrService, $scope) {

          var vm = this;
          vm.tweets = [];

          vm.swapclass = function() {
              vm.addclass = true;
              vm.remove = false;

          };


          vm.refreshTweet = function() {

              vm.swapclass();
              TwitrService.getTweet().then(function(data) {
                      vm.tweets = data;
                      vm.tweetcount = vm.tweets.length;
                  },
                  function(error) {
                      console.log('tweets retrieval failed.')
                  });
          };

          vm.addTweet = function() {

              vm.swapclass();
              TwitrService.tweetInsert(vm.txttweet).then(function(data) {
                  vm.tweets = data;
                  vm.tweetcount = vm.tweets.length;
                  console.log('date', vm.tweets);
              }, function(error) {
                  alert("Tweet Field is blank");
              });
              vm.txttweet = '';
          };

          vm.deleteTweet = function(tweetindex) {
              console.log("tweetindex", tweetindex);
              TwitrService.tweetDelete(tweetindex);
              vm.tweetcount = vm.tweets.length;
              if (vm.addclass == true) {
                  vm.addclass = false;
                  vm.remove = true;
              };
          };



      }


  })();
