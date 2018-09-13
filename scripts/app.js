
(function() {
  'use strict'
  console.log('afsd');

  var app = {
    map: document.querySelector('.map'),
    customMapLink: 'https://drive.google.com/a/codeandsoda.hu/open?id=1H27IHHPyrAVPa5YA_xCOJtrLUpNlhX2n&usp=sharing',
    apiKey: 'AIzaSyDYfCj64wSQSM4KtJ9IS7RTpyuvZin3hWQ',
    url: 'https://en.wikipedia.org/w/api.php'
  }


let loadMap = function() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      var options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      let lat = +crd.latitude.toString().split(0, 4);
      console.log(`Longitude: ${crd.longitude}`);
      let long = +crd.longitude.toString().split(0, 4);
      console.log(`More or less ${crd.accuracy} meters.`);
      var map, infoWindow;
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: long},
          zoom: 6
      });
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

  let loadMainPage = function () {
    let xhr = new XMLHttpRequest();
    let url = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&formatversion=2';
    xhr.open('GET', url);
    xhr.setRequestHeader( 'Api-User-Agent', 'Example/1.0' );
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(xhr.responseText);
      }
    }
  }

  // loadMainPage();
})();
