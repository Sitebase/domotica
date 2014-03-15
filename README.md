Domotica
========

Project for doing home automation using Raspberry Pi and Arduino

* Use one Raspberry Pi as master controller
* Multiple Arduino/other computers as clients
* Use of MQTT protocol for distrubting messages

Use nodejs

Run
---
Run node app with
>NODE_PATH=`pwd`/lib node run.js
To solve lib path problems

What should be possible and ideas
---------------------------------
* All client should be able to publish events (temperature changed, button clicked)
* Node client should be able to update itself if there is a new version
* Node client can see if VLC or Spotify is playing and what movie/song and publish events for them
* Each client should get a unique name (client + mac address) -> predictable
* The node client should be modulair, depending on the client you would probably want specific modules to be active
* In a config file you should be able to configure which client should run what node modules (based on mac address)
* There should be a kind a mac/ip -> human name mapper. Probably a good idea to work with fixed ip addresses
* One of the clients should monitor network for active devices using IP ping or some sort of broadcast. This way we can publish an event when a certain IP becomes active on the network. This can for example be when someone comes home there phone IP will be available so you can auto detect more or less when somebody get home. Or the playstation IP to know when somebody starts gaming - auto change lights to game mode.
* It should be possible to publish an event to a specific client. For example play this stream to mac mini

Todo
----


Nice to know
------------
### Raspberry PI write to tty1 (hdmi)
>sudo su
>echo "hello world" > /dev/tty1