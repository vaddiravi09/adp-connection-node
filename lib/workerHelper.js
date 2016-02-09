'use strict';

function WorkerHelper(connection, apiProductInstance) {

	this.getWorker = function getWorker(opts, cb) {
		apiProductInstance.call('read', opts, cb);
	};

}

module.exports = WorkerHelper;
