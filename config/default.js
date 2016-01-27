'use strict';

module.exports = {
	connect: {
		cert: {
			location: 'certs/',
			filetypes: ['pem', 'key']
		},
		client: {
			id: 'd760d3e6-a7d4-4241-a09f-afd3c60f1b70',
			secret: 'f971bcd4-21bc-470c-93f9-7681c53506f2'
		},
		granttype: 'client_credentials',
		securityoptions: 'SSL_OP_NO_SSLv3',
		tokenurl: 'https://apidit.nj.adp.com/auth/oauth/v2/token',
		defaultexpiration: 3600
	},
	request: {
		host: 'apimpdit.nj.adp.com',
		port: 80,
		defaultrealm: 'ISI'
	},
	apirequest: {
		host: 'apidit.nj.adp.com',
		port: 80,
		defaultrealm: 'ISI'
	},
	userProfile: {
		path: '/events/core/v1/mkpl-user-profile'
	}
};
