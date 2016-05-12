  (function() {
      'use strict';
      angular
          .module("myApp")
          .controller('FrmController', FrmController);
      FrmController.$inject = ['Service'];
      /* @ngInject */
      function FrmController(Service) {


          var vm = this;
          vm.tweet = [];

          Service.getfunc().then(function(resp) {
                  vm.tweet = resp;
              },
              function(resp) {
                  console.log('tweets retrieval failed.')
              });


          vm.btn_add = function() {
              Service.insert(vm.txttweet).then(function(data) {
                  vm.tweet = data;
              });
              vm.txttweet = '';
          };

          vm.remove = function(item) {
              Service.delete(item).then(function(data) {
                  vm.tweet = data;
              });
          }

      }
  })();
