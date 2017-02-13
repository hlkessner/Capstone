'use strict';

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}

//var url = 'http://api.petfinder.com/pet.find?format=json&key=12ca8a73b3b4a51797988576ecfd5ebc&location=98116&breed=cat&callback=?';
$.ajax({
  type: 'GET',
  data: {},
  url: 'http://api.petfinder.com/pet.find?format=json&key=12ca8a73b3b4a51797988576ecfd5ebc&location=98116&breed=cat&callback=?',
  dataType: 'json',
  success: function success(data) {
    // stores result
    var result = '';

    var petfinder = data.petfinder.$t;
    var infoHTML = '<ul>';
    infoHTML += '<li>';
    //pet description
    infoHTML += petfinder.pets.pet.name.$t;
    infoHTML += '</li>';
    //shows pet's image
    infoHTML += '<li>';
    $.each(petfinder.pet.media.photos.photo, function (i, image) {
      if (image['@size'] == 'x' && image['@id'] === '1') {
        infoHTML += '<img src="' + image['$t'] + '" />';
      }
      if (image == "undefined") {
        infoHTML += 'Cat not found. Please refresh page';
      }
    });
    infoHTML += '</li>';
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
