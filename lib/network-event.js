var NetworkClient = require('./network-client'),
    Data = require('./data');

// Constructor
function NetworkEvent( object ) {
	object = object || false;
	this.status = NetworkEvent.status.OK;
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

NetworkEvent.status = {
	OK: 'ok',
	ERROR: 'error'
}

module.exports = NetworkEvent;