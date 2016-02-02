'use strict';

var tmpMap = require('./tmpMap');

module.exports = function mapProducts(perms) {
	var mapped = tmpMap.defaultProducts;
	perms.forEach(function permsForEachCb(perm) {
		tmpMap.products.forEach(function productsForEachCb(product) {
			product.calls.forEach(function callsForEachCb(call) {
				if(~call.roleCodes.indexOf(perm.roleCode) && call.canonicalUri === perm.canonicalUri) {
					call.path = perm.path;
					mapped.push(product);
				}
			});
		});
	});
	return mapped;
};
