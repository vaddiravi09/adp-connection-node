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
	},
	helperMap: {
		UserInfo: 'userInfoHelper',
		Worker: 'workerHelper'
	}
};

// API CLient Client Creds
/*
id: 'e62f181c-3233-4636-bb82-9be5c9f3e3e0',
secret: 'fbce97f8-5d3a-42cc-a774-9126c5270625'

// Suggestion box
// id: 'd760d3e6-a7d4-4241-a09f-afd3c60f1b70',
// secret: 'f971bcd4-21bc-470c-93f9-7681c53506f2'

// API Client Auth Code
id: '0eb539af-cb0b-4097-b1a4-3b34c0ee8d7b',
secret: '2a41ec4e-b3d8-4dd2-879a-d7fe5c717d1c'
*/

