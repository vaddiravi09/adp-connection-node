'use strict';

var log = require('winston');
var events = require('events');
var readCerts = require('./readCerts');
var fs = require('fs');
var _ = require('underscore');
var request = require('request');
var config = require('config');

class Authenticate {

	constructor() {

	}

	init(cb) {
		this.getCerts(cb);
	}

	getCerts(cb) {
		readCerts((err, certs) => {
			if(err) {
				return cb(err, certs);
			}
			this.certs = certs;
			this.getAccessToken(cb);
		});
	}

	getAccessToken(cb) {
		var pem = _.where(this.certs, {type: 'pem'})[0];
		var key = _.where(this.certs, {type: 'key'})[0];

		var postbody = {
			agentOptions: {
				ca: [fs.readFileSync(pem.path)],
				key: fs.readFileSync(key.path),
				cert: fs.readFileSync(pem.path),
				securityOptions: config.get('connect.securityoptions')
			},
			strictSSL: false,
			auth: {
				user: config.get('connect.client.id'),
				pass: config.get('connect.client.secret'),
				sendImmediately: true
			},
			form: {
				grant_type: config.get('connect.granttype')
			}
		};

		request.post( config.get('connect.tokenurl'), postbody, function postCb(err, response, body) {
			var parsed;
			try{
				parsed = JSON.parse(body);
			} catch (exception) {
				return cb(exception, body);
			}
			if(!parsed || !parsed.access_token) {
				log.error('Unable to retrieve access token.');
			}
			cb(err, parsed);
		});

	}

}

Authenticate.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = new Authenticate();
