'use strict';

var log = require('winston');
var config = require('config');
var _ = require('underscore');

module.exports = function auth(app) {
	try{
		let grantType = config.get(app).connect.granttype;
		let grantMap = config.get('grantMap');
		let map = _.where(grantMap, {type: grantType})[0];
		if(map) {
			log.info('Authentication module found for grant type ' + grantType);
			let Auth = require('./' + map.module);
			return new Auth(app);
		} else {
			throw new TypeError('Unable to find authorization module based on configured grant type. Check `config>default.js>connect>granttype` value.');
		}
	} catch(e) {
		throw new Error('Unable to find authorization module based on configured grant type. Check `config>default.js>connect>granttype` value.');
	}
};
