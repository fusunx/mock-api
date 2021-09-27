#!/usr/bin/env node

const http = require('http');
const app = require('../app.js');
const config = require('../config');

const { getIPAddress } = require('../lib/os');
console.log(`ip: ${getIPAddress()}`);

const port = normalizePort(process.env.PORT || config.port);
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (!isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.log(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    console.log(`${getIPAddress()}:${port}`);
}
