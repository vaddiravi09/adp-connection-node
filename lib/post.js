'use strict';
var log = require('winston');
var request = require('request');

function Post(opts, cb) {

	function response(err, resp, data) {
		log.info(opts.requestDesc + ' responded with status code ' + resp.statusCode);
		var parsed;
		try{
			parsed = JSON.parse(data);
		} catch(e) {
			log.error('Error parsing JSON response from ' + opts.requestDesc);
			return cb(e, data);
		}
		if(err) {
			log.error('Error response from ' + opts.requestDesc);
			return cb(err, data);
		}
		return cb(null, parsed);
	}

	request.post(opts.url, opts.payload, response);
}

module.exports = Post;
