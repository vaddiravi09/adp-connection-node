'use strict';

var config = require('config');
var userProfile = require('./userProfile');
var mapProducts = require('./mapProducts');
var APIProductInstance = require('./apiProductInstance');
var log = require('winston');

class APIProduct {

	constructor() {

	}

	init(opts, cb) {
		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		this.accessToken = opts.accessToken;
		this.app = opts.app;
		this.getUserProfile(cb);
	}

	getUserProfile(cb) {
		var options = {
			requestDesc: 'User Profile',
			path: config.get('userProfile.path'),
			app: this.app,
			headers: {
				associateoid: this.associateoid,
				orgoid: this.orgoid,
				realm: config.get('request.defaultrealm')
			}
		};
		userProfile(options, (err, perms) => {
			if(err || typeof perms === 'string') {
				cb({message: 'Unable to obtain permissions.'}, null);
			} else {
				this.mapProducts(perms, cb);
			}
		});
	}

	mapProducts(perms, cb) {
		var mapped = mapProducts(perms);
		this.mappedProducts = mapped;
		cb(null, mapped);
	}

	apiProduct(connection, productName) {
		var mappedProduct;
		if(!connection || !connection.mappedProducts) return null;

		connection.mappedProducts.forEach((product) => {
			if(productName === product.className) {
				mappedProduct = product;
			}
		});
		if(mappedProduct) {
			let options = {
				associateoid: connection.associateoid,
				orgoid: connection.orgoid,
				accessToken: connection.accessToken,
				app: connection.app
			};
			return new APIProductInstance(connection, mappedProduct);
		} else {
			log.error('Unable to map api product ' + productName);
			return null;
		}
	}

}

module.exports = APIProduct;
