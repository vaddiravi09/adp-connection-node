'use strict';

var APIProduct = require('./apiProduct');
var authenticate = require('./authenticate');
var log = require('winston');
var config = require('config');

class ADP {

	constructor(app) {
		this.app = app;
	}

	preconnect(res) {
		var granttype = config.get(this.app).connect.granttype;
		var preconnecttypes = config.get(this.app).connect.preconnecttypes;
		var auth = authenticate(this.app);
		var authorizationurl = auth.authorizationUrl();

		if(~preconnecttypes.indexOf(granttype)) {
			res.redirect(authorizationurl);
		} else {
			throw new TypeError('Invalid grant type for preconnection routine. Check `config>default.js>connect>granttype`. Valid types are `' + preconnecttypes + '`');
		}
	}

	connect(opts, cb) {

		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		opts.app = this.app;
		this.cb = cb;

		var auth = authenticate(this.app);
		auth.init({keepAlive: opts.keepAlive, authCode: opts.authCode, app: this.app}, (err, token) => {
			if(err) {
				log.error('Error authenticating.' + err);
			}
			if(token) {
				this.accessToken = token.access_token;
				opts.accessToken = token.access_token;
				log.info('Access Token: ' + this.accessToken);
				this.initApiProduct(opts);
			} else {
				return this.cb(err || {}, null);
			}
		});

		if(opts.keepAlive && typeof auth.on === 'function') {
			log.info('Session KeepAlive enabled.');
			auth.on('tokenRefresh', this.refreshToken.bind(this));
		}

	}

	initApiProduct(opts) {
		APIProduct.init(opts, (err, mappedProducts) => {
			if(err) {
				log.error('Unable to initialize any API Products.');
				this.cb(err, null);
			} else {
				log.info('Initialized; Mapped ' + mappedProducts.length + ' API Products.');
				this.cb(null, null);
			}
		});
	}

	apiProduct(product) {
		return APIProduct.apiProduct(product);
	}

	refreshToken(err, token) {
		if(err) {
			log.error('Error refreshing authentication token.');
		}
		this.accessToken = token.access_token;
	}

}

module.exports = ADP;
