'use strict';

var tmpMap = require('./tmpMap');

module.exports = function mapProducts() {
	var mapped = [];
	tmpMap.products.forEach(function productsForEachCb(product) {
		product.calls.forEach(function callsForEachCb() {
			mapped.push(product);
		});
	});
	return mapped;
};
