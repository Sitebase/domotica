var NetworkClient = require('network-event')
	vlc = require('vlc-api')({
		port: 8989
	});


define(['sandbox'],function(sandbox)
{	
	var NAME = "vlc";

	var module = {
		name: NAME,
		event: {
			OPEN: NAME + '.open', // Start media file in vlc
			PAUSE: NAME + '.pause',
			RESUME: NAME + '.resume'
		},
		init: function() {
			
		},

		bind: function() {
			sandbox.on(module.event.OPEN, this.handle);
			sandbox.on(module.event.PAUSE, this.handle);
			sandbox.on(module.event.RESUME, this.handle);
		},

		handle: function( event ) {
			console.log('VLC handle event');

			switch( event.getTopic() ) {
				case module.event.PAUSE:
					vlc.status.pause();
					break;
				case module.event.RESUME:
					vlc.status.resume();
					break;
				case module.event.OPEN:
					vlc.status.play(event.getData(), {});
					break;
			}


		},
	};

	return module;
});


/*function VLC() {
	this.category = "vlc";
}

VLC.prototype.handle = function( event ) {
	
};

VLC.prototype.interested = function( event ) {
	return event.getData().getCategory() === "vlc";
};

module.exports = VLC;
*/