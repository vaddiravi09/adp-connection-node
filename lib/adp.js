'use strict';

var APIProduct = require('./apiProduct');
var log = require('winston');
var authenticate = require('./authenticate');

class ADP {

	constructor() {

	}

	connect(opts, cb) {

		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		this.cb = cb;

		authenticate.init((err, token) => {
			if(err) {
				log.error('Error authenticating.');
			}
			this.accessToken = token.access_token;
			opts.accessToken = token.access_token;
			log.info('Access Token: ' + this.accessToken);
			this.initApiProduct(opts);
		});

		// this.initApiProduct(opts);
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

}

// ADP.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = new ADP();
