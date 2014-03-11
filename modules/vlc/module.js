define(['sandbox'],function(sandbox)
{	
	var module = {
		event: {
			OPEN: this.name + '.open' // Start media file in vlc
		},
		name: "vlc",
		init: function() {
			
		},

		bind: function() {
			console.log('listen for vlc events');
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