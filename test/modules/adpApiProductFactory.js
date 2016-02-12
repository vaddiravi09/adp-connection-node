'use strict';
require('chai').should();

var adp = require('../../index');
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var ProductFactory = adp.ADPAPIProductFactory;
var log = require('winston');

var connectionFactory = new ConnectionFactory();
var productFactory = new ProductFactory();

var validInitObject = {
	clientId: 'e62f181c-3233-4636-bb82-9be5c9f3e3e0',
	clientSecret: 'fbce97f8-5d3a-42cc-a774-9126c5270625',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	sslCertPath: 'iatCerts/iat.pem',
	sslKeyPath: 'iatCerts/iat.key'
}
var validConnType = new ClientCredentialsConnType();
validConnType.init(validInitObject);

var invalidInitObject = {
	clientId: 'e62f181c-3233-4636-bb82-9be5c9f3e3e0',
	clientSecret: 'fbce97f8-5d3a-42cc-a774-9126c5270625',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	sslCertPath: 'iatCerts/iat.pem',
	sslKeyPath: 'iatCerts/iat.key'
}
var invalidConnType = new ClientCredentialsConnType();
invalidConnType.init(invalidInitObject);

var connection;
describe('ADP API Product Factory modules test', function describeCb(){

	it('Should create a User info product and allow calls.', function itCb(done){
		connection = connectionFactory.createConnection('client_credentials');
		connection.init(validConnType);
		connection.connect({keepAlive: true}, function connectCb(err){
			var userInfoHelper = productFactory.createApiProduct(connection, 'UserInfo');
			userInfoHelper.getUserInfo(null, function getUserInfoCb(err, data) {
				var userInfo = data;
				log.info(JSON.stringify(userInfo));
				done();
			});
		});
	});

	// Error Case
	it('Should not allow invalid products in product factory.', function itCb(done){
		var connection2 = connectionFactory.createConnection('client_credentials');
		connection2.init(validConnType);
		connection2.connect({}, function connectCb(err){
			var bogusHelper = productFactory.createApiProduct(connection2, 'Bogus');
			(bogusHelper === null).should.equal(true);
			done();
		});
	});

});