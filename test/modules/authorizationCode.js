'use strict';
require('chai').should();

var AuthorizationCode = require('../../lib/authorizationCode');
var stubConn = {
	granttype: 'authorization_code',
	sslCertPath: 'invalid/path.pem',
	sslKeyPath: 'invalid/path.key',
}

describe('Authorization Code module tests', function describeCb(){

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
			(auth.tokenExpiration).should.equal(3600000);
			done();
	});

	it('Should set token expiration after parsing token response.', function itCb(done){
			var auth = new AuthorizationCode(stubConn);
			auth.cb = function authCb(err, data) {
				(auth.tokenExpiration).should.equal(2000);
				(err===null).should.equal(true);
				done();
			};
			auth.parseTokenResponse(null, {access_token: 'testAccessToken', expires_in: 2});
	});
});