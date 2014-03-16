var events = require('events'),
	NetworkEvent = require('network-event'),
	os=require('os'),
	merge = require('deepmerge');

var eventEmitter = new events.EventEmitter();

define(['sandbox', '../config.json'],function(sandbox, config)
{	
	var path = this.process.mainModule.filename.replace('/run.js', '');
	var server = null; // Web service instance
	var socket = null; // Socket IO instance
	var modules = {};

	return {
		log: function( message, type ) {
			type = type || 'INFO';
			var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			console.log( '[' + datetime + ']', type.toString().toUpperCase().green, message );

			// Send logs to connected web clients
			if( this.getSocket() !== null) {
				this.getSocket().emit('log', {message: message, type: type});
			}
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
					var modules = merge(config.modules, node_config.modules);
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

		/**
		 * Server is an instance of the express server
		 * @param Express
		 */
		setServer: function( s ) {
			server = s;
		},
		getServer: function() {
			return server;
		},

		/**
		 * Set an instance of the socket io connection
		 * @param Socketio
		 */
		setSocket: function( io ) {
			socket = io;
		},
		getSocket: function() {
			return socket;
		},

		/**
		 * Register a module
		 */
		register: function(name, instance) {
			modules[name] = instance;
		}
	};
});