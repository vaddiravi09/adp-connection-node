'use strict';

var APIProduct = require('./apiProduct');
var ADPConnection = require('./adpConnection');
var log = require('winston');
var config = require('config');
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
		var grantMap = config.get('grantMap');
		var validGrantTypes = _.pluck(grantMap, 'type');
		if(~validGrantTypes.indexOf(granttype)) {
			log.info('Found mapped grant type module for ' + granttype);
			return new ADPConnection({granttype: granttype});
		}
	};

	this.apiProduct = function apiProduct(connection, product) {
		return new APIProduct().apiProduct(connection, product);
	};

}

module.exports = ADPAPIConnectionFactory;
