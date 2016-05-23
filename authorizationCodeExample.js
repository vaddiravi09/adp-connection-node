'use strict';

process.env.NODE_DEBUG = 'adp-connection';

var server = require('./server');
var debug = require('./lib/debug');

server.start(function startCb() {
	debug('Server started callback');
});
