'use strict';

var log = require('winston');
var events = require('events');
var readCerts = require('./readCerts');
var fs = require('fs');
var _ = require('underscore');
var config = require('config');
var Post = require('./post');

class Authenticate {

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

	authorizationUrl() {
		var authorizationurl = config.get(this.app).connect.authorizationurl;
		var clientId = config.get(this.app).connect.client.id;
		var clientSecret = config.get(this.app).connect.client.secret;
		var responseType = config.get(this.app).connect.responsetype;
		var callbackUrl = config.get(this.app).connect.callbackurl;
		var scope = config.get(this.app).connect.scope;

		if(!authorizationurl) {
			throw Error('Missing authorization url. Check `config>default.js>connect.authorizationurl` value.');
		}
		if(!clientId || !clientSecret) {
			throw Error('Missing client information. Check `config>default.js>connect.client` configuration.');
		}
		if(!callbackUrl) {
			throw Error('Missing callback url information. Check `config>default.js>connect.callbackurl` value.');
		}
		if(!responseType) {
			throw Error('Missing response type url information. Check `config>default.js>connect.responsetype` value.');
		}
		if(!scope) {
			throw Error('Missing response type url information. Check `config>default.js>connect.scope` value.');
		}

		return encodeURI(
			authorizationurl +
			'?client_id=' + clientId +
			'&response_type=' + responseType +
			'&redirect_uri=' + callbackUrl +
			'&scope=' + scope +
			'&state=' + Math.random());
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
		this.tokenEpiration = (token.expires_in || config.get(this.app).connect.defaultexpiration) * 1000;
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
		this.cb(err, token);
	}

	buildTokenRequestBody() {
		var securityOptions = config.get(this.app).connect.securityoptions;
		var clientId = config.get(this.app).connect.client.id;
		var clientSecret = config.get(this.app).connect.client.secret;
		var granttype = config.get(this.app).connect.granttype;
		var pem = _.where(this.certs, {type: 'pem'})[0];
		var key = _.where(this.certs, {type: 'key'})[0];
		var preconnecttypes = config.get(this.app).connect.preconnecttypes;
		var callbackUrl = config.get(this.app).connect.callbackurl;

		if(!securityOptions) {
			throw Error('Missing security options. Check `config>default.js>connect.securityoptions` value.');
		}
		if(!clientId || !clientSecret) {
			throw Error('Missing client information. Check `config>default.js>connect.client` configuration.');
		}
		if(!granttype) {
			throw Error('Missing grant type. Check `config>default.js>connect>granttype` value.');
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

		if(this.authCode && ~preconnecttypes.indexOf(granttype)) {
			payload.form.code = this.authCode;
			payload.form.redirect_uri = callbackUrl;
			payload.form.client_id = clientId;
			payload.form.client_secret = clientSecret;
			delete payload.auth;
		}
		return payload;
	}

}

Authenticate.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Authenticate;
