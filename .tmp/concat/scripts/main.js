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
    infoHTML += '?subject=Adoption%20Inquiry&body=Hello%20there!%0D%0A%0D%0AI%20am%20interested%20in%20adopting%20';
    infoHTML += data.petfinder.pet.name.$t;
    infoHTML += '%20after%20finding%20him%20on%20CatMatcher.%20I%20can%20give%20this%20cat%20a%20great%20home!%20Please%20see%20my%20information%20below:>Adopt Me!</a></button>';
    infoHTML += '<button><a href=https://secure3.convio.net/shs/site/Donation2;jsessionid=00000000.app326b?idb=143004535&1380.donation=form1&DONATION_LEVEL_ID_SELECTED=1&df_id=1380&mfc_pref=T&NONCE_TOKEN=BF7733985D5AC855261FCF38D05CD9D9&idb=0>Not ready to commit?</a></button>';

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
$('#form').validate({
  submitHandler: function submitHandler(form) {
    form.submit();
  },
  rules: {
    "firstname": {
      required: true,
      maxlength: 128
    }
  }
});
//# sourceMappingURL=main.js.map
