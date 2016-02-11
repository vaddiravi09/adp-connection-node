'use strict';
var request = require('request');
var log = require('winston');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

function APIRequest(opts, cb) {

	function response(err, resp, data) {
		log.info(opts.requestDesc + ' responded with status code ' + resp.statusCode);
		if(resp.statusCode !== 200 && !err && data) {
			err = data;
		}
		var parsed;
		try{
			parsed = JSON.parse(data);
		} catch(e) {
			log.error('Error parsing JSON response from ' + this.requestDesc);
			return cb(e, data);
		}
		return cb(err, parsed);
	}
	request.get({uri: opts.url, headers: opts.headers, agentOptions: opts.agentOptions}, response);
}

module.exports = APIRequest;
