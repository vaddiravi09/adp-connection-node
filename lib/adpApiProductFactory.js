'use strict';

var mapProducts = require('./mapProducts');
var APIProductInstance = require('./apiProductInstance');
var log = require('winston');
var config = require('config');

/**
@class ADPAPIProductFactory
*/
function ADPAPIProductFactory() {

	var mapped = mapProducts();

	/**
	@private
	@memberof ADPAPIProductFactory
	@description Intialize the {@link APIProductInstance} instance.
	@returns {void}
	*/
	this.createApiProduct = function createApiProduct(connection, productName) {
		var mappedProduct;

		mapped.forEach(function forEachCb(product) {
			if(productName === product.productName) {
				mappedProduct = product;
			}
		});
		if(mappedProduct) {
			var apiProductInstance = new APIProductInstance(connection, mappedProduct);
			var helperMap = config.get('helperMap');
			var HelperClass = require('./' + helperMap[productName]);
			return new HelperClass(connection, apiProductInstance);
		} else {
			log.error('Unable to map api product ' + productName);
			return null;
		}
	};
}

module.exports = ADPAPIProductFactory;
