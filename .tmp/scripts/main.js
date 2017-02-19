'use strict';

var map;
var infowindow;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  var myLatLng = { lat: 47.620422, lng: -122.349358 };
  service.nearbySearch({
    location: myLatLng,
    radius: 1000000,
    type: ['pet_store'],
    keyword: 'rescue'
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
$.ajax({
  type: 'GET',
  data: {},
  url: 'http://api.petfinder.com/pet.find?format=json&key=12ca8a73b3b4a51797988576ecfd5ebc&location=98116&breed=cat&callback=?',
  dataType: 'json',
  success: function success(data) {
    // stores result
    var result = '';

    var petfinder = data.petfinder.pets.pet;
    var infoHTML = '<ul>';
    $.each(petfinder, function (i, pet) {

      infoHTML += '<li>';
      //pet name
      infoHTML += pet.name.$t;
      infoHTML += '</li>';
      //shows pet's image
      infoHTML += '<li>';
      $.each(pet.media.photos.photo, function (y, image) {
        if (image['@size'] == 'x' && image['@id'] === '1') {
          infoHTML += '<img src="' + image['$t'] + '" />';
        }
        if (image == "undefined") {
          infoHTML += 'Cat not found. Please refresh page';
        }
      });
      infoHTML += '</li>';
    });

    infoHTML += '</ul>';
    // return infoHTML;
    $('#petfinderInfo').html(infoHTML);
    console.log(petfinder);
  },
  error: function error(request, _error) {
    alert("No Cats Found. Please refresh page");
  }
});
//# sourceMappingURL=main.js.map
