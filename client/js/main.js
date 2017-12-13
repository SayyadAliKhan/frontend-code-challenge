'use strict';

var app = angular.module('app', []);

app.controller('MainController', ['$scope','Services', function ($scope, Services) {

  getAdvertisment();

  function getAdvertisment(){

    Services.getAdvertisment().then(function(response){
      console.log(response);
      // if(response.data != null){
      //
      //
      //
      // }else{
      //   window.location.href = '/serviceUnavailable';
      // }
    }).catch(function(err){
      console.log(err);
       //window.location.href = '/serviceUnavailable';
    });
  }
  setInterval(function(){
    getAdvertisment();
  },300000);

}]);

app.factory('Services', ['$http', function($http){
  var getAdvertisment = function(){
    return $http.get('https://api.mcmakler.de/v1/advertisements');
  }
  return{
    getAdvertisment : getAdvertisment
  }
}]);
