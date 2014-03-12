$(function(){

    window.events = new PubSub();
    $('[data-trigger]').live('click', function(e) {
        var trigger = $(this).data('trigger');
        window.events.publish(trigger, [$(this).data()]);
    });



    var iosocket = io.connect();
    var log = $('#log');

    iosocket.on('connect', function () {
    	console.error('connect');
        
        iosocket.on('log', function(data) {
        	log.prepend('<div><span class="na">' + data.type + '</span> ' + data.message + '</div>');
        });

        iosocket.on('message', function(message) {
        	console.error('message',message);
        	log.prepend('<div><span class="na">INFO</span> ' + message + '</div>');
        });
        iosocket.on('disconnect', function() {
        	console.error('disconnect');
        });
    });
    window.iosocket = iosocket;

    /*$('#outgoingChatMessage').keypress(function(event) {
        if(event.which == 13) {
            event.preventDefault();
            iosocket.send($('#outgoingChatMessage').val());
            $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
            $('#outgoingChatMessage').val('');
        }
    });*/
});