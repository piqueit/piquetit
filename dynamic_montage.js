$(document).ready(function() {

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });

  $('form#flickr-search button').click(getCityInfo)
})

var getCityInfo = function(e) {
  e.preventDefault();
  console.log("hit")
  // get the input from the text field
  city = $('form#flickr-search input').val();
  // using jsonp in order to do a cross-domain POST
  hitFlickr(city)
}
// var hitFlickr = function(city){
//   $.ajax({
//     url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9717c8e30be75046ec7318c3a65c17b4&format=json&orientation=landscape&tags=' + city + '&sort=interestingness-desc',
//     dataType: 'jsonp',
//     jsonpCallback: 'jsonFlickrApi'
//   }).done(function(data) {
//     console.log(data.photos.photo.length)
//     var photos = data.photos.photo;
//     var pickedPhotos = [];
//     for(i=0; i < 22; i++) {
//       var num = Math.floor(Math.random() * 100) + 1;
//       pickedPhotos.push(num);
//       var html = "";
//       var listing = photos[num];
//       var resultsEl = $('.g' + i);
//       html += "<div data-id=" + listing.id + " class='listing'>";
//       html += "<img src='https://farm" + listing.farm + ".staticflickr.com/" + listing.server + "/" + listing.id + "_" + listing.secret + ".jpg' />";
//       html += "</a>";
//       html += "</div>";
//       stubThatHub(city)
//       resultsEl.html(html)
//     }
//   })
    // .fail(function(xhr, textStatus, errorThrown) {
    // console.log(xhr);
    // console.log(textStatus);
    // console.log(errorThrown);
    // // alert("FAIL!!");
  }


  var stubThatHub = function(city){
    $.ajax({
      type: "GET",
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + "2xMlMJxbOYHJG65FWNs5QYhNLYQa");
        request.setRequestHeader("Content-Type", "application / json");
        request.setRequestHeader("Accept", "application / json");
      },
      url: "https://api.stubhub.com/search/catalog/events/v3?city=" + city,
      success: function (msg) {
        if(msg.numFound != 0){
          event = msg.events[Math.floor(Math.random()*msg.events.length)]
          $("#stubhub").html("<p class='stubhub'><a href='http://stubhub.co.uk/"+event.eventUrl+"'>" + event.description + "</a></p>")
        }
      }
    });
  }
