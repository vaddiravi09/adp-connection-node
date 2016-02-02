'use strict';

var APIProduct = require('./apiProduct');
var ADPConnection = require('./adpConnection');
var authenticate = require('./authenticate');
var log = require('winston');
var config = require('config');
var _ = require('underscore');

function ADP() {

	this.preconnect = function preconnect(connection, granttype, res) {
		var preconnecttypes = config.get('connect.preconnecttypes');
		var auth = authenticate(connection);
		var authorizationurl = auth.authorizationUrl(connection);
		log.info('Authorize url: ' + authorizationurl);
		if(~preconnecttypes.indexOf(granttype)) {
			res.redirect(authorizationurl);
		} else {
			throw new TypeError('Invalid grant type for preconnection routine. Check `config>default.js>connect>granttype`. Valid types are `' + preconnecttypes + '`');
		}
	}

	this.createConnection = function createConnection(granttype) {
		var grantMap = config.get('grantMap');
		var validGrantTypes = _.pluck(grantMap, 'type');
		if(~validGrantTypes.indexOf(granttype)) {
			return new ADPConnection({granttype: granttype});
		}
	}

	this.apiProduct = function apiProduct(connection, product) {
		return new APIProduct().apiProduct(connection, product);
	}

}

module.exports = ADP;
