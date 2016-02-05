'use strict';
var Request = require('./apiRequest');
var config = require('config');
var fs = require('fs');

function APIProductInstance(conn, product) {

	this.call = function call(method, cb) {
		product.calls.forEach(function forEachCb(apicall) {
			if(apicall.methodName === method) {
				console.log('apicall.path', apicall.path);
				var options = {
					requestDesc: product.className + '.' + method,
					url: (conn.apiUrl || config.get('connect.apiurl')) + apicall.path,
					headers: {
						Authorization: 'Bearer ' + conn.accessToken
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
		});
	};
}

module.exports = APIProductInstance;
