'use strict';

var log = require('winston');
var readCerts = require('./readCerts');
var fs = require('fs');
var _ = require('underscore');
var config = require('config');
var Post = require('./post');

function AuthorizationCodeConnection(conn) {

	this.granttype = conn.granttype;
	this.conn = conn;

	this.connect = function connect(opts, cb) {
		log.info('Initializing ' + this.granttype + ' connection.');
		if(opts.keepAlive){
			log.warn('Session KeepAlive not allowed for Authorization Code Grant Type.');
		}
		this.opts = opts;
		this.cb = cb;
		this.getCerts();
	};

	this.getCerts = function getCerts() {
		var certPaths = [this.conn.sslCertPath, this.conn.sslKeyPath];
		readCerts({app: this.app, certs: certPaths}, function readCertsCb(err, certs) {
			if(err) {
				return this.cb(err, certs);
			}
			this.certs = certs;
			this.getAccessToken();
		}.bind(this));
	};

	this.setAuthorizationCode = function setAuthorizationCode(authCode) {
		this.authCode = authCode;
	};

	this.setTokenExpiration = function setTokenExpiration(token) {
		this.tokenEpiration = (token.expires_in || config.get('connect.defaultexpiration')) * 1000;
	};

	this.getAccessToken = function getAccessToken() {
		var options = {
			requestDesc: 'Authorization Code - Access Token Request',
			url: this.conn.tokenUrl,
			payload: this.buildTokenRequestBody()
		};
		new Post(options, this.parseTokenResponse.bind(this));
	};

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

	this.buildTokenRequestBody = function buildTokenRequestBody() {
		var clientId = this.conn.clientId;
		var clientSecret = this.conn.clientSecret;
		var callbackUrl = this.conn.callbackUrl;
		var pem = _.where(this.certs, {type: 'pem'})[0];
		var key = _.where(this.certs, {type: 'key'})[0];

		var payload = {
			agentOptions: {
				ca: [fs.readFileSync(pem.path)],
				key: fs.readFileSync(key.path),
				cert: fs.readFileSync(pem.path)
			},
			strictSSL: false,
			form: {
				grant_type: this.granttype,
				code: this.authCode,
				redirect_uri: callbackUrl,
				client_id: clientId,
				client_secret: clientSecret
			}
		};
		return payload;
	};
}

module.exports = AuthorizationCodeConnection;
