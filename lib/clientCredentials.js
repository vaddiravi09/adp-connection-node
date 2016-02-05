'use strict';

var log = require('winston');
var events = require('events');
var readCerts = require('./readCerts');
var fs = require('fs');
var _ = require('underscore');
var config = require('config');
var Post = require('./post');

function ClientCredentialsConnection(conn) {

	this.granttype = conn.granttype;
	this.conn = conn;

	this.connect = function connect(opts, cb) {
		log.info('Initializing ' + this.granttype + ' connection.');
		this.keepAlive = opts.keepAlive;
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

	this.refreshToken = function refreshToken() {
		setTimeout(function setTimeoutCb() {
			this.getAccessToken(function getAccessTokenCb(err, token) {
				if(err) {
					return this.emit('failedTokenRefresh', err);
				}
				this.emit('tokenRefresh', token);
			}.bind(this));
		}.bind(this), this.tokenEpiration);
	};

	this.setTokenExpiration = function setTokenExpiration(token) {
		this.tokenEpiration = (token.expires_in || config.get('connect.defaultexpiration')) * 2;
	};

	this.getAccessToken = function getAccessToken() {
		var options = {
			requestDesc: 'Access Token Request',
			app: this.app,
			url: config.get('connect.tokenurl'),
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
			if(this.keepAlive) this.refreshToken();
		}
		if(typeof this.cb === 'function') {
			this.cb(err, token);
		}

		delete this.cb;
	};

	this.buildTokenRequestBody = function buildTokenRequestBody() {
		var clientId = this.conn.clientId;
		var clientSecret = this.conn.clientSecret;
		var pem = _.where(this.certs, {type: 'pem'})[0];
		var key = _.where(this.certs, {type: 'key'})[0];

		var payload = {
			agentOptions: {
				ca: [fs.readFileSync(pem.path)],
				key: fs.readFileSync(key.path),
				cert: fs.readFileSync(pem.path)
			},
			strictSSL: false,
			auth: {
				user: clientId,
				pass: clientSecret,
				sendImmediately: true
			},
			form: {
				grant_type: this.granttype
			}
		};
		return payload;
	};

}

ClientCredentialsConnection.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = ClientCredentialsConnection;
