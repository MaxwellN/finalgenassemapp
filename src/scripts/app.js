$(document).ready(function() {
  $('#search-button').click(function() {
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=00ef8b5d09f5a093d587657ec6fa88c3&t&format=json&nojsoncallback=1&api_sig=9527e11a4431a39fe5d05c6b1932b4a1',
    {
      tags: 'dog',
      tagmode: 'any',
      format: 'json'
    },
    function(data) {
      $.each(data.items, function(i, item) {
        $("<img/>").attr('src', item.media.m).appendTo('#images');
        if(i == 3)  return false;
      });
    });
  });
});
