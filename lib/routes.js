'use strict';

var express = require('express');
var router = express.Router();
var log = require('winston');
var ADP = require('./adp');

router.get('/callback', function callback(req, res){
	var adp = new ADP('A');
	var worker;
	var userInfo;
	var taxStatement;
	var corpDir;
	var options = {
		associateoid: 'G3DHY9KFVPP9WGHE',
		orgoid: 'G3DHY9KFVPP9RGAK',
		docs: true,
		keepAlive: true,
		authCode: req.query.code
	};
	var connection = adp.createConnection('authorization_code');
	connection.connect(options, () => {
		worker = adp.apiProduct(connection, 'Worker');
		if(worker) {
			worker.call('read', (err2, data2) => {
				if(err2) {
					log.error('Error returned from worker call.' + err2);
				}
				log.info('RETURN WORKER READ - ' + JSON.stringify(data2));
			});
		}
		userInfo = adp.apiProduct(connection, 'UserInfo');
		userInfo.call('read', (err2, data2) => {
			if(err2) {
				log.error('Error returned from user info call.');
			}
			log.info('RETURN USER INFO READ - ' + JSON.stringify(data2));

		});
		taxStatement = adp.apiProduct(connection, 'TaxStatement');
		taxStatement.call('read', (err2, data2) => {
			if(err2) {
				log.error('Error returned from tax statement call.');
			}
			log.info('RETURN TAX INFO READ - ' + JSON.stringify(data2));
		});
		corpDir = adp.apiProduct(connection, 'CorpDirectory');
		corpDir.call('read', (err2, data2) => {
			if(err2) {
				log.error('Error returned from corp directory call.');
			}
			log.info('RETURN CORP DIR INFO READ - ' + JSON.stringify(data2));
		});
	});

	res.end();

});

router.get('/authenticate', function login(req, res) {
	var adp = new ADP('A');
	adp.preconnect(res);
});

module.exports = router;
