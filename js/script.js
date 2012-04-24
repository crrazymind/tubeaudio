$(document).ready(function(){
    initPlayer();
});

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