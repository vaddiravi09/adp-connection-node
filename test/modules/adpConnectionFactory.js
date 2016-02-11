'use strict';
require('chai').should();

var adp = require('../../lib/adp');
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var ConnectionFactory = adp.ADPAPIConnectionFactory;
var AuthorizationCodeConnType = adp.AuthorizationCodeConnType;
var ProductFactory = adp.ADPAPIProductFactory;

var connectionFactory = new ConnectionFactory();
var productFactory = new ProductFactory();
var log = require('winston');

var validCCInitObject = {
	clientId: 'e62f181c-3233-4636-bb82-9be5c9f3e3e0',
	clientSecret: 'fbce97f8-5d3a-42cc-a774-9126c5270625',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	sslCertPath: 'iatCerts/iat.pem',
	sslKeyPath: 'iatCerts/iat.key'
}
var validCCConnType = new ClientCredentialsConnType();
validCCConnType.init(validCCInitObject);
/*
var invalidCCInitObject = {
	clientId: 'e62f181c-3233-4636-bb82-9be5c9f3e3e0',
	clientSecret: 'fbce97f8-5d3a-42cc-a774-9126c5270625',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	sslCertPath: 'iatCerts/iat.pem',
	sslKeyPath: 'iatCerts/iat.key'
}
var invalidCCConnType = clientCredentialsConnType;
invalidCCConnType.init(invalidCCInitObject);
*/
var validACInitObject = {
	clientId: 'ec762f06-7410-4f6d-aa82-969902c1836a',
	clientSecret: '6daf2cd7-4604-46c0-ab43-a645a6571d34',
	apiUrl: 'https://iat-api.adp.com',
	tokenUrl: 'https://iat-api.adp.com/auth/oauth/v2/token',
	authorizationUrl: 'https://iat-accounts.adp.com/auth/oauth/v2/authorize',
	sslKeyPath: 'iatCerts/iat.key',
	sslCertPath: 'iatCerts/iat.pem',
	callbackUrl: 'http://localhost:8889/callback',
	authorizationCode: 'no_code'
};

var validACConnType = new AuthorizationCodeConnType();
validACConnType.init(validACInitObject);

var connection;
describe('Client Credentials Tests', function describeCb(){

	it('ADP Connection Factory should fail to connect when not initialized with Connection type.', function itCb(done){
		connection = connectionFactory.createConnection('client_credentials');
		try{
			connection.connect({}, function connectCb(err){
				if(err) {
					('Connection Error Occurred').should.equal('Connection Error Occurred');
				} else {
					('No Connection Error').should.equal('Connection Error Occurred');
				}
				done();
			});
		} catch(e) {
			('Connection Error Occurred').should.equal('Connection Error Occurred');
			done();
		}
	});

	it('ADP Connection Factory should connect.', function itCb(done){
		connection = connectionFactory.createConnection('client_credentials');
		connection.init(validCCConnType);
		connection.connect({}, function connectCb(err){
			if(err) {
				('Connection Error Occurred').should.equal('No Connection Error');
			} else {
				('No Connection Error').should.equal('No Connection Error');
			}
			done();
		});
	});
	
	it('ADP Connection Factory should disconnect.', function itCb(done){
		connection = connectionFactory.createConnection('client_credentials');
		connection.init(validCCConnType);
		connection.connect({}, function connectCb(err){
			if(err) {
				('Connection Error Occurred').should.equal('No Connection Error');
			} else {
				('No Connection Error').should.equal('No Connection Error');
			}
			var disconnected = connection.disconnect();
			(disconnected).should.equal(true)
			done();
		});
	});


	it('ADP Connection Factory should refresh token.', function itCb(done){
		connection = connectionFactory.createConnection('client_credentials');
		connection.init(validCCConnType);
		connection.connect(null, function connectCb(err){
			if(err) {
				('Connection Error Occurred').should.equal('No Connection Error');
			} else {
				('No Connection Error').should.equal('No Connection Error');
			}
			var currentAccessToken = connection.accessToken;
			connection.refreshToken({some: 'error'}, null);
			(connection.accessToken).should.equal(currentAccessToken);
			connection.refreshToken(null, {access_token: 'testAccessToken'});
			(connection.accessToken).should.equal('testAccessToken');
			done();
		});
	});


});

describe('Authorization Code Tests', function describeCb(){

	it('ADP Connection Factory should return error', function itCb(done){
		connection = connectionFactory.createConnection('authorization_code');
		connection.init(validACConnType);
		connection.connect({keepAlive: true}, function connectCb(err){
			if(err) {
				('Connection Error Expected').should.equal('Connection Error Expected');
			} else {
				('No Connection Error').should.equal('Connection Error Expected');
			}
			done();
		});
	});

});