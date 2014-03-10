// Constructor
function NetworkEvent( object ) {
	object = object || false;
	this.baz = 'baz'; // default value
}

NetworkEvent.prototype.room = null;
NetworkEvent.prototype.data = {}; // This should be a data object
NetworkEvent.prototype.source = { // this should be a NetworkClient object
	device: null,
	ip: null
};
NetworkEvent.prototype.destination = { // this should be a NetworkClient object
	device: null,
	ip: null
};

// class methods
NetworkEvent.prototype.getRoom = function() {

};

module.exports = NetworkEvent;