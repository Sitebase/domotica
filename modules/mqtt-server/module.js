var mqtt = require('mqtt'),
	NetworkEvent = require('network-event'),
	colors = require('colors');

define(['sandbox'],function(sandbox)
{	
	mqtt.createServer(function(client) {
	  var self = this;

	  if (!self.clients) self.clients = {};

	  client.on('connect', function(packet) {
	    client.connack({returnCode: 0});
	    client.id = packet.clientId;
	    sandbox.log(client.id, 'connect');
	    self.clients[client.id] = client;
	  });

	  client.on('publish', function(packet) {
	  	// @todo check if packet counts specific destination host and only send event to that host
	    sandbox.log(packet.topic + ' -> ' + client.id + ' ' + packet.payload, 'publish');

	    // emit mqtt event in local node app
	    // @todo auto decode if payload is json
	    var e = new NetworkEvent( packet.payload );
	    e.setTopic( packet.topic );
	    sandbox.emit(packet.topic, e);

	    for (var k in self.clients) {
	      self.clients[k].publish({topic: packet.topic, payload: packet.payload});
	    }
	  });

	  client.on('subscribe', function(packet) {
	    sandbox.log(client.id + ' ' + packet.subscriptions[0].topic, 'subscribe');
	    var granted = [];
	    for (var i = 0; i < packet.subscriptions.length; i++) {
	      granted.push(packet.subscriptions[i].qos);
	    }

	    client.suback({granted: granted, messageId: packet.messageId});
	  });

	  client.on('pingreq', function(packet) {
	    sandbox.log(client.id, 'ping');
	    client.pingresp();
	  });

	  client.on('disconnect', function(packet) {
	    client.stream.end();
	  });

	  client.on('close', function(err) {
	    delete self.clients[client.id];
	  });

	  client.on('error', function(err) {
	    client.stream.end();
	    sandbox.log('error!', 'error');
	  });
	}).listen(sandbox.getConfig().mqtt.port, function() {
	  sandbox.log('Started MQTT server at localhost:' + sandbox.getConfig().mqtt.port);
	});


	var module = {
		name: "mqtt-server",
		init: function() {
 
		},
		log: function( message ) {
			var app = "[" + this.name + "]";
			sandbox.log(app.toString().grey + " " + message);
		}
	};
module.log('test');
	return module;
});
