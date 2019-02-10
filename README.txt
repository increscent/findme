FINDME
--------------------------------------------------------------------------------
A webpage that shows your location based on your IP address

Author: Robert Williams

Buld/Run:
--------------------------------------------------------------------------------
docker build -t findme .
docker run -p 80:80 -d findme

Config:
--------------------------------------------------------------------------------
The port can be changed in config.js (default: 80).

Usage:
--------------------------------------------------------------------------------
Connect from the browser (http://localhost:80/).
(Replace `localhost` with the hostname of the server where the image is running.)
By default the server uses the client's IP address. You may pass a custom IP address in the path (http://localhost/1.1.1.1).
