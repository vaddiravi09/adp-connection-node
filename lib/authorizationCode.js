'use strict';

var log = require('winston');
var readCerts = require('./readCerts');
var fs = require('fs');
var config = require('../config/default');
var Post = require('./post');

/**
@class AuthorizationCodeConnection
@param conn {ADPAPIConnection} Connected instance of {@link ADPAPIConnection}
*/
function AuthorizationCodeConnection(conn) {

	/**
	@private
	@memberof AuthorizationCodeConnection
	@type {string}
	@description Value for the grant type associated with the {@link AuthorizationCodeConnection} instance.
	*/
	this.granttype = conn.granttype;

	/**
	@memberof AuthorizationCodeConnection
	@description Initiates the connection flow for `authorization_code` grant type.
	@returns {void}
	*/
	this.connect = function connect(opts, cb) {
		log.info('Initializing ' + this.granttype + ' connection.');
		if(opts.keepAlive){
			log.warn('Session KeepAlive not allowed for Authorization Code Grant Type.');
		}
		this.opts = opts;
		this.cb = cb;
		this.getCerts();
	};

	/**
	@private
	@memberof AuthorizationCodeConnection
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
	@memberof AuthorizationCodeConnection
	@description Sets the token expiration based on the epiration sent from the token end point.
	@param token {object} Token response object.
	@returns {void}
	*/
	this.setTokenExpiration = function setTokenExpiration(token) {
		var date = new Date();
		date.setSeconds(token.expires_in || config.connect.defaultexpiration)
		this.tokenExpiration = date;
	};

	/**
	@private
	@memberof AuthorizationCodeConnection
	@description Make call to get access token.
	@returns {void}
	*/
	this.getAccessToken = function getAccessToken() {
		var options = {
			requestDesc: 'Authorization Code - Access Token Request',
			url: conn.tokenUrl,
			payload: this.buildTokenRequestBody()
		};
		new Post(options, this.parseTokenResponse.bind(this));
	};

	/**
	@private
	@memberof AuthorizationCodeConnection
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
		}
		this.cb(err, token);
	};

	/**
	@private
	@memberof AuthorizationCodeConnection
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
			form: {
				grant_type: this.granttype,
				code: conn.authorizationCode,
				redirect_uri: conn.callbackUrl,
				client_id: conn.clientId,
				client_secret: conn.clientSecret
			}
		};
	};
}

module.exports = AuthorizationCodeConnection;
