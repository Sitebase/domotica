define(['sandbox'],function(sandbox)
{	
	var NAME = "vlc";

	var module = {
		name: NAME,
		event: {
			OPEN: NAME + '.open' // Start media file in vlc
		},
		init: function() {
			
		},

		bind: function() {
			console.log('listen for', module.event.OPEN);
		},
	};

	return module;
});


/*function VLC() {
	this.category = "vlc";
}

VLC.prototype.handle = function( event ) {
	
};

VLC.prototype.interested = function( event ) {
	return event.getData().getCategory() === "vlc";
};

module.exports = VLC;
*/