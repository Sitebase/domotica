var NetworkClient = require('network-client');

// Constructor
function NetworkEvent( json ) {
	json = json || false;
	if( json ) {
		var object = JSON.parse(json);
		this.status = object.status;
		this.data = object.data;
		this.source = object.source;
		this.destination = object.destination;
		this.event = object.event;
	} else {
		this.status = NetworkEvent.status.OK;
		this.data = null;
		this.source = new NetworkClient();
		this.destination = new NetworkClient();
		this.event = null;
	}
}

// class methods
NetworkEvent.prototype.getRoom = function() {
	return this.room;
};

NetworkEvent.prototype.getData = function() {
	return this.data;
}

NetworkEvent.prototype.getTopic = function() {
	return this.topic;
}

NetworkEvent.prototype.setTopic = function( topic ) {
	this.topic = topic;
}

NetworkEvent.status = {
	OK: 'ok',
	ERROR: 'error'
}

module.exports = NetworkEvent;