'use strict';

var ADPAPIConnectionFactory = require('./adpApiConnectionFactory');
var ADPAPIProductFactory = require('./adpApiProductFactory');
var ClientCredentialsConnType = require('./clientCredentialsConnType');
var AuthorizationCodeConnType = require('./authorizationCodeConnType');

module.exports = {
	ADPAPIConnectionFactory: new ADPAPIConnectionFactory(),
	AuthorizationCodeConnType: new AuthorizationCodeConnType(),
	ClientCredentialsConnType: new ClientCredentialsConnType(),
	ADPAPIProductFactory: new ADPAPIProductFactory()
};
