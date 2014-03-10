var config = require('../config.json'),
    Helper = require('./helper'),
    mqtt = require('mqtt');

  var helper = new Helper();

mqtt.createServer(function(client) {
  var self = this;

  if (!self.clients) self.clients = {};

  client.on('connect', function(packet) {
    client.connack({returnCode: 0});
    client.id = packet.clientId;
    helper.log(client.id, 'connect');
    self.clients[client.id] = client;
  });

  client.on('publish', function(packet) {
    helper.log(client.id + ' ' + packet.payload, 'publish');
    for (var k in self.clients) {
      self.clients[k].publish({topic: packet.topic, payload: packet.payload});
    }
  });

  client.on('subscribe', function(packet) {
    helper.log(client.id + ' ' + packet.subscriptions[0].topic, 'subscribe');
    var granted = [];
    for (var i = 0; i < packet.subscriptions.length; i++) {
      granted.push(packet.subscriptions[i].qos);
    }

    client.suback({granted: granted, messageId: packet.messageId});
  });

  client.on('pingreq', function(packet) {
    helper.log(client.id, 'ping');
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
    helper.log('error!', 'error');
  });
}).listen(config.mqtt.port, function() {
  helper.log('Started MQTT server at localhost:' + config.mqtt.port);
});