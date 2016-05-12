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
  
  // $localStorage.message=$localStorage.message;

    vm.getfunc= function(){
     return $http.get('save.json')
     .then(function(response) { 
       tweet = response.data;
     //if there is no tweet then it will load some default tweets from JSON file 
     //and save to localstorage, otherwise load user tweets
          if($localStorage.message=== undefined || $localStorage.message.length <= 0) 
          {
           $localStorage.message=tweet; 
           return $localStorage.message;    
         }
         else{
            console.log($localStorage.message);
      return $localStorage.message; //this will load tweets from localstorage
      // this is to check git feature
    }
  });

   };

   vm.insert =function (text) {
    if(text !=''){
      $localStorage.message.unshift({name:text});
      deferred.resolve($localStorage.message);
      console.log($localStorage.message);
      return deferred.promise;
    }
  };

  vm.delete= function (item){ 
    var index=$localStorage.message.indexOf(item)
    $localStorage.message.splice(index,1);    
    deferred.resolve($localStorage.message);
    return deferred.promise;
  };
}
})();

