"use strict";

var app = angular.module("app", []);

app.controller("MainController", ["$scope","Services", function ($scope, Services) {

  getAdvertisment();

  function getAdvertisment(){
    $scope.adFlag = false;
    Services.getAdvertisment().then(function(response){
      $scope.ads = [];
      if(response.data != null){
          $scope.adFlag = true;
          var counter = true;
          var count = 0;
          for(let data of response.data){
            count++;
            let ad = [];
            let price = 0;

            if(Services.findValue(data, "title")){
              ad.title = data.title;
            }

            if(Services.findValue(data, "realestateSummary.address")){
              ad.address = data.realestateSummary.address.postalCode
                                      + " " + data.realestateSummary.address.street
                                          + " / " + data.realestateSummary.address.city;
            }

            if(counter){
              ad.type = "Kaufen"
              if(Services.findValue(data, "advertisementPrice.sellPrice")){
                price = data.advertisementPrice.sellPrice;
              }
              counter = !counter;
            }else{
              ad.type = "Miesten";
              if(Services.findValue(data, "advertisementPrice.baseRent")){
                price = data.advertisementPrice.baseRent;
              }
              counter = !counter;
            }

            ad.price = price.toFixed(3);

            if(Services.findValue(data, "realestateSummary.numberOfRooms")){
              ad.rooms = "ab " + data.realestateSummary.numberOfRooms + " " + "Zimmer";
            }

            if(Services.findValue(data, "realestateSummary.space")){
              ad.space = data.realestateSummary.space.toFixed(0);
            }

            ad.img = "";
            if(data.advertisementAssets !== undefined && data.advertisementAssets !== null){
                var advertisementAsset = data.advertisementAssets[0];
                  if(Services.findValue(advertisementAsset, "advertisementThumbnails.inventory_m.url")){
                  ad.img = data.advertisementAssets[0].advertisementThumbnails.inventory_m.url;
                  }
            }
            $scope.ads.push(ad);

            if(count == 10){
              break;
            }
          }
      }else{
          window.location.href = "/serviceUnavailable";
      }
    }).catch(function(err){
        window.location.href = "/serviceUnavailable";
    });
  }
  setInterval(function(){
    getAdvertisment();
  },600000);

}]);
