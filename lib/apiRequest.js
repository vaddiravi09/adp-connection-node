'use strict';
var request = require('request');
var https = require('https');
var log = require('winston');
var config = require('config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class APIRequest {

	constructor(opts, cb) {
		this.requestDesc = opts.requestDesc;
		this.path = opts.path;
		this.headers = opts.headers;
		this.agentOptions = opts.agentOptions;
		this.cb = cb;
		this.fetch();
	}

	fetch() {
		//https.get({uri: config.get(this.app).apirequest.apiurl + this.path, headers: this.headers}, this.response2.bind(this))
		request.get({uri: config.get('apiurl') + this.path, headers: this.headers, agentOptions: this.agentOptions}, this.response.bind(this));
	}

	response2(resp) {
			var data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				log.info(this.requestDesc + ' returned ' + resp.statusCode + ' status.');
				if(resp.statusCode > 200) {
					return this.cb(data.toString(), data.toString());
				}else{
					try{
						let parsed = JSON.parse(data.toString());
						log.debug(this.requestDesc + ' returned payload: ' + data.toString());
						return this.cb(null, parsed);
					}catch(e) {
						// valid JSON was not sent.
						// poor API design. 200 return code with error.
						log.error(this.requestDesc + ' returned invalid JSON: ' + e);
						return this.cb(data.toString(), data.toString());
					}
				}
			});
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
