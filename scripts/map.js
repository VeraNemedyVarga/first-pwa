function initMap() {} // now it IS a function and it is in global
$(() => {
  'use strict'
  console.log('start');
  var app = {
    apiKey: 'AIzaSyBoFRSA5qKCT-peqyMg1GuMc3YQOPq5U3k'
  }
  var districtOutline;
  districtOutline = [
    {lat: 47.510441, lng: 19.055608},
    {lat: 47.509504, lng: 19.055095},
    {lat: 47.509525, lng: 19.055105},
    {lat: 47.498092, lng: 19.054814},
    {lat: 47.497507, lng: 19.054994},
    {lat: 47.497360, lng: 19.054454},
    {lat: 47.496872, lng: 19.054129},
    {lat: 47.497238, lng: 19.053841},
    {lat: 47.494508, lng: 19.046371},
    {lat: 47.498970, lng: 19.043665},
    {lat: 47.504212, lng: 19.042330},
    {lat: 47.511897, lng: 19.042679},
    {lat: 47.514694, lng: 19.043516},
    {lat: 47.514694, lng: 19.043520}
  ];

  var sinkingPoles = [
    {
      address: 'Aranykéz utca 4-6.',
      lat: 47.4949556,
      lng: 19.0487413
    },
    {
      address: 'Galamb u. 2.',
      lat: 47.4931569,
      lng: 19.0492171
    },
    {
      address: 'Gerlóczy u. 2.',
      lat: 47.4951431,
      lng: 19.0539161
    },
    {
      address: 'Gerlóczy u. 2.',
      lat: 47.4951431,
      lng: 19.0539161
    },
    {
      address: 'Szervita tér (Városház utca 20.)',
      lat: 47.4955067,
      lng: 19.0512479
    },
    {
      address: 'Zrínyi utca (Nádor u. 7-8)',
      lat: 47.5000638,
      lng: 19.0474333
    },
    {
      address: 'Zrínyi u. 1. (Széchenyi tér)',
      lat: 47.4995563,
      lng: 19.0456125
    },
  ];

  let setSinkingPoleMarkers = function(poles, map) {
    for (var i = 0; i < poles.length; i++) {
      var pole = poles[i];
      var marker = new google.maps.Marker({
        position: {lat: pole.lat, lng: pole.lng},
        map: map,
        title: pole.address
      });
    }
  };

  function initMap(districtOutline) {
    var currentLoc;
    if(localStorage.savedLocation) {
      currentLoc = JSON.parse(localStorage.savedLocation)
    } else {
      currentLoc = {lat: 47.495, lng: 19.050};
    }
    var map = new google.maps.Map(document.querySelector('.map'), {
        center: currentLoc,
        zoom: 15
      });
    map.data.add({geometry: new google.maps.Data.Polygon([districtOutline])});
    setSinkingPoleMarkers(sinkingPoles, map);
    getLocation(map);
  }

  let getLocation = function(map) {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      var options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      let lat = +crd.latitude;
      let lng = +crd.longitude;
      let myLatlng = new google.maps.LatLng(lat,lng);
      map.setCenter(myLatlng);
      var marker = new google.maps.Marker({position: myLatlng, map: map});
      var infowindow = new google.maps.InfoWindow({
          content: '<p>Itt jársz</p>'
        });
      infowindow.open(map, marker);
      saveToStorage({lat, lng});

    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
      console.log('Geolocation available', navigator.geolocation.getCurrentPosition(success, error, options));
    } else {
      console.log('Geolocation not available');
      /* geolocation IS NOT available */
    }

  }

  let saveToStorage = function(pos) {
    let savedLocation = JSON.stringify(pos);
    localStorage.savedLocation = savedLocation;
  }

  initMap(districtOutline);

});
