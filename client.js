'use strict';

var adp = require('./lib/adp');
var connectionFactory = adp.ADPAPIConnectionFactory;
var clientCredentialsConnType = adp.ClientCredentialsConnType;
var productFactory = adp.ADPAPIProductFactory;
var log = require('winston');

var userInfo;

var connType = clientCredentialsConnType;

var initObject = {
	clientId: 'e62f181c-3233-4636-bb82-9be5c9f3e3e0',
	clientSecret: 'fbce97f8-5d3a-42cc-a774-9126c5270625',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token'
};
connType.init(initObject);
connType.setSSLCertPath('iatCerts/iat.pem');
connType.setSSLKeyPath('iatCerts/iat.key');

var options = {
	keepAlive: true
};
var connection = connectionFactory.createConnection('client_credentials');
connection.init(connType);
connection.connect(options, function connectCb(){
	var userInfoHelper = productFactory.createApiProduct(connection, 'UserInfo');
	userInfoHelper.getUserInfo(null, function getUserInfoCb(err, data) {
		userInfo = data;
		log.info(JSON.stringify(userInfo));
		/*
		var workerHelper = productFactory.createApiProduct(connection, 'Worker');
		workerHelper.getWorker({associateoid: userInfo.userInfo.associateOID}, function getWorkerCb(err, data) {
			worker = data;
			console.log(worker);
		});
		*/
	});
});
