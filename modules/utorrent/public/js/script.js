$(function(){

    events.subscribe('utorrent.download', function(e) {
        console.error('sub download', e);
        iosocket.send(JSON.stringify(e.data));
    });

});