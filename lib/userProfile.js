'use strict';

var Request = require('./request');
var log = require('winston');
function parseUserProfile(data, cb) {
	var parsed = [];
	console.time('ParseUserProfile');
	if(data.userProfile) {
		var up = data.userProfile;
		var keys = Object.keys(up);
		keys.forEach(function keysForEachCb(key) {
			up[key].forEach(function keyForEachCb(perm) {
				if(perm.feature && perm.feature.functions){
					var fns = perm.feature.functions;
					var roleCode = perm.roleCode;
					fns.forEach(function fnsForEachCb(fn) {
						var fnCanonical = fn.canonicalUri.href;
						if(fn.operations) {
							fn.operations.forEach(function opForEachCb(op) {
								if(op.operationCode && op.operationCode.codeValue){
									var path;
									// console.log('op.links', op.links);
									try{
										path = op.links.length > 0 ? op.links[0].href : undefined;
									} catch(e) {
										return log.error('Unable to find valid link for operation. ' + e);
									}
									parsed.push({
										roleCode: roleCode,
										canonicalUri: fnCanonical + '/' + op.operationCode.codeValue,
										path: path
									});
								}
							});
						} else {
							return log.error('Malformed operations in user profile');
						}
					});
				} else {
					return log.error('Malformed functions in user profile');
				}
			});
		});
	} else {
		cb({message: 'Malformed User Profile.'}, {});
	}
	console.timeEnd('ParseUserProfile');
	cb(null, parsed);
}

module.exports = function getUserProfile(opts, cb) {
	new Request(opts, function requestCb(err, data) {
		if(err) {
			cb(err, err);
		} else {
			parseUserProfile(data, cb);
		}
	});
};
