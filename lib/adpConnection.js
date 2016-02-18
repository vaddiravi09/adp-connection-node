/*
Copyright © 2015-2016 ADP, LLC.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied.  See the License for the specific language
governing permissions and limitations under the License.
*/

'use strict';

var authenticate = require('./authenticate');
var log = require('winston');
var uuid = require('node-uuid');
var ConfigurationException = require('adpcore').configurationException;

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
			return cb(new ConfigurationException({description: 'Uninitialized connection', message: 'Please initialize connection with connection config object.'}), null);
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
		var date = new Date();
		date.setHours(date.getHours() - 100);
		auth.tokenExpiration = date;
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
	@description Obtains the token expiration from the authorization module.
	@returns Expiration {date}
	*/
	this.getExpiration = function getExpiration() {
		return auth.tokenExpiration;
	};

	/**
	@memberof ADPAPIConnection
	@description Obtains the token expiration from the authorization module and calculates based on current date/time.
	@returns {boolean}
	*/
	this.isConnected = function isConnected() {
		return auth.tokenExpiration > new Date() ? true : false;
	};

	/**
	@memberof ADPAPIConnection
	@description Helper function to return the authorization endpoint + query string parameters for making an authorization code request.
	@returns url {string} Url to perform redirect to authorization end point.
	*/
	this.getAuthorizationRequest = function getAuthorizationRequest() {

		if(!this.connType.authorizationUrl) {
			throw new ConfigurationException({description: 'Missing configuration', message: 'Missing authorization url. Use ConnectionType.setAuthorizationUrl(string) to set value.'});
		}
		if(!this.connType.clientId) {
			throw new ConfigurationException({description: 'Missing client id information. Use ConnectionType.setClientId(string) to set value.'});
		}
		if(!this.connType.callbackUrl) {
			throw new ConfigurationException({description: 'Missing callback url information. Use ConnectionType.setCallbackUrl(string) to set value.'});
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
