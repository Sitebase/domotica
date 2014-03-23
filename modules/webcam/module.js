var Camelot = require('camelot');

define(['sandbox'],function(sandbox)
{	
	var module = {
		name: "webcam",
		init: function() {
			var camelot = new Camelot( {
			  'rotate' : '180',
			  'flip' : 'v'
			});

			camelot.on('frame', function (image) {
			  console.log('frame received!');
			});

			camelot.on('error', function (err) {
			  console.log(err);
			});

			camelot.grab( {
			  'title' : 'Camelot',
			  'font' : 'Arial:24',
			  'frequency' : 1    
			});		 
		},
		bind: function() {
			sandbox.on('app.modules.ready', this.ready);
		},
		ready: function() {
			
		}
	};

	return module;
});