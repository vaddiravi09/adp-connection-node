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
