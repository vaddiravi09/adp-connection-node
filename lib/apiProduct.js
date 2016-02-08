'use strict';

var config = require('config');
var userProfile = require('./userProfile');
var mapProducts = require('./mapProducts');
var APIProductInstance = require('./apiProductInstance');
var log = require('winston');

/**
@class APIProduct
*/
function APIProduct() {

	/**
	@memberof APIProduct
	@description Initializes the APIProduct instance by finding mapped API Products supported by ADP.
	@param opts {object} Deprecated
	@param cb {function} Function to be executed upon successful initialization or upon exception during initialization.
	@returns {void}
 	*/
	this.init = function init(opts, cb) {
		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		this.accessToken = opts.accessToken;
		this.getUserProfile(cb);
	};

	/**
	@private
	@deprecated
	@memberof APIProduct
	@description Retrieves the User Profile for the authenticated user.
	@param cb {function} Function to be executed upon successfully pulling user profile.
	@returns {void}
 	*/
	this.getUserProfile = function getUserProfile(cb) {
		var options = {
			requestDesc: 'User Profile',
			path: config.get('userProfile.path'),
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

	/**
	@private
	@memberof APIProduct
	@description Maps API Products by finding the intersection between the supported API Products and user profile permissions. Deprecated.
	@param cb {function} Function to be executed upon mapping all API Products.
	@returns {void}
 	*/
	this.getMappedProducts = function getMappedProducts(perms, cb) {
		var mapped = mapProducts(perms);
		this.mappedProducts = mapped;
		cb(null, mapped);
	};


	/**
	@memberof APIProduct
	@description Returns instance of {@link APIProductInstance}
	@param connection {ADPAPIConnection} Connected instance of {@link ADPAPIConnection}
	@param productName {string} mapped API Product name.
	@returns APIProductInstance {APIProductInstance} Instance of {@link APIProductInstance}
 	*/
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
