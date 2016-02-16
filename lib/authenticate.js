/*
Copyright © 2015-2016 ADP, LLC.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied.  See the License for the specific language
governing permissions and limitations under the License.
*/

'use strict';

var log = require('winston');
var config = require('../config/default');
var _ = require('underscore');

/**
@module Authenticate
@description Factory module for producing instance of {@link ClientCredentialsConnection} OR {@link AuthorizationCodeConnection}
@param conn {ADPAPIConnection} Connected instance of {@link ADPAPIConnection}
*/
module.exports = function auth(conn) {
	try{
		var grantMap = config.grantMap;
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
