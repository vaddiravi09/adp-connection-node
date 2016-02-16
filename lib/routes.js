'use strict';

var express = require('express');
var router = express.Router();
var log = require('winston');
var adp = require('./adp');
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var AuthorizationCodeConnType = adp.AuthorizationCodeConnType;
var ProductFactory = adp.ADPAPIProductFactory;

router.get('/callback', function callback(req, res){
	var userInfo;

	var connectionFactory = new ConnectionFactory();
	var productFactory = new ProductFactory();
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

	var connection = connectionFactory.createConnection('authorization_code');
	connection.init(connType);
	connection.connect(null, function connectCb() {
		var userInfoHelper = productFactory.createApiProduct(connection, 'UserInfo');
		userInfoHelper.getUserInfo(null, function getUserInfoCb(err, data) {
			log.info('UserInfo Return ' + JSON.stringify(data));
			var allData = [];
			userInfo = data;
			allData.push(userInfo);
			var workerHelper = productFactory.createApiProduct(connection, 'Worker');
			workerHelper.getWorker({associateoid: userInfo.userInfo.associateOID}, function getWorkerCb(err2, data2) {
				var worker = data2;
				log.info('Worker Return ' + JSON.stringify(worker));
				allData.push(worker);
				res.send(allData);
				res.end();
			});
		});
	});

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
	var connectionFactory = new ConnectionFactory();
	var connection = connectionFactory.createConnection('authorization_code');
	connection.init(connType);
	var url = connection.getAuthorizationRequest();
	log.info('Redirecting: ' + url);
	res.redirect(url);
});

module.exports = router;
