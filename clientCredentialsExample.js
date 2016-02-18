'use strict';

var adp = require('./index');
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var log = require('winston');

var connType = new ClientCredentialsConnType();
var connectionFactory = new ConnectionFactory();

var initObject = {
	clientId: '88a73992-07f2-4714-ab4b-de782acd9c4d',
	clientSecret: 'a130adb7-aa51-49ac-9d02-0d4036b63541',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token'
};
connType.init(initObject);
connType.setSSLCertPath('iatCerts/apiclient_iat.pem');
connType.setSSLKeyPath('iatCerts/apiclient_iat.key');

var options = {
	keepAlive: true
};
var connection = connectionFactory.createConnection('client_credentials');
connection.init(connType);
connection.connect(options, function connectCb(err){
	if(err) {
		log.error('Not Connected');
	}else{
		log.info('Connected with token: ' + connection.accessToken);
	}
});
