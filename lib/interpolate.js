'use strict';

/**
@module Interpolate
@description Replace string variables using an object map. 
@param val {string} Template string with variable place holders.
@param opts {object} Object literal with replacement properties.
@returns val {string}
@example 
interpolate('replace place holders between the {somereplacement}', {somereplacement: 'braces'}) -> 'replace place holders between the braces'
*/
module.exports = function interpolate(val, opts) {
	var beginMarker = '{';
	var endMarker = '}';
	var keep = false;
	var param = '';
	var params = [];
	for(var i = 0; i < val.length; i++) {
		if(val[i] === beginMarker) {
			keep = true;
		}
		if(keep) {
			param += val[i];
		}
		if(val[i] === endMarker && param.length > 0) {
			keep = false;
			params.push(param);
			param = '';
		}
	}
	params.forEach(function paramsForEachCb(p) {
		var cleaned = p.substring(1, p.length - 1);
		if(opts[cleaned]) {
			val = val.replace(p, opts[cleaned]);
		} else {
			// log error.
		}
	});
	return val;
};
