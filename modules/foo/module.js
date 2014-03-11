define(['sandbox'],function(sandbox)
{	
	return {
		name: "foo",
		init: function() {
		},

		bind: function() {
			sandbox.on('connection', this.connection);
		},

		connection: function(data) {
			sandbox.log('FOO connection ' + data);
		}
	};
});
