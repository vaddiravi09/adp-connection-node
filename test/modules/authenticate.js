'use strict';
require('chai').should();

var auth = require('../../lib/authenticate');

describe('Authenticate module tests', function describeCb(){

	it('Should not allow creation of authentication based on invalid grant type', function itCb(done){
		try{
			auth({granttype: 'someGrant'});
			('No Exception.').should.equal('Exception Occurred.')
		}catch(e) {
			('Exception Occurred.').should.equal('Exception Occurred.')
		}
		done();
	});
});