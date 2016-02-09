'use strict';
var Request = require('./apiRequest');
var fs = require('fs');
var interpolate = require('./interpolate');

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
	this.call = function call(method, opts, cb) {
		product.calls.forEach(function forEachCb(apicall) {
			if(apicall.methodName === method) {
				var path = interpolate(apicall.path, opts);
				var options = {
					requestDesc: product.productName + '.' + method,
					url: conn.connType.apiUrl + path,
					headers: {
						Authorization: 'Bearer ' + conn.accessToken
					},
					agentOptions: {
						ca: [fs.readFileSync(conn.connType.sslCertPath)],
						key: fs.readFileSync(conn.connType.sslKeyPath),
						cert: fs.readFileSync(conn.connType.sslCertPath)
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
