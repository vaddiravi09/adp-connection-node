'use strict';
require('chai').should();
var ADP = require('../../lib/adp.js');
var ADPConnection = require('../../lib/adpConnection.js');
var APIProductInstance = require('../../lib/apiProductInstance.js');

describe('ADP module test', function descCb() {

	before(function beforeCb(done){
		done();
	});
	after(function afterCb(done){
		done();
	});
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

		done()
	});

});

