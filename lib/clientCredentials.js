'use strict';

var log = require('winston');
var events = require('events');
var readCerts = require('./readCerts');
var fs = require('fs');
var _ = require('underscore');
var config = require('config');
var Post = require('./post');

class ClientCredentials {

	constructor(conn) {
		this.granttype = conn.granttype;
		this.conn = conn;
	}

	init(opts, cb) {
		log.info('Initializing ' + this.granttype + ' connection.');
		this.keepAlive = opts.keepAlive;
		this.opts = opts;
		this.cb = cb;
		this.getCerts();
	}

	getCerts() {
		readCerts({app: this.app, certs: this.opts.certs}, (err, certs) => {
			if(err) {
				return this.cb(err, certs);
			}
			this.certs = certs;
			this.getAccessToken();
		});
	}

	refreshToken() {
		setTimeout(() => {
			this.getAccessToken((err, token) => {
				if(err) {
					return this.emit('failedTokenRefresh', err);
				}
				this.emit('tokenRefresh', token);
			});
		}, this.tokenEpiration);
	}

	setTokenExpiration(token) {
		this.tokenEpiration = (token.expires_in || config.get('connect.defaultexpiration')) * 2;
	}

	getAccessToken() {
		var options = {
			requestDesc: 'Access Token Request',
			app: this.app,
			url: config.get('connect.tokenurl'),
			payload: this.buildTokenRequestBody()
		};
		new Post(options, this.parseTokenResponse.bind(this));
	}

	parseTokenResponse(err, token) {
		if(err) {
			log.error('Get access token retuned error.' + err);
		}
		if(!token || !token.access_token) {
			log.error('Unable to retrieve access token.');
		} else {
			this.setTokenExpiration(token);
			if(this.keepAlive) this.refreshToken();
		}
		if(typeof this.cb === 'function') {
			this.cb(err, token);
		}
		// why? because we only want this callback executed once.
		// This allows us to reuse this method when performing
		// a token refresh. Have fun Java :)
		delete this.cb;
	}

	buildTokenRequestBody() {
		var clientId = this.opts.clientid || config.get('connect.client.id');
		var clientSecret = this.opts.clientsecret || config.get('connect.client.secret');
		var pem = _.where(this.certs, {type: 'pem'})[0];
		var key = _.where(this.certs, {type: 'key'})[0];

		if(!clientId || !clientSecret) {
			throw Error('Missing client information. Check `config>default.js>connect.client` configuration.');
		}

		var payload = {
			agentOptions: {
				ca: [fs.readFileSync(pem.path)],
				key: fs.readFileSync(key.path),
				cert: fs.readFileSync(pem.path)
			},
			strictSSL: false,
			auth: {
				user: clientId,
				pass: clientSecret,
				sendImmediately: true
			},
			form: {
				grant_type: this.granttype
			}
		};
		return payload;
	}

}

ClientCredentials.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = ClientCredentials;
