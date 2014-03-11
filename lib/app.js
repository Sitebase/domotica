define(['sandbox'],function(sandbox)
{	
	function App() {
		this.modules = {};
	}

	App.prototype.start = function(dir) {
		var modules = sandbox.getEnabledModules();
		sandbox.log('Enabled modules: ' + modules.join(', '));
		for(idx in modules) {
			var module = requirejs(modules[idx]);
			sandbox.log('Start module', module.name)
			module.init();
			if (module.hasOwnProperty('bind')) module.bind(); // Call bind if module supports this
			//@todo is not object then module failed to load
			this.modules[module.name] = module;
		}
		
	};

	App.prototype.register = function( module ) {
		module.init();
		this.modules[ module.name ] = module;
	};

	return new App();
});

/*var Sandbox = require('./sandbox');

function App() {
	this.sandbox = new Sandbox();
	this.modules = {};
}

App.prototype.register = function( module ) {
	module.init();
	this.modules[ module.name ] = module;
};

module.exports = App;*/
