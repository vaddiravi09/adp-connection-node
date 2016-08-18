'use strict';

var connection = {
	apiUrl: 'https://api.adp.com',
	tokenUrl: 'https://api.adp.com/auth/oauth/v2/token',
	authorizationUrl: 'https://accounts.adp.com/auth/oauth/v2/authorize'
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

