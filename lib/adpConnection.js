'use strict';

var authenticate = require('./authenticate');
var log = require('winston');
var uuid = require('node-uuid');
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
	@private
	@type {string}
	@memberof ADPAPIConnection
	@description State value for mananging multiple connections.
	*/
	this.state = uuid.v4();

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
		_opts = _opts || {};
		if(!this.connType) {
			throw new Error('Please initialize the connection with a valid connection type using ADPConnection.init(connType).');
		}

		this.cb = cb;
		auth = authenticate(this.connType);
		auth.connect({keepAlive: _opts.keepAlive}, function initCb(err, token) {
			if(err) {
				log.error('Error authenticating.' + err);
			}
			if(token) {
				this.accessToken = token.access_token;
				log.info('Access Token: ' + this.accessToken);
			}
			return this.cb(err, null);
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
		delete this.accessToken;
		return true;
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

	/**
	@memberof ADPAPIConnection
	@description Helper function to return the authorization endpoint + query string parameters for making an authorization code request.
	@returns url {string} Url to perform redirect to authorization end point.
	*/
	this.getAuthorizationRequest = function getAuthorizationRequest() {

		if(!this.connType.authorizationUrl) {
			throw Error('Missing authorization url. Use ConnectionType.setAuthorizationUrl(string) to set value.');
		}
		if(!this.connType.clientId) {
			throw Error('Missing client id information. Use ConnectionType.setClientId(string) to set value.');
		}
		if(!this.connType.callbackUrl) {
			throw Error('Missing callback url information. Use ConnectionType.setCallbackUrl(string) to set value.');
		}

		return encodeURI(
			this.connType.authorizationUrl +
			'?client_id=' + this.connType.clientId +
			'&response_type=code' +
			'&redirect_uri=' + this.connType.callbackUrl +
			'&scope=openid' +
			'&state=' + this.state);
	};

}

module.exports = ADPAPIConnection;
