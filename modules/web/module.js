var fs = require('fs'),
    express = require('express'),
    socketio = require('socket.io');
define(['sandbox'],function(sandbox)
{	
	var module = {
		name: "web",
		init: function() {

			var User = function(fname, lname, phone) {
    this.FirstName = fname;
    this.LastName = lname;
    this.Phone = phone;
};

var users = [];
users.push(new User('Matt', 'Palmerlee', '818-123-4567'));
    users.push(new User('Joe', 'Plumber', '310-012-9876'));
    users.push(new User('Tom', 'Smith', '415-567-2345'));

			var app = express();
			app.use(express.static(sandbox.getPath('/modules/web/public')));
			app.set('view engine', 'jade');
			app.set('views', sandbox.getPath('/modules/web/public/views'));
			app.get('/testy', function(req, res){
				res.render('layout', {'title': 'HELLO BLA', 'users': users, items: sandbox.getWebMenuItems()});
			});

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
			console.log('web ready', sandbox.getWebMenuItems());
		}
	};

	return module;
});
