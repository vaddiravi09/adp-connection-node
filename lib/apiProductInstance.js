'use strict';
var Request = require('./apiRequest');
var config = require('config');
var fs = require('fs');

function APIProductInstance(conn, product) {

	this.product = product;
	this.conn = conn;

	this.call = function call(method, cb) {
		this.product.calls.forEach(function forEachCb(apicall) {
			if(apicall.methodName === method) {
				var options = {
					requestDesc: this.product.className + '.' + method,
					url: (this.conn.apiUrl || config.get('connect.apiurl')) + apicall.path,
					headers: {
						Authorization: 'Bearer ' + this.conn.accessToken
					},
					agentOptions: {
						ca: [fs.readFileSync('iatCerts/iat.pem')],
						key: fs.readFileSync('iatCerts/iat.key'),
						cert: fs.readFileSync('iatCerts/iat.pem')
					}
				};
				new Request(options, cb);
			} else {
				cb(new ReferenceError('Invalid method name. Failed to find method `' + method + '`'), null);
			}
		}.bind(this));
	};
}

module.exports = APIProductInstance;
