var NetworkClient = require('network-event'),
	MenuItem = require('menu-item'),
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
		channels: {
			'stubru': 	'http://www.listenlive.eu/vrtstubru-high.m3u',
			'klara': 	'http://www.listenlive.eu/vrtklaracontinuo-high.m3u',
			'mnm': 		'http://www.listenlive.eu/vrtmnm-high.m3u',
			'q-music': 	'http://mp3streaming.q-music.be/QBE_MP3_HI.m3u',
			'metal': 	'http://yp.shoutcast.com/sbin/tunein-station.pls?id=318248',
			'jazz': 	'http://yp.shoutcast.com/sbin/tunein-station.pls?id=190282',
			'fire': 	'http://www.youtube.com/watch?v=BTZcyTy15Jk'
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
					var file = event.getData();
					if(module.channels.hasOwnProperty(file)) {
						file = module.channels[file];
					}
					sandbox.log('Play ' + file);
					vlc.status.play(file, {});
					//vlc.status.fullscreen();
					break;
			}


		},

		getWebMenuItem: function() {
			return new MenuItem('Radio', 'vlc/radio.html');
		}
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