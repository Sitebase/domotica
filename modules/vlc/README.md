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


# API
{ apiVersion: 
   { vlc: '2.0.1 Twoflower',
     spec: 'http://repo.or.cz/w/vlc.git/blob/HEAD:/share/lua/http/requests/README.txt' },
  _base: 'http://localhost:8080',
  status: 
   { [Function]
     enqueue: [Function],
     addSubtitle: [Function],
     play: [Function],
     goto: [Function],
     pause: [Function],
     stop: [Function],
     resume: [Function],
     next: [Function],
     previous: [Function],
     prev: [Function],
     delete: [Function],
     empty: [Function],
     audioDelay: [Function],
     subtitleDelay: [Function],
     aspectRatio: [Function],
     sort: [Function],
     random: [Function],
     loop: [Function],
     repeat: [Function],
     discovery: [Function],
     fullscreen: [Function],
     volume: [Function],
     seek: [Function],
     preamp: [Function],
     equalizer: 
      { [Function]
        enable: [Function],
        disable: [Function],
        preset: [Function] },
     title: [Function],
     chapter: [Function],
     audioTrack: [Function],
     videoTrack: [Function],
     subtitleTrack: [Function] },
  playlist: [Function],
  browse: [Function] }