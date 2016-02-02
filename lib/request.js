'use strict';
var http = require('http');
var log = require('winston');
var config = require('config');

function Request(opts, cb) {

	var options = {
		host: config.get('request.host'),
		port: config.get('request.port'),
		path: opts.path,
		headers: opts.headers
	};
	var r = http.request(options, response).on('error', onerror);
	r.end();

	function onerror(err) {
		log.error(opts.requestDesc + ' EXCEPTION: ' + err.toString());
		return opts.cb(err.toString(), err.toString());
	}

	function response(resp) {
		var data = '';

		resp.on('data', function dataCb(chunk) {
			data += chunk;
		});

		resp.on('end', function endCb() {
			log.info(opts.requestDesc + ' returned ' + resp.statusCode + ' status.');
			if(resp.statusCode > 200) {
				return cb(data.toString(), data.toString());
			}else{
				//try{
					var parsed = JSON.parse(data.toString());
					log.debug(opts.requestDesc + ' returned payload: ' + data.toString());
					return cb(null, parsed);
				/*}catch(e) {
					// valid JSON was not sent.
					// poor API design. 200 return code with error.
					log.error(opts.requestDesc + ' returned invalid JSON: ' + e);
					return cb(data.toString(), data.toString());
				}*/
			}
		});

	}

}

module.exports = Request;
