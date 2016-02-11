/*
'use strict';

var server = require('./server');
var log = require('winston');

server.start(function startCb() {
	log.info('Server started callback');
});
*/

'use strict';

var ADPAPIConnectionFactory = require('./lib/adpApiConnectionFactory');
var ADPAPIProductFactory = require('./lib/adpApiProductFactory');
var ClientCredentialsConnType = require('./lib/clientCredentialsConnType');
var AuthorizationCodeConnType = require('./lib/authorizationCodeConnType');

module.exports = {
	ADPAPIConnectionFactory: ADPAPIConnectionFactory,
	AuthorizationCodeConnType: AuthorizationCodeConnType,
	ClientCredentialsConnType: ClientCredentialsConnType,
	ADPAPIProductFactory: ADPAPIProductFactory
};
