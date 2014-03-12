var fs = require('fs'),
    express = require('express'),
    socketio = require('socket.io');
define(['sandbox'],function(sandbox)
{	
	var module = {
		name: "web",
		init: function() {

			var app = express();
			
			app.set('view engine', 'jade');
			app.set('views', sandbox.getPath('/modules'));

			app.get('/', function(req, res){
				res.render('web/public/views/index', {'title': 'HELLO BLA'});
			});

			app.get('/testy', function(req, res){
				res.render('web/public/views/layout', {'title': 'HELLO BLA'});
			});

			app.use(express.static(sandbox.getPath('/modules/web/public')));

			app.listen(3000);

			sandbox.setServer( app );

			/*var server = http.createServer(function(req, res) {
			    res.writeHead(200, { 'Content-type': 'text/html'});
			    res.end(fs.readFileSync( sandbox.getPath('/modules/web/public/index.html') ));
			}).listen(sandbox.getConfig().web.port, function() {
			    sandbox.log('Started HTTP web server at http://localhost:' + sandbox.getConfig().web.port);
			});*/
			 
		},
		bind: function() {
			sandbox.on('app.modules.ready', this.ready);
		},
		ready: function() {
			//console.log('web ready', sandbox.getWebMenuItems());
			sandbox.getServer().locals.items = sandbox.getWebMenuItems();
		}
	};

	return module;
});
