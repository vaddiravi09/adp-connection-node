'use strict';

var APIProduct = require('./apiProduct');
var authenticate = require('./authenticate');
var log = require('winston');
var _ = require('underscore');

function ADPConnection(opts) {

	this.granttype = opts.granttype;
	this.certs = ['iatCerts/iat.pem', 'iatCerts/iat.key'];

	this.setCallbackUrl = function setCallbackUrl(val) {
		if(typeof val === 'string') {
			this.callbackUrl = val;
		} else {
			throw new TypeError('Callback Url must be valid.');
		}
	};

	this.setCertFiles = function setCertFiles(arr) {
		if(typeof arr.forEach === 'function' && arr.length > 1) {
			this.certs = arr;
		} else {
			throw new TypeError('Certificate Files must be an array of relative file paths.');
		}
	};

	this.setClientId = function setClientId(val) {
		if(typeof val === 'string') {
			this.clientId = val;
		} else {
			throw new TypeError('Client Id must be valid.');
		}
	};

	this.setClientSecret = function setClientSecret(val) {
		if(typeof val === 'string') {
			this.clientSecret = val;
		} else {
			throw new TypeError('Client Secret must be valid.');
		}
	};

	this.setTokenUrl = function setTokenUrl(val) {
		if(typeof val === 'string') {
			this.tokenUrl = val;
		} else {
			throw new TypeError('Token Url must be valid.');
		}
	};

	this.setAuthorizationUrl = function setAuthorizationUrl(val) {
		if(typeof val === 'string') {
			this.authorizationUrl = val;
		} else {
			throw new TypeError('Token Url must be valid.');
		}
	};

	this.setApiUrl = function setApiUrl(val) {
		if(typeof val === 'string') {
			this.apiUrl = val;
		} else {
			throw new TypeError('Token Url must be valid.');
		}
	};

	this.getAuthOptions = function getAuthOptions() {
		return {
			authorizationurl: this.authorizationUrl,
			clientid: this.clientId,
			clientsecret: this.clientSecret,
			callbackurl: this.callbackUrl,
			tokenurl: this.tokenUrl,
			granttype: this.granttype,
			certs: this.certs
		};
	};

	this.connect = function connect(_opts, cb) {

		this.associateoid = _opts.associateoid;
		this.orgoid = _opts.orgoid;
		this.cb = cb;
		this.authCode = _opts.authCode;
		var combined = _.extend(_opts, this.getAuthOptions());
		var auth = authenticate(this);
		auth.init(combined, function initCb(err, token) {
			if(err) {
				log.error('Error authenticating.' + err);
			}
			if(token) {
				this.accessToken = token.access_token;
				log.info('Access Token: ' + this.accessToken);
				this.initApiProduct(_opts);
			} else {
				return this.cb(err, null);
			}
		}.bind(this));

		if(_opts.keepAlive && typeof auth.on === 'function') {
			log.info('Session KeepAlive enabled.');
			auth.on('tokenRefresh', this.refreshToken.bind(this));
		}

	};

	this.disconnect = function disconnect() {

	};

	this.initApiProduct = function initApiProduct(_opts) {
		new APIProduct().init(_opts, function initCb(err, mappedProducts) {
			if(err) {
				log.error('Unable to initialize any API Products.' + err);
				this.cb(err, null);
			} else {
				this.mappedProducts = mappedProducts;
				log.info('Initialized; Mapped ' + mappedProducts.length + ' API Products.');
				this.cb(null, null);
			}
		}.bind(this));
	};

	this.refreshToken = function refreshToken(err, token) {
		if(err) {
			log.error('Error refreshing access token.');
		} else {
			log.error('Refreshed access token.' + token.access_token);
		}
		if(token){
			this.accessToken = token.access_token;
		}
	};

}

module.exports = ADPConnection;
