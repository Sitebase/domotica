define(['sandbox'],function(sandbox)
{	
	return {
		name: "bar",
		init: function() {
			sandbox.emit('connection', "hello");
			sandbox.emit('connection', "hello2");
		},

		bind: function() {

		}
	};
});
