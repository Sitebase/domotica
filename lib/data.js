function Data( category, action, label, value ) {
	this.category = category || null;
	this.action = action || null;
	this.label = label || null;
	this.value = value || null;
}

Data.prototype.getCategory = function() {
	return this.category;
};

Data.prototype.getAction = function() {
	return this.action;
};

Data.prototype.getLabel = function() {
	return this.label;
};

Data.prototype.getValue = function() {
	return this.value;
};

module.exports = Data;