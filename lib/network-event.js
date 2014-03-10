var NetworkClient = require('./network-client'),
    Data = require('./data');

// Constructor
function NetworkEvent( object ) {
	object = object || false;
	this.room = null;
	this.data = new Data();
	this.source = new NetworkClient();
	this.destination = new NetworkClient();
}

// class methods
NetworkEvent.prototype.getRoom = function() {
	return this.room;
};

NetworkEvent.prototype.getData = function() {
	return this.data;
}

module.exports = NetworkEvent;