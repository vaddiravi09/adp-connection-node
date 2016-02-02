'use strict';
var request = require('request');
var log = require('winston');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function APIRequest(opts, cb) {
	
	request.get({uri: opts.url, headers: opts.headers, agentOptions: opts.agentOptions}, response);
	
	function response(err, resp, data) {
		log.info(opts.requestDesc + ' responded with status code ' + resp.statusCode);
		var parsed;
		try{
			parsed = JSON.parse(data);
		} catch(e) {
			log.error('Error parsing JSON response from ' + this.requestDesc);
			return cb(e, data);
		}
		if(err) {
			log.error('Error response from ' + opts.requestDesc);
			return cb(err, data);
		}
		return cb(null, parsed);
	}

}

module.exports = APIRequest;
