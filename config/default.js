'use strict';

var connection = {
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	authorizationUrl: 'https://iat-accounts.adp.com/auth/oauth/v2/authorize'
};

module.exports = {
	db: {
		connection: 'localhost:27017'
	},
	server: {
		host: 'localhost',
		port: 8889
	},
	grantMap: [
		{
			type: 'client_credentials',
			module: 'clientCredentials'
		},
		{
			type: 'authorization_code',
			module: 'authorizationCode'
		}
	],
	connect: {
		validCertTypes: ['pem', 'key'],
		defaultexpiration: 3600
	},
	connection: connection
};

