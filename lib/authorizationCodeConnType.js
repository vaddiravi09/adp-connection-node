'use strict';

function AuthorizationCodeConnectionType() {

	this.granttype = 'authorization_code';

	this.setCallbackUrl = function setCallbackUrl(val) {
		if(typeof val === 'string') {
			this.callbackUrl = val;
		} else {
			throw new TypeError('Callback Url must be valid.');
		}
	};

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

	this.getAuthorizationRequest = function getAuthorizationRequest() {

		if(!this.authorizationUrl) {
			throw Error('Missing authorization url. Use ConnectionType.setAuthorizationUrl(string) to set value.');
		}
		if(!this.clientId) {
			throw Error('Missing client id information. Use ConnectionType.setClientId(string) to set value.');
		}
		if(!this.callbackUrl) {
			throw Error('Missing callback url information. Use ConnectionType.setCallbackUrl(string) to set value.');
		}

		return encodeURI(
			this.authorizationUrl +
			'?client_id=' + this.clientId +
			'&response_type=code' +
			'&redirect_uri=' + this.callbackUrl +
			'&scope=openid' +
			'&state=' + Math.random());
	};

	this.init = function init(initializationObject) {
		var keys = Object.keys(initializationObject);
		keys.forEach(function keysForEach(key){
			this[key] = initializationObject[key];
		}.bind(this));
	};

}

module.exports = AuthorizationCodeConnectionType;
