'use strict';

var log = require('winston');
var config = require('config');
var _ = require('underscore');

module.exports = function auth(granttype) {
	//try{
		let grantMap = config.get('grantMap');
		let map = _.where(grantMap, {type: granttype})[0];
		if(map) {
			log.info('Authentication module found for grant type ' + granttype);
			let Auth = require('./' + map.module)
			return new Auth(granttype);
		} else {
			throw new TypeError('Unable to find authorization module based on configured grant type. Check `config>default.js>connect>granttype` value.');
		}
	/*} catch(e) {
		console.log(e);
		throw new Error('Unable to find authorization module based on configured grant type. Check `config>default.js>connect>granttype` value.');
	}*/
};
