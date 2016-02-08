'use strict';

var express = require('express');
var router = express.Router();
var log = require('winston');
var ADP = require('./adp');
var AuthorizationCodeConnType = require('./authorizationCodeConnType');

router.get('/callback', function callback(req, res){
	var adp = new ADP();
	var worker;
	var userInfo;
	var taxStatement;
	var corpDir;

	var connType = new AuthorizationCodeConnType();
	var initObject = {
		clientId: 'ec762f06-7410-4f6d-aa82-969902c1836a',
		clientSecret: '6daf2cd7-4604-46c0-ab43-a645a6571d34',
		apiUrl: 'https://iat-api.adp.com',
		tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
		authorizationUrl: 'https://iat-accounts.adp.com/auth/oauth/v2/authorize',
		sslKeyPath: 'iatCerts/iat.key',
		sslCertPath: 'iatCerts/iat.pem',
		callbackUrl: 'http://localhost:8889/callback',
		authorizationCode: req.query.code
	};
	connType.init(initObject);

	/*
	var options = {
		associateoid: 'G3DHY9KFVPP9WGHE',
		orgoid: 'G3DHY9KFVPP9RGAK',
		authCode: req.query.code
	};
	*/
	var options = {
		associateoid: 'G3DHY9KFVPP9WGHE',
		orgoid: 'G3DHY9KFVPP9RGAK'
	};
	var connection = adp.createConnection('authorization_code');
	connection.init(connType);
	connection.connect(options, function connectCb() {
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
		userInfo.call('read', function callCb(err2, data2) {
			if(err2) {
				log.error('Error returned from user info call.');
			}
			log.info('RETURN USER INFO READ - ' + JSON.stringify(data2));

		});
		taxStatement = adp.apiProduct(connection, 'TaxStatement');
		taxStatement.call('read', function callCb(err2, data2) {
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

	res.end();

});

router.get('/authenticate', function login(req, res) {
	var connType = new AuthorizationCodeConnType();
	var initObject = {
		clientId: 'ec762f06-7410-4f6d-aa82-969902c1836a',
		clientSecret: '6daf2cd7-4604-46c0-ab43-a645a6571d34',
		apiUrl: 'https://iat-api.adp.com',
		tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
		authorizationUrl: 'https://iat-accounts.adp.com/auth/oauth/v2/authorize',
		sslKeyPath: 'iatCerts/iat.key',
		sslCertPath: 'iatCerts/iat.pem',
		callbackUrl: 'http://localhost:8889/callback'
	};
	connType.init(initObject);
	var url = connType.getAuthorizationRequest();
	/*
	var adp = new ADP();

	var connection = adp.createConnection('authorization_code');
	connection.init(connType);
	var url = connection.getAuthorizationRequest()
	*/
	console.log('URL', url);
	res.redirect(url);
});

module.exports = router;
