var express = require('express'),
	MenuItem = require('menu-item'),
	request = require('request'),
	parseString = require('xml2js').parseString;
	sys = require('sys'),
	exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }

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
			var command = 'transmission-remote --add "' + data.url + '" -w /home/pi';
			console.log(command);
			exec(command, puts);
		},
		ready: function() {
			console.log('ALL IS READY', sandbox.getServer());

			//http://rss.thepiratebay.se/201

			var movies = [];
			request.get('http://rss.thepiratebay.se/201', function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        var csv = body;
			        parseString(csv, function (err, result) {
						//console.dir(result.rss.channel[0].item);
						var items = result.rss.channel[0].item;
						for(idx in items) {
							//console.dir(items[idx]);
							var item = items[idx];
							var movie = new Movie(item.title[0], item.link[0]);
							movies.push(movie);
						}
					});
			    }
			});

			sandbox.getServer().get('/utorrent/list', function(req, res){
				res.render('utorrent/public/index',{movies: movies});
			});
			sandbox.getServer().use('/utorrent', express.static(sandbox.getPath('/modules/utorrent/public')));

			console.log(sandbox.getServer().locals);
		},

		getWebMenuItem: function() {
			return new MenuItem('uTorrent', '/utorrent/list');
		}
	};
});
