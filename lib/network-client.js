function NetworkClient( ip, mac, room ) {
	this.ip = ip || null;
	this.mac = mac || null;
	this.room = room || null;
}

NetworkClient.prototype.getIP = function() {
	return this.ip;
};

NetworkClient.prototype.getMACAddress = function() {
	return this.mac;
};

module.exports = NetworkClient;