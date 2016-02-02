'use strict';

var fs = require('fs');
var log = require('winston');
var config = require('config');

module.exports = function readCerts(opts, cb) {
	var certFiles = opts.certs;
	var certFileTypes = config.get('connect.validCertTypes');
	var certPaths = [];
	certFiles.forEach(function certFilesForEachCb(f) {
		try{
			fs.readFileSync(f);
			var fileType;
			try{
				fileType = f.substring(f.lastIndexOf('.') + 1, f.length);
			} catch(exception) {

				return;
			}
			if(~certFileTypes.indexOf(fileType)){
				certPaths.push({
					type: fileType,
					path: f
				});
			}
		} catch(e) {
			throw ReferenceError('Cert files provided cannot be found. `' + f + '` was not present.');
		}

	});
	if(certPaths.length === 0){
		log.error('Unable to find valid cert files.');
	} else {
		log.info('Cert files located. Files: ' + JSON.stringify(certPaths));
		cb(null, certPaths);
	}
};
