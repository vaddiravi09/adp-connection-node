'use strict';

var APIProduct = require('./apiProduct');
var authenticate = require('./authenticate');
var log = require('winston');

/**
@class ADPAPIConnection
@description Connection object for access to ADP APIs.
*/
function ADPAPIConnection(opts) {
	var auth;

	/**
	@private
	@type {string}
	@memberof ADPAPIConnection
	@description Value for the grant type associated with the {@link ADPAPIConnection} instance.
	*/
	this.granttype = opts.granttype;


	/**
	@memberof ADPAPIConnection
	@description Initialize the connection with instance of Connection type
	@param connType {ConnectionType} Connection Type should be {@link ClientCredentialsConnectionType} OR {@link AuthorizationCodeConnectionType}
	@returns {void}
	*/
	this.init = function init(connType) {
		this.connType = connType;
	};

	/**
	@memberof ADPAPIConnection
	@description Connect to ADP. This step is required to obtain the access token which is required to make API calls.
	@param _opts {object} Object literal. Deprecated
	@param cb {function} Callback function to execute upon successful connection or upon exception during connection routine.
	@listens tokenRefresh
	@returns {void}
	*/
	this.connect = function connect(_opts, cb) {

		if(!this.connType) {
			throw new Error('Please initialize the connection with a valid connection type using ADPConnection.init(connType). ');
		}

		this.associateoid = _opts.associateoid;
		this.orgoid = _opts.orgoid;
		this.cb = cb;
		auth = authenticate(this.connType);
		/*
		if(auth.setAuthorizationCode) {
			auth.setAuthorizationCode(_opts.authCode);
		}
		*/
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

	/**
	@memberof ADPAPIConnection
	@description Disconnect this instance of APIAPIConnection. This method will disconnect revoke the access token.
	@returns disconnected {boolean}
	*/
	this.disconnect = function disconnect() {
		return true;
	};

	/**
	@private
	@memberof ADPAPIConnection
	@description Intialize the {@link APIProduct} instance.
	@returns {void}
	*/
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

	/**
	@private
	@memberof ADPAPIConnection
	@description called internally when authentication method allows refreshed access tokens.
	@returns {void}
	*/
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
