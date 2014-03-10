#!/bin/bash
forever start "$(pwd)/run.js" -l ./node.log

# Check if vlc instance if active, if not run following command
vlc --http-port 8080