'use strict';
require('chai').should();

var ClientCredentials = require('../../lib/clientCredentials');
var stubConn = {
	granttype: 'client_credentials',
	sslCertPath: 'invalid/path.pem',
	sslKeyPath: 'invalid/path.key',
}

var stubConn2 = {
	granttype: 'client_credentials',
	sslCertPath: 'iatCerts/iat.pem',
	sslKeyPath: 'iatCerts/iat.key',
}

var adp = require('../../lib/adp');
var ClientCredentialsConnType = adp.ClientCredentialsConnType;
var ConnectionFactory = adp.ADPAPIConnectionFactory;

var connectionFactory = new ConnectionFactory();
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

describe('Client Credentials module tests', function describeCb(){
/*
	it('Should emit token refresh.', function itCb(done){
		var connection = connectionFactory.createConnection('client_credentials');
		connection.init(validCCConnType);
		connection.connect({}, function connectCb(err){
			if(err) {
				('Connection Error Occurred').should.equal('No Connection Error');
			} else {
				('No Connection Error').should.equal('No Connection Error');
			}
			var auth = new ClientCredentials(connection);
			auth.on('tokenRefresh', function onCb(){
				done();
			})
			auth.askForRefresh()

		});

	});

	it('Should emit failed token refresh.', function itCb(done){
		var connection = connectionFactory.createConnection('client_credentials');
		connection.init(validCCConnType);
		connection.connect({}, function connectCb(err){
			if(err) {
				('Connection Error Occurred').should.equal('No Connection Error');
			} else {
				('No Connection Error').should.equal('No Connection Error');
			}
			var auth = new ClientCredentials(stubConn2);
			auth.on('failedTokenRefresh', function onCb(){
				done();
			});
			auth.askForRefresh()

		});
		
	});
	*/

	it('Should return error when invalid cert files are provided.', function itCb(done){
			var auth = new ClientCredentials(stubConn);
			auth.cb = function authCb(err, data) {
				(err===null).should.equal(false);
				done();
			};
			auth.getCerts();
	});

	it('Should set token expiration based on default expiration.', function itCb(done){
			var auth = new ClientCredentials(stubConn);
			auth.setTokenExpiration({});
			(auth.tokenExpiration).should.equal(3600000);
			done();
	});

	it('Should set token expiration after parsing token response.', function itCb(done){
			var auth = new ClientCredentials(stubConn);
			auth.cb = function authCb(err, data) {
				(auth.tokenExpiration).should.equal(2000);
				(err===null).should.equal(true);
				done();
			};
			auth.parseTokenResponse(null, {access_token: 'testAccessToken', expires_in: 2});
	});

	it('Should fail to set token expiration after parsing token response when error is passed.', function itCb(done){
			var auth = new ClientCredentials(stubConn);
			auth.cb = function authCb(err, data) {
				(err===null).should.equal(false);
				done();
			};
			auth.parseTokenResponse({}, {});
	});
});