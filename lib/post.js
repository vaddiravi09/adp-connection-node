'use strict';
var log = require('winston');
var request = require('request');

class Post {

	constructor(opts, cb) {
		this.requestDesc = opts.requestDesc;
		this.url = opts.url;
		this.headers = opts.headers;
		this.payload = opts.payload;
		this.cb = cb;
		this.post();
	}

	post() {
		request.post(this.url, this.payload, this.response.bind(this));
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

module.exports = Post;
