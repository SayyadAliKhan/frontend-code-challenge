'use strict';

var app = angular.module('app', ['ngSanitize']);

app.controller('MainController', ['$scope','Services','$sce', function ($scope, Services, $sce) {

  getAdvertisment();

  function getAdvertisment(){

    Services.getAdvertisment().then(function(response){
      $scope.ads = [];
      if(response.data != null){
          var counter = true;
          var price = 0;
          for(var data of response.data){
            var ad = [];

            ad.title = data.title;
            ad.address = data.realestateSummary.address.postalCode
                                    + " " + data.realestateSummary.address.street
                                        + " / " + data.realestateSummary.address.city;

            if(counter){
              ad.type = "Kaufen"
              price = data.advertisementPrice.sellPrice;
              counter = !counter;
            }else{
              ad.type = "Miesten";
              price = data.advertisementPrice.baseRent;
              counter = !counter;
            }
            ad.price = price.toFixed(3);
            console.log(ad.price);
            ad.rooms = data.realestateSummary.numberOfRooms + " " + "Zimmer";
            ad.space = "ab " + data.realestateSummary.space.toFixed(0);
            ad.img = data.advertisementAssets[0].advertisementThumbnails.inventory_m.url;

            $scope.ads.push(ad);
          }
      }else{
        //window.location.href = '/serviceUnavailable';
      }
    }).catch(function(err){
      // window.location.href = '/serviceUnavailable';
    });
  }
  setInterval(function(){
    getAdvertisment();
  },300000);

}]);

app.factory('Services', ['$http', function($http){
  var getAdvertisment = function(){
    return $http.get('/getAdvertisment');
  }
  return{
    getAdvertisment : getAdvertisment
  }
}]);
