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
			var server = app.listen( sandbox.getNodeConfig().modules.web.port, function() {
				sandbox.log('Started web server at localhost:' + sandbox.getNodeConfig().modules.web.port);
			});

			var io = socketio.listen(server, {'log level': 0}).on('connection', function (socket) {
				socket = socket;
				//socket.broadcast.emit('message', 'HELLO WORLD');
				socket.on('message', function (json) {
					// @todo This received event should be posted on network using mqtt to see which node want to handle it
					var object = JSON.parse(json);
			        sandbox.log('Message received from socketio: ' + object.trigger);
			        //data = JSON.parse(json);
			        sandbox.emit(object.trigger, object);
			    });
			    //socket.emit('message', 'from sandbox message');
			    sandbox.setSocket(socket);

			});
			//io.set('log level', 0);

			sandbox.setServer( app );			 
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
