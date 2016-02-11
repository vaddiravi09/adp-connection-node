/*'use strict';
require('chai').should();
var ADP = require('../../lib/adp.js');
var ADPConnection = require('../../lib/adpConnection.js');
var APIProductInstance = require('../../lib/apiProductInstance.js');

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


	it('should allow preconnect for Authorization code.', function itCb(done){
		anotherconnection = adp.createConnection('authorization_code');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		anotherconnection.setClientId('ec762f06-7410-4f6d-aa82-969902c1836a');
		anotherconnection.setClientSecret('6daf2cd7-4604-46c0-ab43-a645a6571d34');
		var mockres = {
			redirect: function(url) {
				console.log('mock redirecting to ' + url);
			}
		}
		adp.preconnect(anotherconnection, 'authorization_code', mockres);
		done();
	});

	it('should fail preconnect for client credentials grant type.', function itCb(done){
		anotherconnection = adp.createConnection('client_credentials');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true
		};
		anotherconnection.setClientId('ec762f06-7410-4f6d-aa82-969902c1836a');
		anotherconnection.setClientSecret('6daf2cd7-4604-46c0-ab43-a645a6571d34');
		var mockres = {
			redirect: function(url) {
				console.log('mock redirecting to ' + url);
			}
		}
		try{
			adp.preconnect(anotherconnection, 'client_credentials', mockres);
			(false).should.equal(true);
		} catch(err) {
			console.log(err);
			(err === null).should.equal(false);
		}
		done();
	});

	it('should allow connect for Authorization code grant type.', function itCb(done){
		connection = adp.createConnection('authorization_code');
		var options = {
			associateoid: 'G3DHY9KFVPP9WGHE',
			orgoid: 'G3DHY9KFVPP9RGAK',
			docs: true,
			keepAlive: true, 
			authCode: 'notvalid'
		};
		connection.setClientId('ec762f06-7410-4f6d-aa82-969902c1836a');
		connection.setClientSecret('6daf2cd7-4604-46c0-ab43-a645a6571d34');
		
		connection.connect(options, function connectCb(err) {
			(err === null).should.equal(false);
			done();
		});
	});


});

*/