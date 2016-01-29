'use strict';

var ADP = require('./lib/adp');
var log = require('winston');

var worker;
var userInfo;
var taxStatement;
var corpDir;

var options = {
	associateoid: 'G3DHY9KFVPP9WGHE',
	orgoid: 'G3DHY9KFVPP9RGAK',
	docs: true,
	keepAlive: true
};
var adp = new ADP('B');
adp.connect(options, () => {
	worker = adp.apiProduct('Worker');
	if(worker) {
		worker.call('read', (err2, data2) => {
			if(err2) {
				log.error('Error returned from worker call.' + err2);
			}
			log.info('RETURN WORKER READ - ' + JSON.stringify(data2));
		});
	}
	userInfo = adp.apiProduct('UserInfo');
	userInfo.call('read', (err2, data2) => {
		if(err2) {
			log.error('Error returned from user info call.');
		}
		log.info('RETURN USER INFO READ - ' + JSON.stringify(data2));

	});
	taxStatement = adp.apiProduct('TaxStatement');
	taxStatement.call('read', (err2, data2) => {
		if(err2) {
			log.error('Error returned from tax statement call.');
		}
		log.info('RETURN TAX INFO READ - ' + JSON.stringify(data2));
	});
	corpDir = adp.apiProduct('CorpDirectory');
	corpDir.call('read', (err2, data2) => {
		if(err2) {
			log.error('Error returned from corp directory call.');
		}
		log.info('RETURN CORP DIR INFO READ - ' + JSON.stringify(data2));
	});
});
