'use strict';

var app = angular.module('app');

app.factory('Services', ['$http', function($http){

  var getAdvertisment = function(){
    return $http.get('/getAdvertisment');
  }

  var findValue = function(obj, path){
    var paths = path.split('.');
    var current = obj;
    var i = 0;

    for (; i < paths.length; ++i) {
      if (current[paths[i]] == undefined || current[paths[i]] == null) {
        return current[paths[i]];
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }

  return{
    getAdvertisment : getAdvertisment,
    findValue : findValue
  }

}]);
