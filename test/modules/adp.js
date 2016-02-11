/*'use strict';
require('chai').should();
var ADP = require('../../lib/adp.js');
var ADPConnection = require('../../lib/adpConnection.js');
var APIProductInstance = require('../../lib/apiProductInstance.js');
var authenticate = require('../../lib/authenticate.js');

describe('ADP module test', function descCb() {

	var adp;
	var connection;
	var anotherconnection;
	var badconnection;
	var userInfo;
	it('should create instance of ADP', function itCb(done){
		adp = new ADP();
		(adp instanceof ADP).should.equal(true);
		done();
	});

	it('should fail to connect when providing bad config.', function itCb(done){
		badconnection = adp.createConnection('client_credentials');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		badconnection.setClientId('bad');
		badconnection.connect(options, function connectCb(err){
			(err === null).should.equal(false);
			done();
		});
	});


	it('should fail to connect when providing bad grant type.', function itCb(done){
		badconnection = adp.createConnection('some_thing');
		(badconnection instanceof ADPConnection).should.equal(false);
		done();
	});


	it('user profile should fail to connect when providing bad config.', function itCb(done){
		badconnection = adp.createConnection('client_credentials');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGH1',
			orgoid: 'G3DHY9KFVPP9RGA1',
			docs: true,
			keepAlive: true
		};
		badconnection.connect(options, function connectCb(err){
			(err === null).should.equal(false);
			done();
		});
	});


	it('should allow update of refreshed token.', function itCb(done){
		anotherconnection = adp.createConnection('client_credentials');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		anotherconnection.connect(options, function connectCb(err){
			anotherconnection.refreshToken({error: 1}, null);	
			(anotherconnection.accessToken).should.not.equal('mocktoken')
			anotherconnection.refreshToken(null, {access_token: 'mocktoken'});	
			(anotherconnection.accessToken).should.equal('mocktoken')
			
			done();
		});
	});


	it('should allow disconnect from ADPConnection.', function itCb(done){
		anotherconnection = adp.createConnection('client_credentials');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		anotherconnection.connect(options, function connectCb(err){
			anotherconnection.disconnect();
			
			done();
		});
	});


	it('should fail to connect when invalid cert file locations are given.', function itCb(done){
		adp = new ADP();
		anotherconnection = adp.createConnection('client_credentials');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		anotherconnection.setCertFiles(['iatCerts/iat.bad2', 'iatCerts/iat.bad'])
		anotherconnection.connect(options, function connectCb(err){
			(err === null).should.equal(false)
			done();
		});
	});

	it('should create instance of ADPConnection when calling createConnection method.', function itCb(done){
		connection = adp.createConnection('client_credentials');
		(connection instanceof ADPConnection).should.equal(true);
		done();
	});

	it('should allow connection to connect to ADP.', function itCb(done){
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		connection.connect(options, function connectCb(err){
			(err === null).should.equal(true);
			done();
		})
	});

	it('should allow creation of user info API Product.', function itCb(done){
		userInfo = adp.apiProduct(connection, 'UserInfo');
		(userInfo instanceof APIProductInstance).should.equal(true);
		done();
	});

	it('should allow call of user info read.', function itCb(done){
		userInfo.call('read', function readCb(err, data){
			(err === null).should.equal(true);
			done();
		});
	});

	it('should fail to call invalid method.', function itCb(done){
		userInfo.call('invalidmethod', function readCb(err, data){
			(err === null).should.equal(false);
			done();
		});
	});

	it('should create another instance of ADPConnection when calling createConnection method.', function itCb(done){
		anotherconnection = adp.createConnection('client_credentials');
		(anotherconnection instanceof ADPConnection).should.equal(true);
		done();
	});

	it('should allow setting of config options via setters.', function itCb(done){
		try{
			anotherconnection.setCallbackUrl('okay string');
			anotherconnection.setCertFiles(['okay', 'array']);
			anotherconnection.setClientId('okay string');
			anotherconnection.setClientSecret('okay string');
			anotherconnection.setTokenUrl('okay string');
			anotherconnection.setAuthorizationUrl('okay string');
			anotherconnection.setApiUrl('okay string');
			(true).should.equal(true)
		} catch(err) {
			((err)).should.equal(false);// will fail
		}
		done()
	});

	it('should fail setting of config options via setters when input is invalid.', function itCb(done){
		try{
			anotherconnection.setCallbackUrl(1);
			(true).should.equal(false)
		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}
		try{
			anotherconnection.setCertFiles(1);
			(true).should.equal(false)

		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}
		try{	
			anotherconnection.setClientId(1);
			(true).should.equal(false)

		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}			
		try{
			anotherconnection.setClientSecret(1);
			(true).should.equal(false)

		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}
		try{
			anotherconnection.setTokenUrl(1);
			(true).should.equal(false)

		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}
		try{
			anotherconnection.setAuthorizationUrl(1);
			(true).should.equal(false)

		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}
		try{
			anotherconnection.setApiUrl(1);
			(true).should.equal(false)

		} catch(err) {
			(typeof err !== 'undefined').should.equal(true);// will fail
		}
		done();
	});

	it('should fail to find auth module for invalid grant type', function itCb(done){
		try{
			var auth = authenticate({granttype: 'some_thing'});
			(true).should.equal(false);
		} catch(err) {
			(err === null).should.equal(false);
		}
		done();
	});

	it('should allow set token expiration for client_credentials', function itCb(done){
		var auth = authenticate({granttype: 'client_credentials'});
		auth.setTokenExpiration({expires_in: 100});
		(true).should.equal(true);
		done();
	});	

	it('should allow set token expiration for authorization_code', function itCb(done){
		var auth = authenticate({granttype: 'authorization_code'});
		auth.setTokenExpiration({expires_in: 100});
		(true).should.equal(true);
		done();
	});	

	it('should allow token refresh for client_credentials', function itCb(done){
		var auth = authenticate({granttype: 'client_credentials'});
		auth.refreshToken();
		(true).should.equal(true);
		done();
	});	
	it('should execute token refresh', function itCb(done){
		setTimeout(function(){
			done();
		}, 100000);
	});

});

*/