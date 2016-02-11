'use strict';

var log = require('winston');
var events = require('events');
var readCerts = require('./readCerts');
var fs = require('fs');
var config = require('../config/default');
var Post = require('./post');

/**
@class ClientCredentialsConnection
@param conn {ADPAPIConnection} Connected instance of {@link ADPAPIConnection}
*/
function ClientCredentialsConnection(conn) {

	/**
	@private
	@memberof ClientCredentialsConnection
	@type {string}
	@description Value for the grant type associated with the {@link ClientCredentialsConnection} instance.
	*/
	this.granttype = conn.granttype;

	/**
	@memberof ClientCredentialsConnection
	@description Initiates the connection flow for `authorization_code` grant type.
	@returns {void}
	*/
	this.connect = function connect(opts, cb) {
		log.info('Initializing ' + this.granttype + ' connection.');
		this.keepAlive = opts.keepAlive;
		this.opts = opts;
		this.cb = cb;
		this.getCerts();
	};

	/**
	@private
	@memberof ClientCredentialsConnection
	@description Calls the {@link readCerts} module to validate the cert files and return the cert map.
	@returns {void}
	*/
	this.getCerts = function getCerts() {
		var certPaths = [conn.sslCertPath, conn.sslKeyPath];
		readCerts({certs: certPaths}, function readCertsCb(err, certs) {
			if(err) {
				return this.cb(err, certs);
			}
			this.certs = certs;
			this.getAccessToken();
		}.bind(this));
	};

	/**
	@private
	@memberof ClientCredentialsConnection
	@description Refreshes the access token when the token expires.
	@fires tokenRefresh
	@returns {void}
	*/
	this.refreshToken = function refreshToken() {
		setTimeout(this.askForRefresh.bind(this), this.tokenExpiration);
	};

	this.askForRefresh = function askForRefresh() {
		this.getAccessToken(function getAccessTokenCb(err, token) {
			if(err) {
				return this.emit('failedTokenRefresh', err);
			}
			this.emit('tokenRefresh', token);
		}.bind(this));
	};

	/**
	@memberof ClientCredentialsConnection
	@description Sets the token expiration based on the epiration sent from the token end point.
	@param token {object} Token response object.
	@returns {void}
	*/
	this.setTokenExpiration = function setTokenExpiration(token) {
		this.tokenExpiration = (token.expires_in || config.connect.defaultexpiration) * 1000;
	};

	/**
	@private
	@memberof ClientCredentialsConnection
	@description Make call to get access token.
	@returns {void}
	*/
	this.getAccessToken = function getAccessToken() {
		var options = {
			requestDesc: 'Access Token Request',
			url: conn.tokenUrl,
			payload: this.buildTokenRequestBody()
		};
		new Post(options, this.parseTokenResponse.bind(this));
	};

	/**
	@private
	@memberof ClientCredentialsConnection
	@description Parse token response.
	@param err {object} Error object if errors occurred during token request call.
	@param token {object} token response payload.
	@returns {void}
	*/
	this.parseTokenResponse = function parseTokenResponse(err, token) {
		if(err) {
			log.error('Get access token retuned error.' + err);
		}
		if(!token || !token.access_token) {
			log.error('Unable to retrieve access token.');
		} else {
			this.setTokenExpiration(token);
			if(this.keepAlive) this.refreshToken();
		}
		if(typeof this.cb === 'function') {
			this.cb(err, token);
		}

		delete this.cb;
	};

	/**
	@private
	@memberof ClientCredentialsConnection
	@description Helper function to produce token request payload.
	@returns payload {object} object representation of JSON payload.
	*/
	this.buildTokenRequestBody = function buildTokenRequestBody() {
		return {
			agentOptions: {
				ca: [fs.readFileSync(conn.sslCertPath)],
				key: fs.readFileSync(conn.sslKeyPath),
				cert: fs.readFileSync(conn.sslCertPath)
			},
			strictSSL: false,
			auth: {
				user: conn.clientId,
				pass: conn.clientSecret,
				sendImmediately: true
			},
			form: {
				grant_type: this.granttype
			}
		};
	};

}

ClientCredentialsConnection.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = ClientCredentialsConnection;
