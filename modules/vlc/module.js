var express = require('express'),
 	NetworkClient = require('network-event'),
	MenuItem = require('menu-item'),
	vlc = require('vlc-api')({
		port: 8989
	});


define(['sandbox'],function(sandbox)
{	
	var NAME = "vlc";
	var current = null;

	var module = {
		name: NAME,
		event: {
			OPEN: NAME + '.open', // Start media file in vlc
			PAUSE: NAME + '.pause',
			RESUME: NAME + '.resume'
		},
		channels: [
			{ name: 'stubru', url: 'http://www.listenlive.eu/vrtstubru-high.m3u', active: false },
			{ name: 'klara', url: 'http://www.listenlive.eu/vrtklaracontinuo-high.m3u', active: false },
			{ name: 'mnm', url: 	'http://www.listenlive.eu/vrtmnm-high.m3u', active: false },
			{ name: 'q-music', url: 'http://mp3streaming.q-music.be/QBE_MP3_HI.m3u', active: false },
			{ name: 'metal', url: 'http://yp.shoutcast.com/sbin/tunein-station.pls?id=318248', active: false },
			{ name: 'jazz', url: 'http://yp.shoutcast.com/sbin/tunein-station.pls?id=190282', active: false },
			{ name: 'fire', url: 'http://www.youtube.com/watch?v=BTZcyTy15Jk', active: false }
		],
		init: function() {
			
		},

		bind: function() {
			sandbox.on('app.modules.ready', this.ready);
			sandbox.on(module.event.OPEN, this.handle);
			sandbox.on(module.event.PAUSE, this.handle);
			sandbox.on(module.event.RESUME, this.handle);
		},

		ready: function() {
			console.log(module.channels);
			
			sandbox.getServer().get('/vlc/radio', function(req, res){
				res.render('vlc/public/radio',{channels: module.channels, current: current});
			});
			sandbox.getServer().use('/vlc', express.static(sandbox.getPath('/modules/vlc/public')));
		},

		handle: function( event ) {

			//switch( event.getTopic() ) {
			switch( event.trigger ) {
				case module.event.PAUSE:
					vlc.status.pause();
					break;
				case module.event.RESUME:
					vlc.status.resume();
					break;
				case module.event.OPEN:
					sandbox.log('VLC play ' + event.url);
					//vlc.status.fullscreen();
					current = event.url;
					vlc.status.play(event.url, {});
					break;
			}


		},

		getWebMenuItem: function() {
			return new MenuItem('Radio', '/vlc/radio');
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