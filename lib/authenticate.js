'use strict';

var log = require('winston');
var config = require('config');
var _ = require('underscore');

module.exports = function auth(conn) {
	try{
		var grantMap = config.get('grantMap');
		var map = _.where(grantMap, {type: conn.granttype})[0];
		if(map) {
			log.info('Authentication module found for grant type ' + conn.granttype);
			var Auth = require('./' + map.module);
			return new Auth(conn);
		} else {
			throw new TypeError('Unable to find authorization module based on configured grant type. Check `config>default.js>connect>granttype` value.');
		}
	} catch(e) {
		throw new Error('Unable to find authorization module based on configured grant type. Check `config>default.js>connect>granttype` value.');
	}
};
