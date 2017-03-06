'use strict';

$.ajax({
  type: 'GET',
  data: {},
  url: 'http://api.petfinder.com/pet.getRandom?format=json&key=12ca8a73b3b4a51797988576ecfd5ebc&location=seattle,wa&breed=cat&output=basic&callback=?',
  dataType: 'json',
  success: function success(data) {
    // stores result
    var result = '';

    var petfinder = data.petfinder;
    var infoHTML = '<ul>';

    infoHTML += '<li id="name">';
    //pet name
    infoHTML += data.petfinder.pet.name.$t;
    infoHTML += '</li>';
    infoHTML += '<li>';
    $.each(data.petfinder.pet.media.photos.photo, function (y, image) {
      if (image['@size'] == 'x' && image['@id'] === '1') {
        infoHTML += '<img src="' + image['$t'] + '" />';
      }
    });
    infoHTML += '</li>';
    infoHTML += '<li>';
    //pet name
    infoHTML += data.petfinder.pet.description.$t;
    infoHTML += '</li>';
    infoHTML += '</div>';
    //shows pet's image

    infoHTML += '<button><a href=mailto:';
    //pet name
    infoHTML += data.petfinder.pet.contact.email.$t;
    infoHTML += '>Adopt Me!</a></button>';

    infoHTML += '</ul>';
    // return infoHTML;
    $('#petfinderInfo').html(infoHTML);
    console.log(petfinder);
  }
});

$("button").click(function () {
  $("#pet").show("slow");{
    $("form").hide();
    // Animation complete.
  }
});
//# sourceMappingURL=main.js.map
