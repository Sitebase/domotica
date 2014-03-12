$(function(){

    events.subscribe('vlc.open', function(e) {
    	e.origin.addClass('btn-success').siblings().removeClass('btn-success');
        iosocket.send(JSON.stringify(e.data));
    });

});