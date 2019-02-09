const http = require('http');
const handlebars = require('handlebars');
const fs = require('fs');
const config = require('./config.js');
const ipLookup = require('./ip-lookup.js');

const notFoundTemplate = handlebars.compile(readFile('./not-found.html'));
const indexTemplate = handlebars.compile(readFile('./index.html'));

// Could have used express -- that would make this easier
const server = http.createServer((req, res) => {
    // only support GET requests
    if (req.method != 'GET')
        return methodNotAllowed(res);

    var ip = req.socket.remoteAddress;
    // allow user to specify a custom ip address (e.g. `/1.1.1.1`)
    if (req.url != '/')
        ip = req.url.substr(1);

    ipLookup(ip, (err, data) => {
        if (err)
            return serverError(res, err);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(indexTemplate({...data, ip}));
    });
});


server.listen(config.port, config.hostname, 
    () => console.log('Server listening on port: ' + config.port));

// Helper functions

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(notFoundTemplate({}));
}

function methodNotAllowed(res) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method not allowed. We only support GET requsets.');
}

function serverError(res, err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal server error: `' + err + '`');
}

function readFile(fileName) {
    return fs.readFileSync(fileName).toString();
}
