var util = require('util'),  
    http = require('http'),
    requirejs = require('requirejs'),
    Helper = require('./lib/helper'),
    //mqtt = require('./lib/mqtt-server'),
    //web = require('./lib/web-server'),
    mac = require('getmac'),
    colors = require('colors'),
	
    config = require('./config.json'),
    events = require('events');


var helper = new Helper();
var eventEmitter = new events.EventEmitter();

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
        node_stack_event: 'lib/node-stack-event',
        node_stack_selector: 'lib/node-stack-selector',

    	vlc: 'modules/vlc/module',
    	foo: 'modules/foo/module',
    	bar: 'modules/bar/module',
        web: 'modules/web/module',
        sitebase: 'modules/sitebase/module',
        webcam: 'modules/webcam/module',
    	utorrent: 'modules/utorrent/module',
    	"mqtt-server": 'modules/mqtt-server/module',

        movie: 'modules/utorrent/movie',
    }
});

var callback = function(stream) {
  console.log('someone connected!');
};
eventEmitter.on('connection', callback);

eventEmitter.emit('connection');

//console.log(app);
requirejs(['app','node_stack_event'],function(app, NodeStackEvent) {
  	app.start(__dirname);
    var ev = new NodeStackEvent();
    console.log(ev);
});
//app.register( foo );

