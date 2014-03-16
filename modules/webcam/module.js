define(['sandbox'],function(sandbox)
{	
	var module = {
		name: "webcam",
		init: function() {
						 
		},
		bind: function() {
			sandbox.on('app.modules.ready', this.ready);
		},
		ready: function() {
			
		}
	};

	return module;
});