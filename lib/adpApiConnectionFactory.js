'use strict';

var ADPConnection = require('./adpConnection');
var log = require('winston');
var config = require('../config/default');
var _ = require('underscore');

/**
@class ADPAPIConnectionFactory
@description contains factory method for producing instances of ADPConnection
*/
function ADPAPIConnectionFactory() {

	/**
	@memberof ADPAPIConnectionFactory
	@description Factory method for producing instances of ADPConnection
	@returns instance of {@link ADPAPIConnection}
	*/
	this.createConnection = function createConnection(granttype) {
		var grantMap = config.grantMap;
		var validGrantTypes = _.pluck(grantMap, 'type');
		if(~validGrantTypes.indexOf(granttype)) {
			log.info('Found mapped grant type module for ' + granttype);
			return new ADPConnection({granttype: granttype});
		}
	};

}

module.exports = ADPAPIConnectionFactory;
