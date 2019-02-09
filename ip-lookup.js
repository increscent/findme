/*      
    This module exports a single function

    parameters:
        ip address (in string form)
        callback function (err, data)
            err: String
            data:
            {
                city: "...",
                state: "...",
                country: "...",
                latitude: 123.123,
                longitude: 123.123,
                timezone: "...",
            }
*/

const http = require('http');
const ipServiceHost = 'ip-api.com';
const ipServicePath = (ip) => '/json/' + ip;


module.exports = (ip, cb) => {
    // make an http request (the hard way :/ -- probably should have used a library)
    var options = {
        host: ipServiceHost,
        path: ipServicePath(ip),
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': 0,
        },
    };

    var resultHandler = (res) => {
        var data = '';

        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                var result = JSON.parse(data);
            } catch (e) {
                return cb('Could not parse ip data', null);
            }

            if (result.status != 'success')
                return cb('Failed to fetch ip info: ' + result.message, null);

            cb(null, {
                city: result.city,
                state: result.regionName,
                country: result.country,
                latitude: result.lat,
                longitude: result.lon,
                timezone: result.timezone,
            });
        });
    };

    var errorHandler = (res) => {
        cb('Failed to fetch ip info', null);
    };

    var req = http.request(options, resultHandler);
    req.on('error', errorHandler);
    req.end();
};
