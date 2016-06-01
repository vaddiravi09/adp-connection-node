'use strict';
require('chai').should();

var AuthorizationCode = require('../../lib/authorizationCode');
var mockServer = require('../lib/mockServer');
var stubConn = {
	granttype: 'authorization_code',
	sslCertPath: 'invalid/path.pem',
	sslKeyPath: 'invalid/path.key',
}

var goodConn = {
		clientId: 'ec762f06-7410-4f6d-aa82-969902c1836a',
		clientSecret: '6daf2cd7-4604-46c0-ab43-a645a6571d34',
		apiUrl: 'http://localhost:55555/api',
		tokenUrl: 'http://localhost:55555/token',
		authorizationUrl: 'http://localhost:55555/authorize',
		sslKeyPath: 'iatCerts/apiclient_iat.key',
		sslCertPath: 'iatCerts/apiclient_iat.pem',
		callbackUrl: 'http://localhost:8889/callback',
		authorizationCode: 'oops'
	};

describe('Authorization Code module tests', function describeCb(){

	before(function beforeCb(done) {
		mockServer.start(done);
	});

	after(function afterCb(done) {
		mockServer.stop(done);
	});


	it('Should allow call of connect but fail to connect.', function itCb(done){
		var auth = new AuthorizationCode(goodConn);
		auth.connect(function connectCb(err) {
			(err.message).should.equal('Unknown Authentication Error');
			done();
		});
	});

	it('Should allow call of connect and successfully connect.', function itCb(done){
		var auth = new AuthorizationCode(goodConn);
		auth.connect(function connectCb(err) {
			(typeof err).should.equal('undefined');
			done();
		});
	});

	it('Should return error when invalid cert files are provided.', function itCb(done){
		var auth = new AuthorizationCode(stubConn);
		auth.cb = function authCb(err, data) {
			(err===null).should.equal(false);
			done();
		};
		auth.getCerts();
	});

	it('Should set token expiration based on default expiration.', function itCb(done){
		var auth = new AuthorizationCode(stubConn);
		auth.setTokenExpiration({});
		(auth.tokenExpiration instanceof Date).should.equal(true);
		done();
	});

	it('Should set token expiration after parsing token response.', function itCb(done){
		var auth = new AuthorizationCode(stubConn);
		auth.cb = function authCb(err, data) {
			(auth.tokenExpiration instanceof Date).should.equal(true);
			(err===null || err===undefined).should.equal(true);
			done();
		};
		auth.parseTokenResponse(null, {access_token: 'testAccessToken', expires_in: 2});
	});
});