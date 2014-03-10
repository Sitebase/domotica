var util = require('util'),  
    http = require('http'),
    NetworkEvent = require('./lib/network-event'),
    Helper = require('./lib/helper'),
    mqtt = require('./lib/mqtt-server'),
    web = require('./lib/web-server'),
    mac = require('getmac'),
    colors = require('colors'),
	vlc = require('vlc-api')(),
    config = require('./config.json');

var e = new NetworkEvent();
var helper = new Helper();
