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

			sandbox.getServer().get('/utorrent/list', function(req, res){
				res.render('utorrent/public/index');
			});
			sandbox.getServer().use('/utorrent', express.static(sandbox.getPath('/modules/utorrent/public')));

			console.log(sandbox.getServer().locals);
		},

		getWebMenuItem: function() {
			return new MenuItem('uTorrent', '/utorrent/list');
		}
	};
});
