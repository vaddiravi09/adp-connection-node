'use strict';
require('chai').should();
var ADP = require('../../lib/adp.js');
var ADPConnection = require('../../lib/adpConnection.js');
var APIProductInstance = require('../../lib/apiProductInstance.js');
var post = require('../../lib/post.js');

describe('ADP module test', function descCb() {

	it('should fail to POST with bad options', function itCb(done) {
		var options = {
			requestDesc: 'Test desc',
			url: 'http://apimpiat.gslb.es.oneadp.com.',
			payload: {
				payload: 'stuff'
			}
		};
		new post(options, function postCb(err, resp){
			console.log(err);
			(err === null).should.equal(false);
			done();
		});
	});



});

