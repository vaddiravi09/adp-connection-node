'use strict';

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
	}
};

