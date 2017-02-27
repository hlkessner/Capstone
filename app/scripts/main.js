function pet(){
      $.ajax({
         type : 'GET',
         data : {},
         url : 'http://api.petfinder.com/pet.getRandom?format=json&key=12ca8a73b3b4a51797988576ecfd5ebc&location=seattle,wa&breed=cat&output=basic&callback=?',
         dataType: 'json',
         success : function(data) {
             // stores result
             var result = '';

             var petfinder = data.petfinder;
             var infoHTML = '<ul>';
             $.each(petfinder, function(i, pet){

               infoHTML += '<li>';
               //pet name
               infoHTML += data.petfinder.pet.name.$t;
               infoHTML += '</li>';
               infoHTML += '<div id=address>'
               infoHTML += '<li>';
               //pet name
               infoHTML += data.petfinder.pet.description.$t;
               infoHTML += '</li>';
               infoHTML += '</div>'
               //shows pet's image
               infoHTML += '<li>';
             $.each(data.petfinder.pet.media.photos.photo, function(y, image){
                 if(image['@size'] == 'x' && image['@id'] === '1'){
                     infoHTML += '<img src="'+image['$t']+'" />';
                 }
                 if (image == "undefined"){
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
         error : function(request,error)
         {
             alert("No Cats Found. Please refresh page");
         }
     });
   }
