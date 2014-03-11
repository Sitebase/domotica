var events = require('events'),
	NetworkEvent = require('network-event'),
	os=require('os');

var eventEmitter = new events.EventEmitter();

define(['sandbox', '../config.json'],function(sandbox, config)
{	
	var path = this.process.mainModule.filename.replace('/run.js', '');
	var server = null; // Web service instance
	var modules = {};

	return {
		log: function( message, type ) {
			type = type || 'INFO';
			var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			console.log( '[' + datetime + ']', type.toString().toUpperCase().green, message );
		},
		error: function( message ) {
			this.log(message, 'ERROR');
		},
		getEnabledModules: function() {
			
			var modules = [];
			var config = this.getNodeConfig();
			for(module in config.modules) {
				if( config.modules[module].enable ) {
					modules.push( module );
				}
			}
			return modules;
		},
		getWebMenuItems: function() {
			var items = [];
			for(module in modules) {
				if(modules[module].hasOwnProperty('getWebMenuItem')) {
					items.push(modules[module].getWebMenuItem());
				}
			}
			return items;
		},
		on: function( event, callback ) {
			return eventEmitter.on(event, callback);
		},
		emit: function( event, args ) {
			return eventEmitter.emit(event, args);
		},
		getConfig: function( node_ip /* IP */ ) {
			if( ! node_ip ) {
				return config;
			}
			
			for(node in config.nodes) {
				if( config.nodes[node].ip === node_ip) {
					var node_config = config.nodes[node];

					// Merge node config with master config
					var modules = this.extend({}, config.modules, node_config.modules);
					node_config.modules = modules;
					return node_config;
				}
			}

			this.error('No config found for node: ' + node_ip);
			return null;
		},

		/**
		 * Get specific configuration for current node based on IP address
		 */
		getNodeConfig: function() {
			var ip = this.getIP();
			return this.getConfig(ip);
		},
		getPath: function(dir) {
			dir = dir || '';
			return path + dir;
		},
		getIP: function() {
			var ifaces=os.networkInterfaces();
			var address = null;
			for (var dev in ifaces) {
				var alias=0;
				ifaces[dev].forEach(function(details){
					if (
						details.family=='IPv4' && // Make sure use check IP4
						(dev.indexOf('en') > -1 || dev.indexOf('eth') > -1) && // Make sure to only use enx and ethx interfaces, network interfaces on mac start with "en" and on *nix systems with "eth"
						details.address.indexOf('192.168.') > -1 // Make sure the IP starts with some LAN IP
					) {
						//console.log(dev+(alias?':'+alias:''),details.address);
						//++alias;
						address = details.address;
						//return details.address;
					}
				});
			}

			return address;
		},
		setServer: function( s ) {
			server = s;
		},
		getServer: function() {
			return server;
		},

		/**
		 * Register a module
		 */
		register: function(name, instance) {
			modules[name] = instance;
		},

		// @todo this should be in a util helper or so I think
		// @todo this doesn't support recursive extend !!!!
		extend: function(target) {
		    var sources = [].slice.call(arguments, 1);
		    sources.forEach(function (source) {
		        for (var prop in source) {
		            target[prop] = source[prop];
		        }
		    });
		    return target;
		}
	};
});