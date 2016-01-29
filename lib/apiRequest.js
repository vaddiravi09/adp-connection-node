'use strict';
var request = require('request');
var log = require('winston');
var config = require('config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class APIRequest {

	constructor(opts, cb) {
		this.requestDesc = opts.requestDesc;
		this.path = opts.path;
		this.headers = opts.headers;
		this.app = opts.app;
		this.cb = cb;
		this.fetch();
	}

	fetch() {
		request.get({uri: config.get(this.app).apirequest.apiurl + this.path, headers: this.headers}, this.response.bind(this));
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
