'use strict';

var adp = require('./lib/adp');
var log = require('winston');

var worker;
var userInfo;
var taxStatement;
var corpDir;

var options = {
	associateoid: 'G3BYYP2D9XJ4CVTF',
	orgoid: 'G3BYYP2D9XJ4Z8WK'
};
adp.connect(options);
adp.on('error', (err) => {
	log.error('Error received from ADP client.' + err);
});
adp.on('connected', (data) => {
	log.info(JSON.stringify(data));
	worker = adp.apiProduct('Worker');
	if(worker) {
		worker.call('read', (err2, data2) => {
			if(err2) {
				log.error('Error returned from worker call.');
			}
			log.info('RETURN WORKER READ - ' + + JSON.stringify(data2));
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
