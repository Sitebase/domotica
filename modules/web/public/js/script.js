$(function(){
    var iosocket = io.connect();

    iosocket.on('connect', function () {
    	console.error('connect');
        //$('#incomingChatMessages').append($('<li>Connected</li>'));
        
        iosocket.send('My custom message');

        iosocket.on('message', function(message) {
        	console.error('message',message);
            //$('#incomingChatMessages').append($('<li></li>').text(message));
        });
        iosocket.on('disconnect', function() {
        	console.error('disconnect');
            //$('#incomingChatMessages').append('<li>Disconnected</li>');
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