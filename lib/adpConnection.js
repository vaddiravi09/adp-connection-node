'use strict';

var APIProduct = require('./apiProduct');
var authenticate = require('./authenticate');
var log = require('winston');
var _ = require('underscore');

class ADPConnection {

	constructor(opts) {
		this.app = opts.app;
		this.granttype = opts.granttype;
	}

	setCallbackUrl(val) {
		if(typeof val === 'string') {
			this.callbackUrl = val;
		} else {
			throw TypeError('Callback Url must be valid.');
		}
	}

	setCertFiles(arr) {
		if('length' in arr && arr.length > 1) {
			this.certFiles = arr;
		} else {
			throw TypeError('Certificate Files must be an array of relative file paths.');
		}
	}

	setClientId(val) {
		if(typeof val === 'string') {
			this.clientId = val;
		} else {
			throw TypeError('Client Id must be valid.');
		}
	}
	
	setClientSecret(val) {
		if(typeof val === 'string') {
			this.clientSecret = val;
		} else {
			throw TypeError('Client Secret must be valid.');
		}
	}

	connect(opts, cb) {

		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		opts.app = this.app;
		this.cb = cb;

		var auth = authenticate(this.app);
		auth.init({keepAlive: opts.keepAlive, authCode: opts.authCode, app: this.app}, (err, token) => {
			if(err) {
				log.error('Error authenticating.' + err);
			}
			if(token) {
				this.accessToken = token.access_token;
				log.info('Access Token: ' + this.accessToken);
				this.initApiProduct(opts);
			} else {
				return this.cb(err || {}, null);
			}
		});

		if(opts.keepAlive && typeof auth.on === 'function') {
			log.info('Session KeepAlive enabled.');
			auth.on('tokenRefresh', this.refreshToken.bind(this));
		}

	}

	disconnect() {

	}

	initApiProduct(opts) {
		new APIProduct().init(opts, (err, mappedProducts) => {
			if(err) {
				log.error('Unable to initialize any API Products.');
				this.cb(err, null);
			} else {
				this.mappedProducts = mappedProducts;
				log.info('Initialized; Mapped ' + mappedProducts.length + ' API Products.');
				this.cb(null, null);
			}
		});
	}

	refreshToken(err, token) {
		if(err) {
			log.error('Error refreshing access token.');
		} else {
			log.error('Refreshed access token.' + token.access_token);
		}
		this.accessToken = token.access_token;
	}

}

module.exports = ADPConnection;
