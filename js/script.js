$(document).ready(function(){
    //initPlayer();
    initHTML5();
});

function initHTML5(){
     /*var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      console.log(firstScriptTag);*/
    var _ifrHold = $('#player');
    //var _ifr = '<iframe id="player" type="text/html" width="%w%" height="%h%" src="%location%"  frameborder="0">';
    var _ifr = '<video id="player" width="%w%" height="%h%" src="%location%" ></video>';
    var _loc = 'http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1&origin=' + window.location;
    var _pw = 640;
    var _ph = 400;
    var vquery = 'http://gdata.youtube.com/feeds/api/videos/-/%7Bhttp%3A%2F%2Fgdata.youtube.com%2Fschemas%2F2007%2Fcategories.cat%7DMusic?v=2&alt=json&q=%searchQ%&max-results=%resNum%';
    var scr = 'http://gdata.youtube.com/feeds/api/videos?v=2&alt=json-in-script&q=motorhead&max-results=10';


    vquery = vquery.replace('%searchQ%', 'motorhead');
    vquery = vquery.replace('%resNum%', 25);
    _ifr = _ifr.replace('%w%', _pw);
    _ifr = _ifr.replace('%h%', _ph);
    _ifr = _ifr.replace('%location%', _loc);
    _ifrHold.append($(_ifr));

    var playlist = [];
    var _match = /video\/([\S]+)/

    $.getJSON(vquery + '&callback=?', function(json) {
        var entries = json.feed.entry;

        for (var i = 0; i < entries.length; i++) {
            var obj = entries[i];
            playlist.push({
                'id':obj.id.$t.split('video:')[1],
                'title':obj.title.$t
            });
        }
        var list_items = $('');
        for(var _i in playlist){
            if(playlist[_i].title){
                list_items += '<option value="'+ playlist[_i].id +'">'+ playlist[_i].title +'</option>';
            }
        }
        $('.playlist').append($(list_items));
    });

/*    $.ajax({
      url: vquery,
      context: document.body,
      contentType : 'json',
        success: function(data) {
        console.log(1);
        console.log(data);
      }
  });*/

      var player;
      function onYouTubePlayerAPIReady() {
          console.log('onYouTubePlayerAPIReady');
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'u1zgFlCw8Aw',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
     function onPlayerReady(event) {
        console.log('playme');
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
          console.log('onPlayerStateChange');
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
}







function initPlayer(){
    var opts = {
        'query' : $('.searcher').val(),
        'results_count' : 25, // количество резултатов
        'autoplay' : true
    };
    var _player = $('#player');
    var player = _player.youtube(opts);
    //_player.youtube('changeplaylist', 'motorhead');
    //setTimeout(function(){_player.youtube('toggleplay');}, 1000);
     var _cp = $('#curplay');
    $('#launch').click(function(){

       //_player.youtube('toggleplay');
        _player.youtube('changeplaylist', $('.searcher').val());
        setTimeout(function(){
         var curplay = _player.youtube('gettitle');
            _cp.text(curplay);
         },300);
         //console.log(player.getPlaylist());
       return false;
    });
    $('#next').click(function(){
       _player.youtube('next');
         var curplay = _player.youtube('gettitle');
         _cp.text(curplay);
       return false;
    });
}