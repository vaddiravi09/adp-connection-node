'use strict';

var APIProduct = require('./apiProduct');
var ADPConnection = require('./adpConnection');
var authenticate = require('./authenticate');
var log = require('winston');
var config = require('config');
var _ = require('underscore');

class ADP {

	constructor(app) {
		this.app = app;
	}

	preconnect(res) {
		var granttype = config.get(this.app).connect.granttype;
		var preconnecttypes = config.get(this.app).connect.preconnecttypes;
		var auth = authenticate(this.app);
		var authorizationurl = auth.authorizationUrl();

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
			return new ADPConnection({app: this.app, granttype: granttype});
		}
	}

	apiProduct(connection, product) {
		return new APIProduct().apiProduct(connection, product);
	}

}

module.exports = ADP;
