(function() {
  'use strict';
  angular
  .module('myApp')
  .service('Service', Service);

  Service.$inject = ['$http','$localStorage','$q'];
   //     /* @ngInject */
   function Service($http,$localStorage,$q) {

    var deferred = $q.defer();
    var tweet=[];
    var vm=this;
    vm.savedtweet =$localStorage.message;

    vm.getfunc= function(){
     return $http.get('save.json')
     .then(function(response) { 
       tweet = response.data;
     //if there is no tweet then it will load some default tweets from JSON file 
     //and save to localstorage, otherwise load user tweets
          if(vm.savedtweet=== undefined || vm.savedtweet.length <= 0) 
          {
           vm.savedtweet=tweet; 
           return vm.savedtweet;    
         }
         else{
      return vm.savedtweet; //this will load tweets from localstorage
      // this is to check git feature
    }
  });

   };

   vm.insert =function (text) {
    if(text !=''){
      vm.savedtweet.unshift({name:text});
      deferred.resolve(vm.savedtweet);
      return deferred.promise;
    }
  };

  vm.delete= function (item){ 
    var index=vm.savedtweet.indexOf(item)
    vm.savedtweet.splice(index,1);    
    deferred.resolve(vm.savedtweet);
    return deferred.promise;
  };
}
})();

