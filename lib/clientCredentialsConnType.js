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

/**
@class ClientCredentialsConnectionType
*/
function ClientCredentialsConnectionType() {

	/**
	@private
	@type {string}
	@memberof ClientCredentialsConnectionType
	@description Value for the grant type associated with the {@link ClientCredentialsConnectionType} instance.
	*/
	this.granttype = 'client_credentials';

	/**
	@memberof ClientCredentialsConnectionType
	@description Set value for SSL Cert Path configuration option.
	@param val {string} String representing the path to the SSL Cert File.
	@returns {void}
	*/
	this.setSSLCertPath = function setSSLCertPath(val) {
		if(typeof val === 'string') {
			this.sslCertPath = val;
		} else {
			throw new TypeError('SSL Cert Path must be valid.');
		}
	};

	/**
	@memberof ClientCredentialsConnectionType
	@description Set value for SSL Key Path configuration option.
	@param val {string} String representing the path to the SSL Key File.
	@returns {void}
	*/
	this.setSSLKeyPath = function setSSLKeyPath(val) {
		if(typeof val === 'string') {
			this.sslKeyPath = val;
		} else {
			throw new TypeError('SSL Key Path must be valid.');
		}
	};

	/**
	@memberof ClientCredentialsConnectionType
	@description Set value for Client Id configuration option.
	@param val {string} String representing the Client Id value.
	@returns {void}
	*/
	this.setClientId = function setClientId(val) {
		if(typeof val === 'string') {
			this.clientId = val;
		} else {
			throw new TypeError('Client Id must be valid.');
		}
	};

	/**
	@memberof ClientCredentialsConnectionType
	@description Set value for Client Secret configuration option.
	@param val {string} String representing the Client Secret value.
	@returns {void}
	*/
	this.setClientSecret = function setClientSecret(val) {
		if(typeof val === 'string') {
			this.clientSecret = val;
		} else {
			throw new TypeError('Client Secret must be valid.');
		}
	};

	/**
	@memberof ClientCredentialsConnectionType
	@description Set value for Token Url configuration option.
	@param val {string} String representing the Token Url value.
	@returns {void}
	*/
	this.setTokenUrl = function setTokenUrl(val) {
		if(typeof val === 'string') {
			this.tokenUrl = val;
		} else {
			throw new TypeError('Token Url must be valid.');
		}
	};

	/**
	@memberof ClientCredentialsConnectionType
	@description Set value for API Url configuration option.
	@param val {string} String representing the API Url value.
	@returns {void}
	*/
	this.setApiUrl = function setApiUrl(val) {
		if(typeof val === 'string') {
			this.apiUrl = val;
		} else {
			throw new TypeError('Token Url must be valid.');
		}
	};

	/**
	@memberof ClientCredentialsConnectionType
	@description Initialize the connection type object.
	@param initializationObject {object} Object literal with values for some or all configuration objects.
	@returns {void}
	*/
	this.init = function init(initializationObject) {
		var keys = Object.keys(initializationObject);
		keys.forEach(function keysForEach(key){
			this[key] = initializationObject[key];
		}.bind(this));
	};

}

module.exports = ClientCredentialsConnectionType;
