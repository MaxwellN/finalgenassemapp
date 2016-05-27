$(document).ready(function() {


  var searchButton = $('#searchButton');

  searchButton.on('click', search);
  $('#searchField').on('keyup', function(enter) {
    if (enter.keyCode === 13) {
      search();
    };
  });
});



function search(){
  var searchField = $('#searchField');
  var newSearch = "";
  newSearch = (searchField.val() ? searchField.val():alert('Give me a topic!!!'));
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3057bbe793041f44719b1cf3dd4f4748&per_page=30&format=json&nojsoncallback=1&tags=' + newSearch,
    type: 'GET',
    success: function(data) {
      $('#container').html('');
      $(data.photos.photo).each(function(index, value) {
        var imageUrl = 'https://farm' + value.farm + '.staticflickr.com/' + value.server + '/' + value.id + '_' + value.secret + '_b.jpg';

        console.log(imageUrl);

        $('<img src="' + imageUrl + '" alt="" />').appendTo($('#container'));

      });
              console.log(data);
    }
  });
};
