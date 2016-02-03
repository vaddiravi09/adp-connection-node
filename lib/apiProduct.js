'use strict';

var config = require('config');
var userProfile = require('./userProfile');
var mapProducts = require('./mapProducts');
var APIProductInstance = require('./apiProductInstance');
var log = require('winston');

function APIProduct() {

	this.init = function init(opts, cb) {
		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		this.accessToken = opts.accessToken;
		this.app = opts.app;
		this.getUserProfile(cb);
	};

	this.getUserProfile = function getUserProfile(cb) {
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
		userProfile(options, function userProfileCb(err, perms) {
			if(err || typeof perms === 'string') {
				cb({message: 'Unable to obtain permissions.'}, null);
			} else {
				this.getMappedProducts(perms, cb);
			}
		}.bind(this));
	};

	this.getMappedProducts = function getMappedProducts(perms, cb) {
		var mapped = mapProducts(perms);
		this.mappedProducts = mapped;
		cb(null, mapped);
	};

	this.apiProduct = function apiProduct(connection, productName) {
		var mappedProduct;
		if(!connection || !connection.mappedProducts) return null;

		connection.mappedProducts.forEach(function forEachCb(product) {
			if(productName === product.className) {
				mappedProduct = product;
			}
		});
		if(mappedProduct) {
			return new APIProductInstance(connection, mappedProduct);
		} else {
			log.error('Unable to map api product ' + productName);
			return null;
		}
	};

}

module.exports = APIProduct;
