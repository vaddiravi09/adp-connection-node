'use strict';

function ClientCredentialsConnectionType() {

	this.granttype = 'client_credentials';

	this.setSSLCertPath = function setSSLCertPath(val) {
		if(typeof val === 'string') {
			this.sslCertPath = val;
		} else {
			throw new TypeError('SSL Cert Path must be valid.');
		}
	};

	this.setSSLKeyPath = function setSSLKeyPath(val) {
		if(typeof val === 'string') {
			this.sslKeyPath = val;
		} else {
			throw new TypeError('SSL Key Path must be valid.');
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

	this.setApiUrl = function setApiUrl(val) {
		if(typeof val === 'string') {
			this.apiUrl = val;
		} else {
			throw new TypeError('Token Url must be valid.');
		}
	};

	this.init = function init(initializationObject) {
		var keys = Object.keys(initializationObject);
		keys.forEach(function keysForEach(key){
			this[key] = initializationObject[key];
		}.bind(this));
	};

}

module.exports = ClientCredentialsConnectionType;
