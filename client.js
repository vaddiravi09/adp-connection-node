'use strict';

var ADP = require('./lib/adp');
var ClientCredentialsConnType = require('./lib/clientCredentialsConnType');
var log = require('winston');

var worker;
var userInfo;
var taxStatement;
var corpDir;


var adp = new ADP();
var connType = new ClientCredentialsConnType();

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
	associateoid: 'G3DHY9KFVPP9WGHE', // will go away
	orgoid: 'G3DHY9KFVPP9RGAK', // will go away
	keepAlive: true
};
var connection = adp.createConnection('client_credentials');
connection.init(connType);
connection.connect(options, function connectCb(){
	worker = adp.apiProduct(connection, 'Worker');
	if(worker) {
		worker.call('read', function callCb(err2, data2) {
			if(err2) {
				log.error('Error returned from worker call.' + err2);
			}
			log.info('RETURN WORKER READ - ' + JSON.stringify(data2));
		});
	}
	userInfo = adp.apiProduct(connection, 'UserInfo');
	userInfo.call('read', function callCb(err2, data2)  {
		if(err2) {
			log.error('Error returned from user info call.');
		}
		log.info('RETURN USER INFO READ - ' + JSON.stringify(data2));

	});
	taxStatement = adp.apiProduct(connection, 'TaxStatement');
	taxStatement.call('read', function callCb(err2, data2)  {
		if(err2) {
			log.error('Error returned from tax statement call.');
		}
		log.info('RETURN TAX INFO READ - ' + JSON.stringify(data2));
	});
	corpDir = adp.apiProduct(connection, 'CorpDirectory');
	corpDir.call('read', function callCb(err2, data2) {
		if(err2) {
			log.error('Error returned from corp directory call.');
		}
		log.info('RETURN CORP DIR INFO READ - ' + JSON.stringify(data2));
	});
});
