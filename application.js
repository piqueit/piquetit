$(document).ready(function(){

  console.log("Ready!")
  // var interval = window.setInterval(switchUpView, 12000);

  // $('a').click(updatePage)
  $('div[id="opener_wrap"]').click(function(e){
    e.preventDefault()
    $(this).slideUp('slow')
  })
  $('body').on('click', '#img_circle', goToDynamicPage)
  $('body').on('click', '.rectangle', skyScannerPopUp)
})
var cityImgs = {
  Bangalore: ['bangalore2.png', "$804"],
  Beijing: ['beijing.png', "$551"],
  Cairo: ['cairo.png', "$678"],
  Dallas: ['dallas.png', "$209"],
  Dammam: ['dammam.png', "$1148"],
  Delhi: ['delhi.png', "$595"],
  Dubai: ['dubai.png', "$941"],
  Dubai2: ['dubai2.png', "$941"],
  Harere: ['harere.png', "$1268"],
  Johanesburg: ['johanesburg.png', "$901"],
  London: ['london.png', "$766"],
  Manila: ['manila.png', "$538"],
  Mauritius: ['mauritius.png', "$1288"],
  Paris: ['paris.png', "$923"],
  Toronto: ['toronto.png', "$398"]
}
var updatePage = function(e){
  e.preventDefault()
  url = $(this).attr('href')

  $.get(url, function(data){
    $('body').html(data)
  })
}

var goToDynamicPage = function(e){
  e.preventDefault()
  $("#montage").show()
  $("#landing-page").hide()
  $("svg").hide()
  // $.get('/dynamic_montage', function(response){
  //   $('body').html(response)
  // console.log(city)
  // hitFlickr(city)
  // })
}

var hitFlickr = function(city){
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9717c8e30be75046ec7318c3a65c17b4&format=json&orientation=landscape&tags=' + city + '&sort=interestingness-desc',
    dataType: 'jsonp',
    jsonpCallback: 'jsonFlickrApi'
  }).done(function(data) {
    console.log(data.photos.photo.length)
    var photos = data.photos.photo;
    var pickedPhotos = [];
    for(i=0; i < 22; i++) {
      var num = Math.floor(Math.random() * 100) + 1;
      pickedPhotos.push(num);
      var html = "";
      var listing = photos[num];
      var resultsEl = $('.g' + i);
        html += "<div data-id=" + listing.id + " class='listing'>";
        html += "<img src='https://farm" + listing.farm + ".staticflickr.com/" + listing.server + "/" + listing.id + "_" + listing.secret + ".jpg' />";
        html += "</a>";
        html += "</div>";
        stubThatHub(city)
        resultsEl.html(html)
    }
    })
    .fail(function(error){
      console.log(error)


  }).fail(function(xhr, textStatus, errorThrown) {
    console.log(xhr);
    console.log(textStatus);
    console.log(errorThrown);
    // alert("FAIL!!");
  });
};

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


var skyScannerPopUp = function(){
  $("#skyscanner").show
}
