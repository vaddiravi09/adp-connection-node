'use strict';

var fs = require('fs');
var log = require('winston');
var config = require('config');

module.exports = function readCerts(opts, cb) {
	var certlocation = config.get(opts.app).connect.cert.location;
	var certFileTypes = config.get(opts.app).connect.cert.filetypes;
	var certPaths = [];
	fs.readdir(certlocation, (err, files) => {
		if(!err) {
			files.forEach((file) => {
				let fileType;
				try{
					fileType = file.substring(file.lastIndexOf('.') + 1, file.length);
				} catch(exception) {
					return;
				}
				if(~certFileTypes.indexOf(fileType)){
					certPaths.push({
						type: fileType,
						path: certlocation + file
					});
				}
			});
		}
		if(certPaths.length === 0){
			log.error('Unable to find valid cert files.');
			throw Error('Unable to find valid cert files. Please check configuration.');
		} else {
			log.info('Cert files located. Files: ' + JSON.stringify(certPaths));
			cb(null, certPaths);
		}
	});
};
