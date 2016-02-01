'use strict';
var request = require('request');
var log = require('winston');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class APIRequest {

	constructor(opts, cb) {
		this.requestDesc = opts.requestDesc;
		this.headers = opts.headers;
		this.agentOptions = opts.agentOptions;
		this.url = opts.url;
		this.cb = cb;
		this.fetch();
	}

	fetch() {
		request.get({uri: this.url, headers: this.headers, agentOptions: this.agentOptions}, this.response.bind(this));
	}

	response(err, resp, data) {
		log.info(this.requestDesc + ' responded with status code ' + resp.statusCode);
		let parsed;
		try{
			parsed = JSON.parse(data);
		} catch(e) {
			log.error('Error parsing JSON response from ' + this.requestDesc);
			return this.cb(e, data);
		}
		if(err) {
			log.error('Error response from ' + this.requestDesc);
			return this.cb(err, data);
		}
		return this.cb(null, parsed);
	}

}

module.exports = APIRequest;
