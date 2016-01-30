'use strict';

var log = require('winston');
var events = require('events');
var readCerts = require('./readCerts');
var fs = require('fs');
var _ = require('underscore');
var config = require('config');
var Post = require('./post');

class ClientCredentials {

	constructor(app) {
		this.app = app;
	}

	init(opts, cb) {
		this.keepAlive = opts.keepAlive;
		this.authCode = opts.authCode;
		this.cb = cb;
		this.getCerts(opts);
	}

	getCerts() {
		readCerts({app: this.app}, (err, certs) => {
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
				console.log('hey');
				this.emit('tokenRefresh', token);
			});
		}, this.tokenEpiration);
	}

	setTokenExpiration(token) {
		this.tokenEpiration = (token.expires_in || config.get(this.app).connect.defaultexpiration) * 2;
	}

	getAccessToken() {
		var options = {
			requestDesc: 'Access Token Request',
			app: this.app,
			url: config.get(this.app).connect.tokenurl,
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
		var securityOptions = config.get(this.app).connect.securityoptions;
		var clientId = config.get(this.app).connect.client.id;
		var clientSecret = config.get(this.app).connect.client.secret;
		var granttype = config.get(this.app).connect.granttype;
		var pem = _.where(this.certs, {type: 'pem'})[0];
		var key = _.where(this.certs, {type: 'key'})[0];

		if(!granttype) {
			throw Error('Missing grant type. Check `config>default.js>connect>granttype` value.');
		}
		if(!securityOptions) {
			throw Error('Missing security options. Check `config>default.js>connect.securityoptions` value.');
		}
		if(!clientId || !clientSecret) {
			throw Error('Missing client information. Check `config>default.js>connect.client` configuration.');
		}

		var payload = {
			agentOptions: {
				ca: [fs.readFileSync(pem.path)],
				key: fs.readFileSync(key.path),
				cert: fs.readFileSync(pem.path),
				securityOptions: securityOptions
			},
			strictSSL: false,
			auth: {
				user: clientId,
				pass: clientSecret,
				sendImmediately: true
			},
			form: {
				grant_type: granttype
			}
		};
		return payload;
	}

}

ClientCredentials.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = ClientCredentials;
