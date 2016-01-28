'use strict';
var http = require('https');
var request = require('request');
var log = require('winston');
var config = require('config');

class APIRequest {

	constructor(opts, cb) {
		this.requestDesc = opts.requestDesc;
		this.path = opts.path;
		this.headers = opts.headers;
		this.cb = cb;
		this.fetch();
	}

	fetch() {
		var options = {
			host: config.get('apirequest.host'),
			port: config.get('apirequest.port'),
			path: this.path,
			headers: this.headers,
			strictSSL: false
		};
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
		
		//var r = http.request(options, this.response.bind(this)).on('error', this.onerror.bind(this));
		request.get({uri: config.get('apirequest.apiurl') + this.path, headers: this.headers}, this.response.bind(this))
		//r.end();
	}

	onerror(err) {
		log.error(this.requestDesc + ' EXCEPTION: ' + err.toString());
		return this.cb(err.toString(), err.toString());
	}

	response(err, resp, body) {
		console.log(err, body);
		var data = '';
/*
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
					log.error(this.requestDesc + ' returned invalid JSON: ');
					return this.cb(data.toString(), data.toString());
				}
			}
		});*/

	}

}

module.exports = APIRequest;
