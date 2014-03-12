var fs = require('fs'),
    express = require('express'),
    socketio = require('socket.io');
define(['sandbox'],function(sandbox)
{	
	var socket = null;

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

			var server = app.listen(3000);
			var io = socketio.listen(server).on('connection', function (socket) {
				socket = socket;
				//socket.broadcast.emit('message', 'HELLO WORLD');
				socket.on('message', function (msg) {
			        console.log('Message Received: ', msg);
			    });
			    //socket.emit('message', 'from sandbox message');
			    sandbox.setSocket(socket);

			});
			io.set('log level', 1);

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

			/*setTimeout(function() {
				socket.broadcast.emit('message', msg);
			},10000);*/
		}
	};

	return module;
});
