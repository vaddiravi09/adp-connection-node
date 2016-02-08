'use strict';
var Request = require('./apiRequest');
var config = require('config');
var fs = require('fs');

/**
@class APIProductInstance
*/
function APIProductInstance(conn, product) {

	/**
	@memberof APIProductInstance
	@description Abstracted method to call available `methods` API Products mapped in the instances of {@link APIProduct}.
	@param method {string} Method name. See example below.
	@param cb {function} Function to execute upon response from method call.
	@example APIProductInstance.call('read', callbackFunction);
	*/
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
