'use strict';
// var Request = require('./request');
var Request = require('./apiRequest');
// var config = require('config');

class APIProductInstance {

	constructor(opts, product) {
		this.product = product;
		this.associateoid = opts.associateoid;
		this.orgoid = opts.orgoid;
		this.accessToken = opts.accessToken;
	}

	call(method, cb) {
		this.product.calls.forEach((call) => {
			if(call.methodName === method) {
				let options = {
					requestDesc: this.product.className + '.' + method,
					path: call.path,
					headers: {
						Authorization: 'Bearer ' + this.accessToken
					}
				};
				new Request(options, cb);
			} else {
				cb(ReferenceError('Invalid method name. Failed to find method `' + method + '`'), null);
			}
		});
	}
}

module.exports = APIProductInstance;
