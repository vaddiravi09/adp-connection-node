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
		if(err) {
			return this.cb(err, data);
		}
		log.info(this.requestDesc + ' returned ' + resp.statusCode + ' status.');
		if(resp.statusCode > 200) {
			return this.cb(data, data);
		}else{
			let parsed;
			try{
				parsed = JSON.parse(data);
			} catch(e) {
				log.error(this.requestDesc + ' returned invalid JSON. Data: ' + data);
			}
			log.debug(this.requestDesc + ' returned payload: ' + data);
			return this.cb(null, parsed);
		}

	}

}

module.exports = Post;
