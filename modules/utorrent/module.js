var express = require('express'),
	MenuItem = require('menu-item');

define(['sandbox'],function(sandbox)
{	
	function Movie( name, torrent) {
		this.name = name || null;
		this.torrent = torrent || null;
	}

	return {
		name: "utorrent",
		init: function() {

		},
		bind: function() {
			sandbox.on('app.modules.ready', this.ready);
			sandbox.on('utorrent.download', this.download);
		},
		download: function(data) {
			sandbox.log('Start downloading: ' + data.url);
		},
		ready: function() {
			console.log('ALL IS READY', sandbox.getServer());

			var movie1 = new Movie('12 Monkeys', 'magnet:?xt=urn:btih:AD59BF76BE0E7A3DECE6A134DE2954B293275338&dn=Walk+the+Line+%5B2005%5D+ExtCut+BRRip+XviD+-+CODY');
			var movie2 = new Movie('Titanic', 'magnet:?xt=urn:btih:EDFCC958350D1B4D7D53A6860FE72A2A9DDCCA4A&dn=Cavaleiro.Das.Trevas.BDRip.Xvid.Dual.Audio.SenhoreSTorrenT');

			sandbox.getServer().get('/utorrent/list', function(req, res){
				res.render('utorrent/public/index',{movies: [movie1, movie2]});
			});
			sandbox.getServer().use('/utorrent', express.static(sandbox.getPath('/modules/utorrent/public')));

			console.log(sandbox.getServer().locals);
		},

		getWebMenuItem: function() {
			return new MenuItem('uTorrent', '/utorrent/list');
		}
	};
});
