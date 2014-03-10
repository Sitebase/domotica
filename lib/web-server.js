var config = require('../config.json'),
    Helper = require('./helper'),
    fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');
 
var helper = new Helper();

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/../index.html'));
}).listen(config.web.port, function() {
    helper.log('Started HTTP web server at http://localhost:' + config.web.port);
});
 
socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        helper.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});