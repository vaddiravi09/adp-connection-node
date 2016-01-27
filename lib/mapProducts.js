'use strict';

var tmpMap = require('./tmpMap');

module.exports = function mapProducts(perms) {
	var mapped = tmpMap.defaultProducts;
	perms.forEach((perm) => {
		tmpMap.products.forEach((product) => {
			product.calls.forEach((call) => {
				if(~call.roleCodes.indexOf(perm.roleCode) && call.canonicalUri === perm.canonicalUri) {
					call.path = perm.path;
					mapped.push(product);
				}
			});
		});
	});
	return mapped;
};
