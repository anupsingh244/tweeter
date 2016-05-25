  (function() {
      'use strict';
      angular
          .module("myApp")
          .controller('TwitrController', TwitrController);

      TwitrController.$inject = ['TwitrService'];

      function TwitrController(TwitrService) {

          var vm = this;
          vm.tweets = [];
          vm.limit = 2;
          vm.noTweet = true;

          vm.swapclass = function() {
              vm.addclass = true;
              vm.remove = false;
              vm.noTweet = true;
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
              TwitrService.setTweet(vm.txttweet).then(function(resp) {
                  vm.tweets.unshift({ title: resp.data.entry.title, uid: resp.data.entry.uid, created_at: resp.data.entry.created_at, url: resp.data.entry.url });
                  vm.tweetcount = vm.tweets.length;
              }, function(error) {
                  alert("Tweet Field is blank");
              });
              vm.txttweet = '';

          };

          vm.deleteTweet = function(tweetindex, index) {
              TwitrService.deleteTweet(tweetindex);
              if (vm.addclass) {
                  vm.addclass = false;
                  vm.remove = true;
              };
              vm.tweets.splice(index, 1);
              vm.tweetcount = vm.tweets.length;
              event.stopPropagation();
          };

          vm.loadMore = function() {
              vm.loading = true;
              vm.swapclass();
              TwitrService.loadMore().then(function(data) {
                      if (data.length > 0) {
                          vm.tweets = vm.tweets.concat(data);
                          vm.tweetcount = vm.tweets.length;
                      } else {
                          vm.noTweet = false;
                      }
                  },
                  function(error) {
                      console.log('No more tweets')
                  }).finally(function() {
                  vm.loading = false;

              });
                  
              scrollTo(100, document.body.scrollHeight);
          };
      }
  })();
