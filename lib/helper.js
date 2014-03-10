
// Constructor
function Helper() {}

// class methods
Helper.prototype.log = function( message, type ) {
  type = type || 'INFO';
  var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  console.log( '[' + datetime + ']', type.toString().toUpperCase().green, message );
}

module.exports = Helper;