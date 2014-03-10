function VLC() {
	this.category = "vlc";
}

VLC.prototype.handle = function( event /* NetworkEvent */) {
	
};

VLC.prototype.interested = function( event ) {
	return event.getData().getCategory() === "vlc";
};

module.exports = VLC;