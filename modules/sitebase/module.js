var express = require('express'),
	MenuItem = require('menu-item');

define(['sandbox'],function(sandbox)
{	

	return {
		name: "sitebase",
		init: function() {

		},
		bind: function() {
			
		},
		getWebMenuItem: function() {
			return new MenuItem('Test', '/utorrent/list');
		}
	};
});
