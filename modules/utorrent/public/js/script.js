$(function(){

    events.subscribe('utorrent.download', function(data) {
        console.error('sub download', data);
        iosocket.send(JSON.stringify(data));
    });

});