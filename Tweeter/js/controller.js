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

              vm.swapclass = function() {
                  vm.addclass = true;
                  vm.remove = false;
              };

              vm.refreshTweet = function() {
                  vm.swapclass();
                  TwitrService.getTweet().then(function(data) {
                          vm.tweets = data.reverse();
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
                  var incremented = vm.limit + 2;
                  vm.limit = incremented > vm.tweets.length ? vm.tweets.length : incremented;
              };
          // });
  }
  })();
