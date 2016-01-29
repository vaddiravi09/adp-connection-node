'use strict';
require('chai').should();
//var mongoose = require('mongoose');
var rest = require('restler');
var server = require('../../server');
var config = require('config');
var host = config.get('server.host');
var port = config.get('server.port');
var baseUrl = 'http://' + host + ':' + port;


describe('ADP module test', function descCb() {

	before(function beforeCb(done){
		server.start(done);
	});
	after(function afterCb(done){
		server.stop(done);
	});

	it('should do ADP', function itCb(done){
		rest.get(baseUrl + '/authenticate')
	  .on('complete', function completeCb(data, response){
	    console.log(data);
	    (response.statusCode).should.equal(200);
	    done();
	  }).on('error', function errCb(err, data, resp){
	  	console.log(err, data, resp);
	  });
	});


});

