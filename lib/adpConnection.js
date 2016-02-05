'use strict';

var APIProduct = require('./apiProduct');
var authenticate = require('./authenticate');
var log = require('winston');

function ADPAPIConnection(opts) {
	var auth;
	this.granttype = opts.granttype;

	this.init = function init(connType) {
		this.connType = connType;
	};

	this.connect = function connect(_opts, cb) {

		if(!this.connType) {
			throw new Error('Please initialize the connection with a valid connection type using ADPConnection.init(connType). ');
		}

		this.associateoid = _opts.associateoid;
		this.orgoid = _opts.orgoid;
		this.cb = cb;
		auth = authenticate(this.connType);
		if(auth.setAuthorizationCode) {
			auth.setAuthorizationCode(_opts.authCode);
		}
		auth.connect({keepAlive: _opts.keepAlive}, function initCb(err, token) {
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

module.exports = ADPAPIConnection;
