var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');
define(['sandbox'],function(sandbox)
{	
	var module = {
		name: "web",
		init: function() {
			var server = http.createServer(function(req, res) {
			    res.writeHead(200, { 'Content-type': 'text/html'});
			    res.end(fs.readFileSync( sandbox.getPath('/modules/web/public/index.html') ));
			}).listen(sandbox.getConfig().web.port, function() {
			    sandbox.log('Started HTTP web server at http://localhost:' + sandbox.getConfig().web.port);
			});
			 
		},
	};

	return module;
});
