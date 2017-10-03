$(document).ready(function() {

  var searchButton = $('#searchButton');

  searchButton.on('click', search);
  $('#searchField').on('keyup', function(enter) {
    if (enter.keyCode === 13) {
      search();
    };
  });

  //  Show Favorites  //
  $('#favButton').on('click', myFavs);

});

//  Firebase  //


//  Search Function  //
function search() {
  var searchField = $('#searchField');
  var newSearch = "";
  newSearch = (searchField.val() ? searchField.val():alert('Give me a topic!!!'));
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&' + flickrApi +'&per_page=50&format=json&nojsoncallback=1&tags=' + newSearch,
    type: 'GET',
    success: function(data) {

  //  Reset HTML every button press //
      $('#container').html('');

  //  Construct URL from input values //
      $(data.photos.photo).each(function(index, value) {
        var imageUrl = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_z.jpg';

  //  Append to HTML  //
        $('<img class="grid-item fav-image" onclick="deleteFav(this)" src="' + imageUrl + '" alt=""/>').appendTo($('#container'));

      }); //End URL constructor

      //  Make Image Favorite //
      $('.grid-item').on('click', newFav);


    }  //End Success
  }); //End Ajax
}; //End Search


var favList = firebase.database().ref('FavImage');

//  Add Favorites Function //
function newFav() {
  favList.push({
    imageUrl: $(this).attr('src')
  });
  $(this).toggleClass('favPic');
}



//  View Favorites Function //
function myFavs() {

  favList.on('value', function (results) {
    $('#container').html('');
    var myFavs = results.val();
    for (var item in myFavs) {
      $img = $('<img />')
      $img.addClass("grid-item");
      $img.attr("src", myFavs[item].imageUrl);
      $img.attr("data-id", item);
      $('#container').prepend($img);
    }
  });
}
