'use strict';
var Request = require('./apiRequest');
var fs = require('fs');

function handleVariablePath(path, opts) {
	var beginMarker = '{';
	var endMarker = '}';
	var keep = false;
	var param = '';
	var params = [];
	for(var i = 0; i < path.length; i++) {
		if(path[i] === beginMarker) {
			keep = true;
		}
		if(keep) {
			param += path[i];
		}
		if(path[i] === endMarker && param.length > 0) {
			keep = false;
			params.push(param);
			param = '';
		}
	}
	params.forEach(function paramsForEachCb(p) {
		var cleaned = p.substring(1, p.length - 1);
		if(opts[cleaned]) {
			path = path.replace(p, opts[cleaned]);
		} else {
			// log error.
		}
	});
	return path;
}

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
				var path = handleVariablePath(apicall.path, opts);
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
