'use strict';

var fs = require('fs');
var log = require('winston');
var config = require('../config/default');

/**
@module ReadCerts
@description This module validates that the cert files exist. It also validates the file types against the config>connect>validCertTypes array.
@param opts {object} contains cert property which is array of cert file locations.
@param cb {function} Function to be executed once cert files are validated or upon exception during validation.
@returns {void}
*/
module.exports = function readCerts(opts, cb) {
	var certFiles = opts.certs;
	var certFileTypes = config.connect.validCertTypes;
	var certPaths = [];
	var err;
	certFiles.forEach(function certFilesForEachCb(f) {
		try{
			fs.readFileSync(f);
			var fileType;
			try{
				fileType = f.substring(f.lastIndexOf('.') + 1, f.length);
			} catch(exception) {
				err = exception;
			}
			if(~certFileTypes.indexOf(fileType)){
				certPaths.push({
					type: fileType,
					path: f
				});
			}
		} catch(e) {
			err = ReferenceError('Cert files provided cannot be found. `' + f + '` was not present.');
		}

	});
	if(certPaths.length === 0){
		log.error('Unable to find valid cert files.');
	} else {
		log.info('Cert files located. Files: ' + JSON.stringify(certPaths));
	}
	return cb(err, certPaths);
};
