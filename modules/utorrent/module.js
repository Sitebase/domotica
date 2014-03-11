var express = require('express'),
	MenuItem = require('menu-item');

define(['sandbox'],function(sandbox)
{	
	return {
		name: "utorrent",
		init: function() {

		},
		bind: function() {
			sandbox.on('app.modules.ready', this.ready);
		},
		ready: function() {
			console.log('ALL IS READY', sandbox.getServer());

			sandbox.getServer().use('/utorrent', express.static(sandbox.getPath('/modules/utorrent/public')));
		},

		getWebMenuItem: function() {
			return new MenuItem('uTorrent', 'utorrent/index.html');
		}
	};
});
