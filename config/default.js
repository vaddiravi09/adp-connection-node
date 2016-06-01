'use strict';

var testconnection = {
	apiUrl: 'http://localhost:55555/api',
	tokenUrl: 'http://localhost:55555/token',
	authorizationUrl: 'http://localhost:55555/authorize'
};
var connection = {
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	authorizationUrl: 'https://iat-accounts.adp.com/auth/oauth/v2/authorize'
};
var conn = process.env.NODE_ENV === 'TEST' ? testconnection : connection;

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
	connection: conn
};

