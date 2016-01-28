'use strict';

var server = require('./server');
var log = require('winston');

server.start(() => {
	log.info('Server started callback');
});
