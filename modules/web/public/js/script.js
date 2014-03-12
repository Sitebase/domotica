$(function(){
    var iosocket = io.connect();
    var log = $('#log');

    iosocket.on('connect', function () {
    	console.error('connect');
        
        iosocket.send('My custom message');

        iosocket.on('log', function(message) {
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

    /*$('#outgoingChatMessage').keypress(function(event) {
        if(event.which == 13) {
            event.preventDefault();
            iosocket.send($('#outgoingChatMessage').val());
            $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
            $('#outgoingChatMessage').val('');
        }
    });*/
});