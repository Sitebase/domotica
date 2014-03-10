var events = require('events');
var eventEmitter = new events.EventEmitter();

define(['sandbox', '../config.json'],function(sandbox, config)
{	
	var path = this.process.mainModule.filename.replace('/run.js', '');

	return {
		log: function( message, type ) {
			type = type || 'INFO';
			var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

			console.log( '[' + datetime + ']', type.toString().toUpperCase().green, message );
		},
		getEnabledModules: function() {
			var modules = [];
			for(module in config.modules) {
				console.log(module);
				if( config.modules[module].enable ) {
					modules.push( module );
				}
			}
			return modules;
		},
		on: function( event, callback ) {
			return eventEmitter.on(event, callback);
		},
		emit: function( event, args ) {
			return eventEmitter.emit(event, args);
		},
		getConfig: function() {
			return config;
		},
		getPath: function(dir) {
			dir = dir || '';
			return path + dir;
		}
	};
});