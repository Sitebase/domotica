Node Stack
==========

Project for doing home automation using Raspberry Pi and Arduino

Some more info
--------------
* node: a node is any device that is running the software is connected to the domotica network
* [nodejs](http://en.wikipedia.org/wiki/Nodejs): Our server side code of choice
* [MQTT](http://mqtt.org/wiki/doku.php/start): The protocol we use to distribute messages between the domotica nodes. The advantage of this is that all platforms have libraries for this protocol, also Arduino.

Config
------
The config file contains to main blocks:

* modules: If the module configuration that will be used as a default on every node (global settings)
* nodes: Per node configuration. You'll notice that every node can have a modules object that you can use to overwrite global settings

Install
-------
Check out the repository
>git clone http://...

Change the file config.sample.json to config.json and modify it to match your computer IP and enable the modules you want to use.

Go into the repository folder
>cd stack

Run app
>npm start

Run
---
Run node app with
>NODE_PATH=`pwd`/lib node run.js
To solve lib path problems

Modules
-------
* **foo**: Example module
* **mqtt-server**: Module that will distribute the internal events to the other nodes.
* **utorrent**: Module that can start downloading a file triggered be an event
* **vlc**: Control a local VLC player. For example start a online radio or play a youtube video
* **web**: Web server that hosts a mobile web app to control all modules/nodes. Each module can add menu items to the app

What should be possible and ideas
---------------------------------
* Use one Raspberry Pi as master controller
* Multiple Arduino/other computers as clients
* Use of MQTT protocol for distrubting messages
* All nodes should be able to publish events (temperature changed, button clicked)
* Node can see if VLC or Spotify is playing and what movie/song and publish events for them
* Each client should get a unique name (client + mac address?) -> predictable
* The node should be modulair, depending on the node you probably want specific modules to be active
* In a config file you should be able to configure which node should run what node modules
* There should be a kind a mac/ip -> human name mapper. Probably a good idea to work with fixed ip addresses
* One of the clients should monitor network for active devices using IP ping or some sort of broadcast. This way we can publish an event when a certain IP becomes active on the network. This can for example be when someone comes home there phone IP will be available so you can auto detect more or less when somebody gets home. Or the playstation IP to know when somebody starts gaming - auto change lights to game mode.
* It should be possible to publish an event to a specific node.
* Node should be able to update itself if there is a new version (low priority)

Find solutions for following problems
-------------------------------------
### How to know when the TV is on:
* Tried checking the voltage on the USB port of the TV but the USB only becomes active when the TV selects USB as source (Samsung TV)
* It should be possible using the service port of the TV
	* http://forum.team-mediaportal.com/threads/samsung-led-tv-serial-control-help.91088/
	* http://www.avsforum.com/t/703453/samsung-rs232-port-specifications


Todo
----
* Make initial config change not required be using the pure default setting when there is no config block for the current node


Nice to know
------------
### Raspberry PI write to tty1 (hdmi)
>sudo su
>echo "hello world" > /dev/tty1