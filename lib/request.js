/*
Copyright © 2015-2016 ADP, LLC.   

Licensed under the Apache License, Version 2.0 (the “License”); 
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
express or implied.  See the License for the specific language 
governing permissions and limitations under the License.
*/

'use strict';
var http = require('http');
var log = require('winston');
var config = require('config');

function Request(opts, cb) {

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
				try{
					var parsed = JSON.parse(data.toString());
					log.debug(opts.requestDesc + ' returned payload: ' + data.toString());
					return cb(null, parsed);
				}catch(e) {
					// valid JSON was not sent.
					// poor API design. 200 return code with error.
					log.error(opts.requestDesc + ' returned invalid JSON: ' + e);
					return cb(data.toString(), data.toString());
				}
			}
		});
	}

	var options = {
		host: config.get('request.host'),
		port: config.get('request.port'),
		path: opts.path,
		headers: opts.headers
	};
	var r = http.request(options, response).on('error', onerror);
	r.end();
}

module.exports = Request;
