/*var Client = require('utorrent-api');

var utorrent = new Client('localhost', '48844');
utorrent.setCredentials('admin', 'admin');

utorrent.call('list', function(err, torrents_list) {
    if(err) { console.log(err); return; }

    console.log(torrents_list);
});*/

var request = require('request');
var Client = require('utorrent-api');
var fs = require('fs');

var utorrent = new Client('localhost', '48844');
utorrent.setCredentials('admin', 'admin');

// Add torrent
/*request({'uri' : 'http://releases.ubuntu.com/13.04/ubuntu-13.04-desktop-i386.iso.torrent', 'encoding': null}, function (error, response, torrentFileBuffer) {
    utorrent.call('add-file', {'torrent_file': torrentFileBuffer}, function(err, data) {
        if(err) { console.log('error : '); console.log(err); return; }

        console.log('Successfully added torrent file !');
        console.log(data);
    });
});*/

/*utorrent.call('list', function(err, data) {
	if(err) { console.log(err); return; }
	console.log(data);
	var torrent = data.torrents[0];
	var hash = torrent[0];
	var name = torrent[2];
	var size = torrent[3];
	var download_speed = torrent[9];
	var progress = Math.floor(torrent[4]/10);
	var status = torrent[21]; // if status is Seeding you know you can remove the file from utorrent
	console.log(torrent);
	console.log(hash, name, status, progress + '%');
});*/

// Remove torrent using the hash
/*utorrent.call('remove', {'hash': 'DAAC7008E2E3A6E4321950C131690ACA20C5A08A'}, function(err, data) {
	if(err) { console.log(err); return; }
	console.log(data);
	
});*/

/*
utorrent.call('getprops', {'hash': 'DAAC7008E2E3A6E4321950C131690ACA20C5A08A'}, function(err, data) {
	if(err) { console.log('error : '); console.log(err); return; }

	console.log(data);
});*/