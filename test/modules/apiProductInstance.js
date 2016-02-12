'use strict';
require('chai').should();

var adp = require('../../index');
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var ProductFactory = adp.ADPAPIProductFactory;
var APIProductInstance = require('../../lib/apiProductInstance');
var productMap = require('../../lib/tmpMap');
var _ = require('underscore');
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

var connection;
describe('ADP API Product Instance modules test', function describeCb(){

	it('Should not allow invalid method calls.', function itCb(done){
		connection = connectionFactory.createConnection('client_credentials');
		connection.init(validConnType);
		connection.connect({keepAlive: true}, function connectCb(err){
			var UserInfo = _.where(productMap.products, {productName: 'UserInfo'})[0];
			var productInstance = new APIProductInstance(connection, UserInfo);
			productInstance.call('someMethod', null, function callCb(err){
				(err === null).should.equal(false);
				done();
			});
		});
	});


});