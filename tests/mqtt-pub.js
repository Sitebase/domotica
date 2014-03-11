// run with -> NODE_PATH=`pwd`/lib node tests/mqtt-pub.js

var mqtt = require('mqtt'),
	NetworkEvent = require('network-event'),
	requirejs = require('requirejs')
  //, host = '192.168.1.100' // or localhost
  , host = '192.168.0.113' // or localhost
  , client = mqtt.createClient(1883, '127.0.0.1', {keepalive: 10000});


requirejs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,

    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    paths: {
    	app: '../lib/app',
    	sandbox: '../lib/sandbox',

    	vlc: '../modules/vlc/module',
    	foo: '../modules/foo/module',
    	bar: '../modules/bar/module',
    	web: '../modules/web/module',
    	"mqtt-server": '../modules/mqtt-server/module'
    }
});

requirejs(['vlc'],function(vlc) {
  	console.log(vlc);
  	var e = new NetworkEvent();
  	e.data = 'jazz';
  	client.publish(vlc.event.OPEN, JSON.stringify(e));
  	client.end();
});

/*var e = new NetworkEvent();
console.log(e);
client.subscribe('presence');
client.publish('presence', JSON.stringify(e));
*/