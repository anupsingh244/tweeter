 (function() {
     'use strict';
     angular
         .module('myApp')
         .provider('authentication', authentication);

     function authentication() {
         var vm = this;
         var api_key = '';
         var access_token = '';
         var  URL='';
         vm.setKeys = function(a, b,c) {
             api_key = a;
             access_token = b;
             URL=c;
         }

         vm.$get = function() {
             var Stack = {
                 'stack': Contentstack.Stack({
                     'api_key': api_key,
                     'access_token': access_token,
                     'environment': ''
                 }),
                 'URL': URL
             }
             return Stack;
         }
     }
 })();
