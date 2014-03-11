To make this work you need to start vlc with web interface enable (preferences > Show All > Interface > Main Interfaces > web).

vlc http://www.listenlive.eu/vrtstubru-high.m3u --http-port 8080


I think we need to run 

vlc --http-port 8989

when the mac mini is started.

$ node
> var vlc = require('./')();
> vlc
> vlc.status.pause()
> vlc.status.resume()
