var util = require('util'),  
    http = require('http'),
    requirejs = require('requirejs'),
    NetworkEvent = require('./lib/network-event'),
    Helper = require('./lib/helper'),
    //mqtt = require('./lib/mqtt-server'),
    //web = require('./lib/web-server'),
    mac = require('getmac'),
    colors = require('colors'),
	vlc = require('vlc-api')(),
    config = require('./config.json'),
    events = require('events');

var e = new NetworkEvent();
var helper = new Helper();
var eventEmitter = new events.EventEmitter();

console.log('hello');
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
    	app: 'lib/app',
    	sandbox: 'lib/sandbox',

    	vlc: 'modules/vlc/module',
    	foo: 'modules/foo/module',
    	bar: 'modules/bar/module',
    	web: 'modules/web/module',
    	"mqtt-server": 'modules/mqtt-server/module'
    }
});

var callback = function(stream) {
  console.log('someone connected!');
};
eventEmitter.on('connection', callback);

eventEmitter.emit('connection');

//console.log(app);
requirejs(['app'],function(app) {
  	app.start(__dirname);
});
//app.register( foo );

