var mqtt = require('mqtt'),
	NetworkEvent = require('../lib/network-event')
  //, host = '192.168.1.100' // or localhost
  , host = '192.168.0.113' // or localhost
  , client = mqtt.createClient(1883, '127.0.0.1', {keepalive: 10000});


var e = new NetworkEvent();
console.log(e);
client.subscribe('presence');
client.publish('presence', JSON.stringify(e));
/*client.on('message', function (topic, message) {
  console.log(message);
});*/
client.end();