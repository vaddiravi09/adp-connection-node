'use strict';

var APIProduct = require('./apiProduct');
var ADPConnection = require('./adpConnection');
var authenticate = require('./authenticate');
var log = require('winston');
var config = require('config');
var _ = require('underscore');

class ADP {

	constructor() {
	}

	preconnect(connection, granttype, res) {
		var preconnecttypes = config.get('connect.preconnecttypes');
		var auth = authenticate('authorization_code');
		var authorizationurl = auth.authorizationUrl(connection);
		console.log(authorizationurl);
		if(~preconnecttypes.indexOf(granttype)) {
			res.redirect(authorizationurl);
		} else {
			throw new TypeError('Invalid grant type for preconnection routine. Check `config>default.js>connect>granttype`. Valid types are `' + preconnecttypes + '`');
		}
	}

	createConnection(granttype) {
		var grantMap = config.get('grantMap');
		var validGrantTypes = _.pluck(grantMap, 'type');
		if(~validGrantTypes.indexOf(granttype)) {
			return new ADPConnection({granttype: granttype});
		}
	}

	apiProduct(connection, product) {
		return new APIProduct().apiProduct(connection, product);
	}

}

module.exports = ADP;
