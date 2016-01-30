'use strict';
// var Request = require('./request');
var Request = require('./apiRequest');
var config = require('config');
var fs = require('fs');

class APIProductInstance {

	constructor(conn, product) {
		this.product = product;
		this.conn = conn;
	}

	call(method, cb) {
		this.product.calls.forEach((call) => {
			if(call.methodName === method) {
				let options = {
					requestDesc: this.product.className + '.' + method,
					url: (this.conn.apiUrl || config.get('apiurl')) + call.path,
					headers: {
						Authorization: 'Bearer ' + this.conn.accessToken
					},
					agentOptions: {
						ca: [fs.readFileSync('iatCerts/iat.pem')],
						key: fs.readFileSync('iatCerts/iat.key'),
						cert: fs.readFileSync('iatCerts/iat.pem')
					}
				};
				console.log(options);
				new Request(options, cb);
			} else {
				cb(new ReferenceError('Invalid method name. Failed to find method `' + method + '`'), null);
			}
		});
	}
}

module.exports = APIProductInstance;
